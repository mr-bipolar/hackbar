'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const panelSource = fs.readFileSync(path.join(root, 'hackbar/assets/js/ui-panel.js'), 'utf8');
const panelHtml = fs.readFileSync(path.join(root, 'hackbar/ui.html'), 'utf8');

class FakeElement {
    constructor(id) {
        this.id = id;
        this.value = '';
        this.checked = false;
        this.hidden = false;
        this.style = {};
        this.listeners = {};
        this.textContent = '';
        this._innerHTML = 'inspected page body stays untouched';
    }

    addEventListener(type, callback) {
        this.listeners[type] = callback;
    }

    focus() {}

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(value) {
        throw new Error(`Unsafe innerHTML assignment on ${this.id}: ${value}`);
    }
}

async function runRawPostResponse(responseText, postBody) {
    const elements = new Map();
    const inspectedPage = {
        body: { innerHTML: '<main id="original-page">Original page</main>' },
        history: { state: 'original-history-state' }
    };
    const evalCalls = [];
    const requests = [];
    const document = {
        getElementById(id) {
            if (!elements.has(id)) elements.set(id, new FakeElement(id));
            return elements.get(id);
        },
        getElementsByName(name) {
            return [this.getElementById(`name:${name}`)];
        }
    };
    const context = {
        document,
        URL,
        browser: {
            devtools: {
                inspectedWindow: {
                    eval(source) {
                        evalCalls.push(source);
                        return Promise.resolve([undefined, false]);
                    }
                }
            },
            runtime: { sendMessage() {} }
        },
        fetch(url, options) {
            requests.push({ url, options });
            return Promise.resolve({
                text() {
                    return Promise.resolve(responseText);
                }
            });
        },
        showPanelNotification(message) {
            throw new Error(`Unexpected panel notification: ${message}`);
        }
    };

    vm.createContext(context);
    vm.runInContext(panelSource, context, { filename: 'ui-panel.js' });
    context.urlfield.value = 'https://target.example/path?x=1';
    context.postdatafield.value = postBody;
    context.postdataCbx.checked = true;
    context.refererCbx.checked = false;
    context.execute();
    await new Promise(resolve => setImmediate(resolve));

    return {
        elements,
        evalCalls,
        inspectedPage,
        requests,
        responseContainer: elements.get('hackbar-post-response'),
        responseOutput: elements.get('hackbar-post-response-content')
    };
}

test('raw and multipart responses render as literal text without touching the inspected page', async () => {
    const maliciousResponses = [
        '<script>globalThis.responseExecuted = true</script>',
        '<img src=x onerror="globalThis.responseExecuted = true">',
        '"><svg onload="globalThis.responseExecuted = true"><text>HTML payload</text></svg>'
    ];
    const requestBodies = [
        ['raw', 'raw POST payload'],
        ['multipart', 'Content-Disposition: form-data; name="field"\r\n\r\nvalue']
    ];

    for (const [kind, postBody] of requestBodies) {
        for (const maliciousResponse of maliciousResponses) {
            const result = await runRawPostResponse(maliciousResponse, postBody);

            assert.equal(result.responseOutput.textContent, maliciousResponse, `${kind} text output`);
            assert.equal(result.responseContainer.hidden, false, `${kind} response is shown`);
            assert.deepEqual(result.requests.map(request => request.url), [
                'https://target.example/path?x=1'
            ]);
            assert.equal(result.requests[0].options.method, 'POST');
            assert.equal(result.requests[0].options.redirect, 'follow');
            assert.equal(
                result.requests[0].options.headers['Content-Type'],
                'application/x-www-form-urlencoded'
            );
            assert.equal(result.requests[0].options.headers.Cache, 'no-cache');
            assert.equal(result.requests[0].options.credentials, 'include');
            assert.equal(result.requests[0].options.body, postBody);
            assert.deepEqual(result.evalCalls, [], 'POST response is never evaluated in the inspected page');
            assert.equal(
                result.inspectedPage.body.innerHTML,
                '<main id="original-page">Original page</main>',
                'inspected page body is unchanged'
            );
            assert.equal(result.inspectedPage.history.state, 'original-history-state');
        }
    }
});

test('response workflow no longer builds an inspected-page HTML rendering script', () => {
    assert.doesNotMatch(panelSource, /buildResponseRenderingScript/);
    assert.doesNotMatch(panelSource, /document\.body\.innerHTML\s*=\s*html/);
    assert.match(panelSource, /response\.text\(\)\.then\(function \(text\) \{\s*displayPostResponse\(text\);/);
    assert.match(panelHtml, /<section[^>]+id="hackbar-post-response"[^>]+hidden>/);
    assert.match(panelHtml, /<pre[^>]+id="hackbar-post-response-content"/);
});
