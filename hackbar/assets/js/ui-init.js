/*
 * Initialize the panel's Semantic UI menus and IP display.
 * The IP lookup sends a request to ipinfo.io, matching the existing panel
 * behavior that displays the public IP and country code.
 */
$('.ui.dropdown').dropdown({
    allowCategorySelection: false
});

var iconNames = {
    dropdown: 'chevron-down', caret: 'chevron-down', down: 'chevron-down',
    add: 'plus', plus: 'plus', minus: 'minus', close: 'close',
    question: 'help', info: 'info', database: 'database', hdd: 'database',
    table: 'table', columns: 'columns', list: 'list', code: 'code',
    bullseye: 'target', crosshairs: 'target', circle: 'circle', dot: 'circle',
    ring: 'target', box: 'box', cube: 'box', cubes: 'layers', asterisk: 'asterisk',
    exchange: 'swap', sync: 'refresh', cut: 'cut', exclamation: 'warning',
    triangle: 'warning', file: 'file', folder: 'folder', globe: 'globe',
    linkify: 'link', filter: 'filter', recycle: 'recycle', secret: 'shield',
    shield: 'shield', snowflake: 'snowflake', sort: 'sort', square: 'square',
    user: 'user', life: 'target'
};

var iconPriority = [
    'dropdown', 'caret', 'down', 'question', 'info', 'database', 'hdd', 'table',
    'columns', 'list', 'code', 'bullseye', 'crosshairs', 'exchange', 'sync',
    'exclamation', 'triangle', 'cut', 'linkify', 'globe', 'shield', 'secret',
    'snowflake', 'recycle', 'filter', 'folder', 'file', 'user', 'cubes', 'cube',
    'box', 'asterisk', 'sort', 'square', 'life', 'ring', 'dot', 'circle', 'close',
    'minus', 'add', 'plus'
];

function createLocalIcon(name, className) {
    var svgNamespace = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNamespace, 'svg');
    var use = document.createElementNS(svgNamespace, 'use');
    svg.setAttribute('class', className || 'local-icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    use.setAttribute('href', './assets/icons.svg#icon-' + name);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/icons.svg#icon-' + name);
    svg.appendChild(use);
    return svg;
}

document.querySelectorAll('i.icon').forEach(function (icon) {
    var iconName = iconPriority.reduce(function (match, className) {
        return match || (icon.classList.contains(className) ? iconNames[className] : null);
    }, null);
    if (iconName) {
        icon.replaceChildren(createLocalIcon(iconName));
        icon.setAttribute('aria-hidden', 'true');
    }
});

var mainMenuIcons = {
    'SQL': 'database', 'Error Based': 'warning', 'WAF': 'shield', 'XSS': 'code',
    'LFI': 'file', 'LDAP': 'link', 'VARIABLES': 'list', 'Bypasser': 'filter',
    'Passcode': 'user', 'Other': 'asterisk'
};

document.querySelectorAll('.ui.menu > .dropdown.item').forEach(function (menu) {
    var labelNode = Array.from(menu.childNodes).find(function (node) {
        return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
    });
    if (!labelNode) {
        return;
    }
    var iconName = mainMenuIcons[labelNode.textContent.trim()];
    if (iconName) {
        menu.insertBefore(createLocalIcon(iconName, 'local-icon top-level-icon'), labelNode);
    }
});

var themeButton = document.getElementById('ui_theme_toggle');
var themeRoot = document.documentElement;

function applyTheme(theme, persist) {
    theme = theme === 'dark' ? 'dark' : 'light';
    themeRoot.dataset.theme = theme;

    if (themeButton) {
        var nextTheme = theme === 'dark' ? 'light' : 'dark';
        var label = 'Switch to ' + nextTheme + ' theme';
        themeButton.setAttribute('aria-label', label);
        themeButton.setAttribute('title', label);
        themeButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        var use = themeButton.querySelector('use');
        if (use) {
            var iconHref = './assets/icons.svg#icon-' + (theme === 'dark' ? 'sun' : 'moon');
            use.setAttribute('href', iconHref);
            use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', iconHref);
        }
    }

    try {
        localStorage.setItem('maxHackBarTheme', theme);
    } catch (error) {
        // Firefox extension storage remains available when page storage is blocked.
    }

    if (persist) {
        browser.storage.local.set({maxHackBarTheme: theme}).catch(function () {});
    }
}

browser.storage.local.get('maxHackBarTheme').then(function (stored) {
    var theme = stored.maxHackBarTheme;
    if (theme !== 'dark' && theme !== 'light') {
        try {
            theme = localStorage.getItem('maxHackBarTheme');
        } catch (error) {
            theme = 'light';
        }
    }
    applyTheme(theme, false);
}).catch(function () {
    applyTheme(themeRoot.dataset.theme, false);
}).then(function () {
    themeRoot.dataset.themeReady = 'true';
});

if (themeButton) {
    themeButton.addEventListener('click', function (event) {
        // This toolbar control sits inside the main menu. Keep its click from
        // reaching any ancestor/delegated HackBar action handlers.
        event.preventDefault();
        event.stopPropagation();
        applyTheme(themeRoot.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
}

// Semantic UI's nested menu categories open on hover. Give those categories a
// keyboard path too, so their otherwise-hidden tool buttons can receive focus.
document.querySelectorAll('.ui.dropdown > .menu .item').forEach(function (item) {
    var submenu = Array.from(item.children).find(function (child) {
        return child.classList.contains('menu');
    });

    if (!submenu) {
        return;
    }

    item.classList.add('menu-category');
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-haspopup', 'true');
    item.setAttribute('aria-expanded', 'false');

    item.addEventListener('focus', function () {
        item.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('focusout', function () {
        window.setTimeout(function () {
            item.setAttribute('aria-expanded', item.contains(document.activeElement) ? 'true' : 'false');
        }, 0);
    });

    item.addEventListener('keydown', function (event) {
        if (event.target !== item) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
            event.preventDefault();
            var firstTool = submenu.querySelector('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])');
            if (firstTool) {
                firstTool.focus();
            }
        } else if (event.key === 'Escape' || event.key === 'ArrowLeft') {
            event.preventDefault();
            var mainMenu = item.closest('.ui.dropdown');
            if (mainMenu) {
                mainMenu.focus();
            }
        }
    });
});

$.get('https://ipinfo.io', null, null, 'json')
    .done(function (response) {
        var indicator = document.getElementById('pip');
        var flagButton = document.getElementById('ip-flag');
        var countryCode = response && typeof response.country === 'string'
            ? response.country.toLowerCase()
            : '';

        if (indicator && response && typeof response.ip === 'string') {
            indicator.setAttribute('data-tooltip', response.ip);
        }

        if (flagButton && /^[a-z]{2}$/.test(countryCode)) {
            var countryLabel = document.querySelector('[data-country-code]');
            if (countryLabel) {
                countryLabel.textContent = countryCode.toUpperCase();
            }
            flagButton.setAttribute('aria-label', countryCode.toUpperCase() + ' country indicator');
        }
    });
