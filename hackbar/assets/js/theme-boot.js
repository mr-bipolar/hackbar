/* Apply the cached theme before the panel's styles are painted. */
(function () {
    var theme = 'light';
    try {
        var savedTheme = localStorage.getItem('maxHackBarTheme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            theme = savedTheme;
        }
    } catch (error) {
        // The storage API below remains the persistent source of truth.
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeReady = 'false';
})();
