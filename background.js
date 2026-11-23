/**
 When we receive the message, add referer to Request Header
 */

var urlfield = "";
var refererfield = "";

function rewriteReferer(e) {
    if (e.url !== urlfield) return {};

    // Replace the existing value to avoid sending duplicate Referer headers.
    e.requestHeaders = e.requestHeaders.filter(function (header) {
        return header.name.toLowerCase() !== "referer";
    });
    e.requestHeaders.push({
        name: "Referer",
        value: refererfield
    });
    browser.webRequest.onBeforeSendHeaders.removeListener(rewriteReferer);
    return { requestHeaders: e.requestHeaders };
}

function handleMessage(request, sender, sendResponse) {
    if (sender.url !== browser.runtime.getURL("/hackbar/ui.html")) {
        return;
    }

    if (!request || typeof request.urlfield !== "string" ||
        typeof request.refererfield !== "string" || /[\r\n]/.test(request.refererfield)) {
        return;
    }

    urlfield = request.urlfield;
    refererfield = request.refererfield;

    browser.webRequest.onBeforeSendHeaders.addListener(
        rewriteReferer,
        { urls: ["<all_urls>"], types: ["main_frame"] },
        ["blocking", "requestHeaders"]
    );

}

/**
 Listen for messages from our devtools panel.
 */
browser.runtime.onMessage.addListener(handleMessage);
