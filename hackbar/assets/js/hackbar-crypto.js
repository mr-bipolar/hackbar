/*
 * HackBar Crypto — synchronous hash and text conversion helpers.
 *
 * Independently implemented for Max HackBar in this maintenance change with
 * OpenAI Codex assistance. No third-party implementation source was copied or
 * adapted. This file alone is offered under the MIT License; the project's
 * other licensing terms are unchanged.
 * Copyright (c) 2026 Max HackBar project maintainers.
 * SPDX-License-Identifier: MIT
 *
 * Algorithm references:
 *   MD5: RFC 1321, https://www.rfc-editor.org/rfc/rfc1321
 *   SHA-1 and SHA-256: FIPS PUB 180-4,
 *     https://csrc.nist.gov/pubs/fips/180-4/upd1/final
 *   Base64: RFC 4648, https://www.rfc-editor.org/rfc/rfc4648
 *
 * Legacy-compatible text rules:
 *   - Hashes and strToHex map each UTF-16 code unit to its low byte.
 *   - Base64 input is a byte string: each code unit must be at most 0xFF.
 *     Decoding returns a byte string, not UTF-8 text.
 *   - hexToStr returns a byte string and pads an odd final nibble on the right.
 *   - ROT13 only changes ASCII letters.
 *
 * The legacy Base64 encoder returned "AA==" for empty input and emitted
 * malformed output for code units above 0xFF. This implementation follows
 * RFC 4648 for empty input and rejects unrepresentable byte-string input.
 */

