# Max HackBar

Max HackBar is a browser DevTools panel for authorized security testing. It
provides URL and request tools, SQL injection payloads, XSS and LFI payloads,
encoding and hashing utilities, and string transformations.

## Project links

- [Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/maxs-hackbar/)
- [Related Web Recon Node app](https://github.com/mr-bipolar/web-recon)

## Browser support

The extension uses Manifest V2 and Firefox WebExtension APIs. Firefox is the
primary target; the manifest does not declare a minimum Firefox version. The
panel markup and local scripts have been smoke-tested in Firefox, but the full
DevTools-panel workflow still needs a manual check in an interactive browser.

The local extension is not compatible with current Chrome releases. Chrome
disabled Manifest V2 extensions beginning with Chrome 139, and the Chrome Web
Store no longer accepts Manifest V2 submissions. Current Chrome compatibility
would require a separately planned Manifest V3 migration; this repository has
not made that migration.

## Development installation

There is no build step. To load the extension temporarily in Firefox:

1. Open `about:debugging#/runtime/this-firefox`.
2. Choose **Load Temporary Add-on…**.
3. Select this repository's `manifest.json`.
4. Open DevTools for a web page and select the **Max HacKBar** panel.

Temporary installations are removed when Firefox closes. Review the extension
permissions before loading it; HackBar intentionally operates on arbitrary
sites for security testing.

## Build and checks

The extension is loaded directly from the repository; no bundler or package
manager is required. Syntax and manifest checks can be run from the repository
root:

```sh
node --check background.js
node --check hackbar/assets/js/hackbar.js
node --check hackbar/assets/js/ui-panel.js
node --check hackbar/assets/js/ui-init.js
node --check hackbar/assets/js/hackbar-crypto.js
node --check hackbar/assets/js/semantic-2.5.0.min.js
node --check hackbar/assets/js/jquery-3.7.1.min.js
node tests/hackbar-crypto.test.js
python3 -m json.tool manifest.json
```

The crypto compatibility suite runs with Node.js built-in test support and has
no package dependencies. It checks standard hash vectors, legacy byte encoding,
Base64, ROT13, HEX conversion, and old/new behavior comparisons.

## Third-party code and attribution

| Component | Included version | Source and license |
| --- | --- | --- |
| jQuery | 3.7.1 (official compressed production distribution) | [Official jQuery release file](https://code.jquery.com/jquery-3.7.1.min.js); MIT license. Local SHA-256: `fc9a93dd241f6b045cbff0481cf4e1901becd0e12fb45166a8f17f95823f0b1a`. |
| Semantic UI CSS and JavaScript | 2.5.0 (official tagged release files; MIT) | [CSS release](https://github.com/Semantic-Org/Semantic-UI-CSS/tree/2.5.0) and [JavaScript release](https://github.com/Semantic-Org/Semantic-UI/tree/2.5.0). Both are bundled locally with the CSS-referenced fonts and flag sprite from the same CSS 2.5.0 release. The extension has no remote stylesheet dependency. |
| `hackbar-crypto.js` | Project-owned implementation | Local synchronous implementation of MD5, SHA-1, SHA-256, Base64, ROT13, and HEX helpers. File-scoped MIT notice; algorithm references are RFC 1321, NIST FIPS PUB 180-4, and RFC 4648. The repository has no root license, so the project-wide licensing relationship still needs maintainer review. |

The new crypto implementation preserves the legacy low-byte behavior for
hashing and HEX. Base64 accepts byte strings (U+0000–U+00FF) and decodes to a
byte string. Its empty encoder result is the RFC 4648 value `""`; the legacy
encoder returned the erroneous `"AA=="`. Inputs above U+00FF are rejected by
the new Base64 encoder instead of producing malformed output. See
`tests/hackbar-crypto.test.js` for executable behavior checks.

The bundled `semantic-2.5.0.min.js` contains the Semantic UI library. Panel-specific
dropdown initialization and the existing IP display request are in
`hackbar/assets/js/ui-init.js` so that application code is separate from the
third-party library. The IP display calls `https://ipinfo.io` to show the
public IP and country flag; this external data request should be disclosed in
the add-on privacy information.

### jQuery compatibility note

The panel uses the full jQuery 3.7.1 production build with Semantic UI 2.5.0.
This retains the APIs expected by the bundled Semantic UI release. No Migrate
plugin or compatibility shim is used.

## Manual testing

After loading the extension in Firefox, open a normal HTTP or HTTPS page and
check the following in the DevTools panel:

- Open every top-level and nested tool menu; verify SQL, error-based, WAF, XSS,
  LFI, passcode, and other payload actions remain available.
- Select text in the URL field and exercise encoding, decoding, hashing,
  character conversion, and string transformation actions.
- Use Load URL, Split URL, GET execution, and POST execution with form-encoded
  and raw data against a test endpoint you control.
- Toggle POST data and Referrer fields; test a custom Referrer and inspect the
  request in the Network panel.
- Exercise each modal, keyboard focus, and visible focus indicators.
- Check the extension panel and browser consoles for errors, and verify the
  IP indicator's behavior when `ipinfo.io` is reachable or unavailable.

For Chrome, test only in an environment that explicitly supports legacy
Manifest V2 extensions. Current Chrome releases do not support this package.

## License

The repository's existing license terms have not been changed. Refer to the
license file or distribution terms in the project from which this source was
obtained; this repository does not currently include a separate root license
file.
