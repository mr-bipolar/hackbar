# Max HackBar

Max HackBar is a Firefox WebExtension inspired by the original HackBar. It adds a
tool panel to Firefox Developer Tools for request testing and web security
workflows. The project is hosted at
[github.com/mr-bipolar/hackbar](https://github.com/mr-bipolar/hackbar).

Project links:

- [Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/maxs-hackbar/)


## Browser support

Firefox is the primary target. The extension uses Manifest V2 and Firefox
WebExtension APIs, including Firefox's DevTools integration. Current Chrome
releases are not supported because of Manifest V2 restrictions and the
Firefox-specific DevTools integration. Supporting current Chrome releases
would require a separately planned Manifest V3 migration. The manifest does
not declare a minimum Firefox version.

## Features

- SQL injection payload templates and related security testing tools for
  authorized testing.
- Base64 encoding and decoding.
- MD5, SHA-1, and SHA-256 hashing.
- ROT13 transformation.
- String-to-HEX and HEX-to-string conversion, with optional `0x` HEX tools.
- URL loading, URL splitting, and HTTP GET and POST testing.
- POST data entry and an optional custom Referrer value. The extension does not
  provide a general-purpose arbitrary request-header editor.
- Text inspection of raw and multipart POST responses in the extension panel.
- Additional payload menus for error-based testing, WAF cases, XSS, LFI, LDAP,
  and other workflows.

## Installation and usage

### Load temporarily in Firefox

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **Load Temporary Add-on…**.
3. In this repository, select `manifest.json`.
4. Open a web page and open Developer Tools with **F12** (or use the browser's
   Developer Tools menu).
5. Select the **Max HackBar** panel in the Developer Tools tab strip. If it is
   not visible, look in the overflow menu for additional tools.

A temporary add-on is removed when Firefox closes. Load it again through
`about:debugging` after restarting Firefox.

### Use the panel

1. Enter a target URL in the URL field. Use only systems for which you have
   authorization to test.
2. Select text in the URL or another editable field, then choose a tool from the
   panel menus. Encoding, decoding, hashing, ROT13, and HEX actions transform
   the selected text or the current field content.
3. Use **Load URL** to load the entered URL in the inspected tab, or **Split**
   to put URL query components on separate lines in the URL field.
4. For GET testing, leave **POST Data** unchecked and choose **Execute**. This
   navigates the inspected tab to the target URL.
5. For POST testing, enable **POST Data** and enter request data. Form-style
   `name=value` data is submitted through a form in the inspected page. Raw and
   multipart data are sent by the panel's `fetch` request; their response body
   is shown as text in the panel. For multipart data, provide the multipart
   body format expected by the target.
6. To set a Referrer, enable **Referrer**, enter its value, and execute the
   request. This value is applied to the matching top-level request.

HTTP form submissions can navigate the inspected tab. Raw and multipart POST
requests include the inspected page's credentials as configured in the code,
and follow redirects. Review the target and submitted data before executing.

## Permissions and data handling

The permissions in `manifest.json` support the extension's DevTools request
workflows:

- `webRequest` and `webRequestBlocking` let the background script intercept a
  matching top-level request and replace its `Referer` header when the Referrer
  option is enabled.
- `storage` stores the panel's selected theme using Firefox extension storage.
- `<all_urls>` allows the extension to work with arbitrary target sites and is
  also used to match top-level requests for the optional Referrer handling.

The panel automatically requests `https://ipinfo.io` to display public IP and
country information. The request goes to that external service, which can see
the public IP address associated with the request.

When HTTP testing is used, the target URL and the entered request data are sent
to the selected target. If the Referrer option is enabled, the entered Referrer
value is sent as a request header to the matching target request. Form-style
POST data is submitted through the inspected page; raw and multipart POST data
is sent by `fetch`. The target receives the resulting request and can respond
with content. Raw and multipart response bodies are displayed in the extension
panel for inspection. These behaviors involve transmitting data to external
services or the target site as described above.

## Security and implementation

Max HackBar is intended for authorized security testing on systems you own or
have permission to assess. Its payload menus provide strings to use in that
testing; the target's behavior depends on the target application.

Raw and multipart POST responses are assigned to a `<pre>` element using
`textContent` and displayed as text inside the extension panel. They are not
inserted as HTML into the inspected webpage. Cryptographic and string utilities
are implemented locally in `hackbar/assets/js/hackbar-crypto.js`; the
extension does not rely on an included `Encrypt.js` dependency.

## Important: Preserve Developer Comments and Security Payloads

**Do not remove, rewrite, or modify existing developer comments in the source code.**

Some parts of Max HackBar contain security-testing payloads, including SQL injection, XSS, LFI, and other potentially malicious-looking examples. These are intentional features used for authorized security testing.

The comments explain the purpose and behavior of these payloads and help reviewers understand that they are testing data, not hidden or malicious extension code.

Removing these comments may make the code harder for reviewers to understand and could lead to additional questions, rejection, or non-approval during Firefox Add-ons review.

- Preserve all existing source-code comments, including developer notes and explanations.
- Do not remove or alter SQL injection or other security-testing payloads.
- Do not remove comments simply because they describe potentially malicious behavior.
- Make changes only when necessary, and preserve the original explanations.
- If a code change is required, retain the relevant comments and add clarification where appropriate.

**This is a project-maintenance requirement. Future contributors and automated coding tools must follow it.**

## Development and testing

The extension loads directly from the repository; no build step or package
manager is required. Main project files are:

- `manifest.json`: Firefox WebExtension metadata, permissions, and entry points.
- `background.js`: optional Referrer header handling for matching requests.
- `hackbar/hackbar.html`: DevTools page that registers the panel.
- `hackbar/ui.html`: panel interface and tool menus.
- `hackbar/assets/js/`: panel behavior, payload/tool definitions, theme and UI
  initialization, and local cryptographic utilities.
- `hackbar/assets/css/` and `hackbar/assets/icons.svg`: panel styles, bundled
  Semantic UI assets, and icons.
- `hackbar/img/` and `icons/`: panel images and extension icons.
- `tests/`: Node.js tests for cryptographic utilities and POST response
  rendering.

Run the automated tests from the repository root with Node.js:

```sh
node --test tests/*.test.js
```

The repository also supports these syntax and manifest checks:

```sh
node --check background.js
node --check hackbar/assets/js/hackbar.js
node --check hackbar/assets/js/ui-panel.js
node --check hackbar/assets/js/ui-init.js
node --check hackbar/assets/js/hackbar-crypto.js
node --check hackbar/assets/js/semantic-2.5.0.min.js
node --check hackbar/assets/js/jquery-3.7.1.min.js
python3 -m json.tool manifest.json
```

For basic Firefox testing, load `manifest.json` temporarily through
`about:debugging`, open a test page, and exercise the panel controls. Use a test
endpoint you control. Check URL loading and splitting, GET execution,
form-style POST, raw and multipart POST response display, Referrer handling,
encoding, decoding, hashing, ROT13, and HEX conversion. Check the Firefox
Developer Tools console and Network panel for errors and request behavior, and
check the IP indicator when `ipinfo.io` is reachable and when it is unavailable.

Automated tests cover crypto behavior and that raw and multipart response text
is not inserted into the inspected page. They do not automate the full Firefox
DevTools panel workflow. The manifest does not declare a minimum Firefox
version, so compatibility with particular Firefox releases should be verified
in Firefox.

## Third-party code and credits

| Component | Included version | Source and license information |
| --- | --- | --- |
| jQuery | 3.7.1 (compressed production distribution) | [Official jQuery release file](https://code.jquery.com/jquery-3.7.1.min.js); MIT. Local SHA-256: `fc9a93dd241f6b045cbff0481cf4e1901becd0e12fb45166a8f17f95823f0b1a`. |
| Semantic UI CSS and JavaScript | 2.5.0 | Bundled release files from [Semantic UI CSS](https://github.com/Semantic-Org/Semantic-UI-CSS/tree/2.5.0) and [Semantic UI](https://github.com/Semantic-Org/Semantic-UI/tree/2.5.0); MIT. The bundled CSS includes its referenced fonts and flag sprite. |
| `hackbar-crypto.js` | Project implementation | The file contains a file-scoped MIT notice. Algorithm references are RFC 1321, NIST FIPS PUB 180-4, and RFC 4648. |

The panel uses the full jQuery 3.7.1 production build with Semantic UI 2.5.0.
No jQuery Migrate plugin or compatibility shim is bundled.

The local crypto implementation retains legacy low-byte behavior for hashing
and HEX conversion. Base64 works with byte strings (U+0000–U+00FF), decodes to
a byte string, and rejects encoder input above U+00FF. See
`tests/hackbar-crypto.test.js` for the tested behavior. The panel-specific
Semantic UI initialization and IP information request are in
`hackbar/assets/js/ui-init.js`.

## License

No root-level license file is present in this repository. The file-scoped
notices and third-party license information above apply to the components
identified there; they do not establish a project-wide license for Max HackBar.
Consult the project maintainer or the applicable distribution terms for the
project-wide licensing status.