var Encrypt = (function () {
    'use strict';

    var BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var HEX_ALPHABET = '0123456789abcdef';
    var SHA256_CONSTANTS = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    var MD5_ROTATIONS = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];
    var MD5_CONSTANTS = [];
    var constantIndex;

    for (constantIndex = 0; constantIndex < 64; constantIndex += 1) {
        MD5_CONSTANTS.push(Math.floor(Math.abs(Math.sin(constantIndex + 1)) * 0x100000000) >>> 0);
    }

    function requireString(value, methodName) {
        if (typeof value !== 'string') {
            throw new TypeError(methodName + ' expects a string.');
        }
        return value;
    }

    function toLegacyBytes(text) {
        var bytes = new Uint8Array(text.length);
        var index;

        for (index = 0; index < text.length; index += 1) {
            bytes[index] = text.charCodeAt(index) & 0xff;
        }

        return bytes;
    }

    function toBase64Bytes(text) {
        var bytes = new Uint8Array(text.length);
        var index;
        var codeUnit;

        for (index = 0; index < text.length; index += 1) {
            codeUnit = text.charCodeAt(index);
            if (codeUnit > 0xff) {
                throw new RangeError('Base64 byte-string input must contain only code units from U+0000 to U+00FF.');
            }
            bytes[index] = codeUnit;
        }

        return bytes;
    }

    function padMessage(inputBytes, littleEndianLength) {
        var paddedLength = Math.ceil((inputBytes.length + 9) / 64) * 64;
        var padded = new Uint8Array(paddedLength);
        var bitLengthLow = (inputBytes.length * 8) >>> 0;
        var bitLengthHigh = Math.floor(inputBytes.length / 0x20000000) >>> 0;
        var view = new DataView(padded.buffer);

        padded.set(inputBytes);
        padded[inputBytes.length] = 0x80;
        view.setUint32(paddedLength - 8, littleEndianLength ? bitLengthLow : bitLengthHigh, littleEndianLength);
        view.setUint32(paddedLength - 4, littleEndianLength ? bitLengthHigh : bitLengthLow, littleEndianLength);
        return padded;
    }

    function rotateLeft(value, amount) {
        return ((value << amount) | (value >>> (32 - amount))) >>> 0;
    }

    function rotateRight(value, amount) {
        return ((value >>> amount) | (value << (32 - amount))) >>> 0;
    }

    function wordsToHex(words, littleEndian) {
        var result = '';
        var wordIndex;
        var byteIndex;
        var word;
        var byteValue;

        for (wordIndex = 0; wordIndex < words.length; wordIndex += 1) {
            word = words[wordIndex] >>> 0;
            for (byteIndex = 0; byteIndex < 4; byteIndex += 1) {
                byteValue = littleEndian
                    ? (word >>> (byteIndex * 8)) & 0xff
                    : (word >>> ((3 - byteIndex) * 8)) & 0xff;
                result += HEX_ALPHABET.charAt(byteValue >>> 4) + HEX_ALPHABET.charAt(byteValue & 0x0f);
            }
        }

        return result;
    }

    function md5(text) {
        var message = padMessage(toLegacyBytes(requireString(text, 'md5')), true);
        var stateA = 0x67452301;
        var stateB = 0xefcdab89;
        var stateC = 0x98badcfe;
        var stateD = 0x10325476;
        var blockOffset;
        var blockWords;
        var view = new DataView(message.buffer);
        var a;
        var b;
        var c;
        var d;
        var round;
        var functionValue;
        var wordIndex;
        var nextA;

        for (blockOffset = 0; blockOffset < message.length; blockOffset += 64) {
            blockWords = new Uint32Array(16);
            for (wordIndex = 0; wordIndex < 16; wordIndex += 1) {
                blockWords[wordIndex] = view.getUint32(blockOffset + wordIndex * 4, true);
            }

            a = stateA;
            b = stateB;
            c = stateC;
            d = stateD;

            for (round = 0; round < 64; round += 1) {
                if (round < 16) {
                    functionValue = (b & c) | (~b & d);
                    wordIndex = round;
                } else if (round < 32) {
                    functionValue = (d & b) | (~d & c);
                    wordIndex = (5 * round + 1) % 16;
                } else if (round < 48) {
                    functionValue = b ^ c ^ d;
                    wordIndex = (3 * round + 5) % 16;
                } else {
                    functionValue = c ^ (b | ~d);
                    wordIndex = (7 * round) % 16;
                }

                nextA = d;
                d = c;
                c = b;
                b = (b + rotateLeft((a + functionValue + MD5_CONSTANTS[round] + blockWords[wordIndex]) >>> 0,
                    MD5_ROTATIONS[round])) >>> 0;
                a = nextA;
            }

            stateA = (stateA + a) >>> 0;
            stateB = (stateB + b) >>> 0;
            stateC = (stateC + c) >>> 0;
            stateD = (stateD + d) >>> 0;
        }

        return wordsToHex([stateA, stateB, stateC, stateD], true);
    }

    function sha1(text) {
        var message = padMessage(toLegacyBytes(requireString(text, 'sha1')), false);
        var view = new DataView(message.buffer);
        var state = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
        var schedule = new Uint32Array(80);
        var blockOffset;
        var wordIndex;
        var round;
        var a;
        var b;
        var c;
        var d;
        var e;
        var functionValue;
        var roundConstant;
        var temporary;

        for (blockOffset = 0; blockOffset < message.length; blockOffset += 64) {
            for (wordIndex = 0; wordIndex < 16; wordIndex += 1) {
                schedule[wordIndex] = view.getUint32(blockOffset + wordIndex * 4, false);
            }
            for (wordIndex = 16; wordIndex < 80; wordIndex += 1) {
                schedule[wordIndex] = rotateLeft(
                    schedule[wordIndex - 3] ^ schedule[wordIndex - 8] ^
                    schedule[wordIndex - 14] ^ schedule[wordIndex - 16], 1
                );
            }

            a = state[0];
            b = state[1];
            c = state[2];
            d = state[3];
            e = state[4];

            for (round = 0; round < 80; round += 1) {
                if (round < 20) {
                    functionValue = (b & c) | (~b & d);
                    roundConstant = 0x5a827999;
                } else if (round < 40) {
                    functionValue = b ^ c ^ d;
                    roundConstant = 0x6ed9eba1;
                } else if (round < 60) {
                    functionValue = (b & c) | (b & d) | (c & d);
                    roundConstant = 0x8f1bbcdc;
                } else {
                    functionValue = b ^ c ^ d;
                    roundConstant = 0xca62c1d6;
                }

                temporary = (rotateLeft(a, 5) + functionValue + e + roundConstant + schedule[round]) >>> 0;
                e = d;
                d = c;
                c = rotateLeft(b, 30);
                b = a;
                a = temporary;
            }

            state[0] = (state[0] + a) >>> 0;
            state[1] = (state[1] + b) >>> 0;
            state[2] = (state[2] + c) >>> 0;
            state[3] = (state[3] + d) >>> 0;
            state[4] = (state[4] + e) >>> 0;
        }

        return wordsToHex(state, false);
    }

    function sha2(text) {
        var message = padMessage(toLegacyBytes(requireString(text, 'sha2')), false);
        var view = new DataView(message.buffer);
        var state = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        var schedule = new Uint32Array(64);
        var blockOffset;
        var wordIndex;
        var round;
        var a;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g;
        var h;
        var smallSigma0;
        var smallSigma1;
        var largeSigma0;
        var largeSigma1;
        var choose;
        var majority;
        var temporary1;
        var temporary2;

        for (blockOffset = 0; blockOffset < message.length; blockOffset += 64) {
            for (wordIndex = 0; wordIndex < 16; wordIndex += 1) {
                schedule[wordIndex] = view.getUint32(blockOffset + wordIndex * 4, false);
            }
            for (wordIndex = 16; wordIndex < 64; wordIndex += 1) {
                smallSigma0 = rotateRight(schedule[wordIndex - 15], 7) ^
                    rotateRight(schedule[wordIndex - 15], 18) ^ (schedule[wordIndex - 15] >>> 3);
                smallSigma1 = rotateRight(schedule[wordIndex - 2], 17) ^
                    rotateRight(schedule[wordIndex - 2], 19) ^ (schedule[wordIndex - 2] >>> 10);
                schedule[wordIndex] = (schedule[wordIndex - 16] + smallSigma0 +
                    schedule[wordIndex - 7] + smallSigma1) >>> 0;
            }

            a = state[0];
            b = state[1];
            c = state[2];
            d = state[3];
            e = state[4];
            f = state[5];
            g = state[6];
            h = state[7];

            for (round = 0; round < 64; round += 1) {
                largeSigma1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
                choose = (e & f) ^ (~e & g);
                temporary1 = (h + largeSigma1 + choose + SHA256_CONSTANTS[round] + schedule[round]) >>> 0;
                largeSigma0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
                majority = (a & b) ^ (a & c) ^ (b & c);
                temporary2 = (largeSigma0 + majority) >>> 0;

                h = g;
                g = f;
                f = e;
                e = (d + temporary1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temporary1 + temporary2) >>> 0;
            }

            state[0] = (state[0] + a) >>> 0;
            state[1] = (state[1] + b) >>> 0;
            state[2] = (state[2] + c) >>> 0;
            state[3] = (state[3] + d) >>> 0;
            state[4] = (state[4] + e) >>> 0;
            state[5] = (state[5] + f) >>> 0;
            state[6] = (state[6] + g) >>> 0;
            state[7] = (state[7] + h) >>> 0;
        }

        return wordsToHex(state, false);
    }

    function base64Encode(text) {
        var bytes = toBase64Bytes(requireString(text, 'base64Encode'));
        var result = '';
        var index;
        var first;
        var second;
        var third;

        for (index = 0; index < bytes.length; index += 3) {
            first = bytes[index];
            second = index + 1 < bytes.length ? bytes[index + 1] : 0;
            third = index + 2 < bytes.length ? bytes[index + 2] : 0;

            result += BASE64_ALPHABET.charAt(first >>> 2);
            result += BASE64_ALPHABET.charAt(((first & 0x03) << 4) | (second >>> 4));
            result += index + 1 < bytes.length
                ? BASE64_ALPHABET.charAt(((second & 0x0f) << 2) | (third >>> 6))
                : '=';
            result += index + 2 < bytes.length ? BASE64_ALPHABET.charAt(third & 0x3f) : '=';
        }

        return result;
    }

    function base64Decode(text) {
        var encoded = requireString(text, 'base64Decode')
            .replace(/^[^A-Za-z0-9+/=]+|[^A-Za-z0-9+/=]+$/g, '');
        var bytes = [];
        var offset;
        var first;
        var second;
        var third;
        var fourth;
        var output = '';

        if (encoded.length === 0) {
            return '';
        }

        // Preserve the legacy empty-string failure result for malformed input.
        if (encoded.length % 4 !== 0 ||
            !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) {
            return '';
        }

        for (offset = 0; offset < encoded.length; offset += 4) {
            first = BASE64_ALPHABET.indexOf(encoded.charAt(offset));
            second = BASE64_ALPHABET.indexOf(encoded.charAt(offset + 1));
            third = encoded.charAt(offset + 2) === '=' ? 0 : BASE64_ALPHABET.indexOf(encoded.charAt(offset + 2));
            fourth = encoded.charAt(offset + 3) === '=' ? 0 : BASE64_ALPHABET.indexOf(encoded.charAt(offset + 3));

            bytes.push((first << 2) | (second >>> 4));
            if (encoded.charAt(offset + 2) !== '=') {
                bytes.push(((second & 0x0f) << 4) | (third >>> 2));
            }
            if (encoded.charAt(offset + 3) !== '=') {
                bytes.push(((third & 0x03) << 6) | fourth);
            }
        }

        for (offset = 0; offset < bytes.length; offset += 1) {
            output += String.fromCharCode(bytes[offset]);
        }

        return output;
    }

    function rot13(text) {
        var input = requireString(text, 'rot13');
        var output = '';
        var index;
        var codeUnit;

        for (index = 0; index < input.length; index += 1) {
            codeUnit = input.charCodeAt(index);
            if (codeUnit >= 65 && codeUnit <= 90) {
                codeUnit = ((codeUnit - 65 + 13) % 26) + 65;
            } else if (codeUnit >= 97 && codeUnit <= 122) {
                codeUnit = ((codeUnit - 97 + 13) % 26) + 97;
            }
            output += String.fromCharCode(codeUnit);
        }

        return output;
    }

    function strToHex(text) {
        var input = requireString(text, 'strToHex');
        var output = '';
        var index;
        var byteValue;

        for (index = 0; index < input.length; index += 1) {
            byteValue = input.charCodeAt(index) & 0xff;
            output += HEX_ALPHABET.charAt(byteValue >>> 4) + HEX_ALPHABET.charAt(byteValue & 0x0f);
        }

        return output;
    }

    function hexToStr(text) {
        var input = requireString(text, 'hexToStr').toLowerCase();
        var output = '';
        var index;
        var highNibble;
        var lowNibble;

        if (input.length === 0) {
            return '';
        }
        if (!/^[0-9a-f]+$/.test(input)) {
            return '';
        }
        if (input.length % 2 === 1) {
            input += '0';
        }

        for (index = 0; index < input.length; index += 2) {
            highNibble = HEX_ALPHABET.indexOf(input.charAt(index));
            lowNibble = HEX_ALPHABET.indexOf(input.charAt(index + 1));
            output += String.fromCharCode((highNibble << 4) | lowNibble);
        }

        return output;
    }

    return {
        base64Encode: base64Encode,
        base64Decode: base64Decode,
        md5: md5,
        sha1: sha1,
        sha2: sha2,
        rot13: rot13,
        strToHex: strToHex,
        hexToStr: hexToStr
    };
}());
