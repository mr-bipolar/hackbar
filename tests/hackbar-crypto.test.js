'use strict';

const assert = require('node:assert/strict');
const nodeCrypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadCrypto(relativePath) {
    const context = {};
    const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
    vm.runInNewContext(source, context, { filename: relativePath });
    return context.Encrypt;
}

const crypto = loadCrypto('hackbar/assets/js/hackbar-crypto.js');

function lowByteBuffer(text) {
    const bytes = Buffer.alloc(text.length);
    for (let index = 0; index < text.length; index += 1) {
        bytes[index] = text.charCodeAt(index) & 0xff;
    }
    return bytes;
}

test('public compatibility API exposes all eight methods', () => {
    assert.deepEqual(Object.keys(crypto).sort(), [
        'base64Decode', 'base64Encode', 'hexToStr', 'md5',
        'rot13', 'sha1', 'sha2', 'strToHex'
    ]);
});

const hashVectors = [
    ['', 'd41d8cd98f00b204e9800998ecf8427e', 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72', 'a9993e364706816aba3e25717850c26c9cd0d89d',
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
    ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0', 'c12252ceda8be8994d5fa0290a47231c1d16aae3',
        'f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650']
];

test('MD5, SHA-1, and SHA-256 match standard vectors and return lowercase hex', () => {
    for (const [input, md5, sha1, sha256] of hashVectors) {
        assert.equal(crypto.md5(input), md5);
        assert.equal(crypto.sha1(input), sha1);
        assert.equal(crypto.sha2(input), sha256);
    }
    assert.equal(crypto.md5('a'.repeat(1000000)), '7707d6ae4e027c70eea2a935c2296f21');
    assert.equal(crypto.sha1('a'.repeat(1000000)), '34aa973cd4c4daa4f61eeb2bdbad27316534016f');
    assert.equal(crypto.sha2('a'.repeat(1000000)), 'cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0');
});

test('hashes map UTF-16 code units to their low bytes, including Unicode input', () => {
    for (const input of ['', 'abc', 'message digest', 'é', 'Ā', '😀']) {
        for (const [method, algorithm] of [['md5', 'md5'], ['sha1', 'sha1'], ['sha2', 'sha256']]) {
            const expected = nodeCrypto.createHash(algorithm).update(lowByteBuffer(input)).digest('hex');
            assert.equal(crypto[method](input), expected, `${method}(${JSON.stringify(input)})`);
        }
    }
});

test('Base64 uses RFC 4648 byte-string encoding and padding', () => {
    assert.equal(crypto.base64Encode(''), '');
    assert.equal(crypto.base64Encode('f'), 'Zg==');
    assert.equal(crypto.base64Encode('fo'), 'Zm8=');
    assert.equal(crypto.base64Encode('foo'), 'Zm9v');
    assert.equal(crypto.base64Encode('é'), '6Q==');
    assert.equal(crypto.base64Decode(''), '');
    assert.equal(crypto.base64Decode('Zg=='), 'f');
    assert.equal(crypto.base64Decode('Zm8='), 'fo');
    assert.equal(crypto.base64Decode('Zm9v'), 'foo');
    assert.equal(crypto.base64Decode('6Q=='), 'é');
    assert.equal(crypto.base64Decode('YQ'), '');
    assert.equal(crypto.base64Decode('Y#Q=='), '');
    assert.throws(() => crypto.base64Encode('Ā'), { name: 'RangeError' });
    assert.throws(() => crypto.base64Encode('😀'), { name: 'RangeError' });
});

test('Base64 handles valid byte strings and padding', () => {
    for (const [input, encoded] of [
        ['', ''], ['a', 'YQ=='], ['ab', 'YWI='], ['abc', 'YWJj'],
        ['é', '6Q=='], ['\u0000\u00ff', 'AP8=']
    ]) {
        assert.equal(crypto.base64Encode(input), encoded);
        assert.equal(crypto.base64Decode(encoded), input);
    }
});

test('Base64 rejects input outside its documented byte-string range', () => {
    assert.equal(crypto.base64Encode(''), '');
    assert.throws(() => crypto.base64Encode('Ā'), { name: 'RangeError' });
    assert.equal(crypto.strToHex('Ā'), '00');
});

test('ROT13 transforms ASCII letters only', () => {
    assert.equal(crypto.rot13(''), '');
    assert.equal(crypto.rot13('Hello, WORLD! 123 -_'), 'Uryyb, JBEYQ! 123 -_');
    assert.equal(crypto.rot13('éĀ😀'), 'éĀ😀');
});

test('HEX conversion uses legacy low-byte encoding and odd-nibble right padding', () => {
    assert.equal(crypto.strToHex(''), '');
    assert.equal(crypto.strToHex('abc'), '616263');
    assert.equal(crypto.strToHex('é'), 'e9');
    assert.equal(crypto.strToHex('Ā'), '00');
    assert.equal(crypto.strToHex('😀'), '3d00');
    assert.equal(crypto.hexToStr(''), '');
    assert.equal(crypto.hexToStr('616263'), 'abc');
    assert.equal(crypto.hexToStr('AB'), '«');
    assert.equal(crypto.hexToStr('A'), '\u00a0');
    assert.equal(crypto.hexToStr('aBcD'), '\u00ab\u00cd');
    assert.equal(crypto.hexToStr('zz'), '');
    assert.equal(crypto.hexToStr('1g'), '');
    assert.equal(crypto.hexToStr('0x41'), '');
});

test('non-string arguments are rejected consistently with an explicit error', () => {
    for (const method of Object.keys(crypto)) {
        assert.throws(() => crypto[method](null), { name: 'TypeError' }, method);
    }
});
