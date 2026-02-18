(function() {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore localStorage errors and still apply the theme for this session.
    }
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function updateMetaThemeColor(theme) {
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#0f172a" : "#ffffff");
    }
  }

  function updateToggleLabel(theme) {
    var button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }

    var nextTheme = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
    button.setAttribute("title", "Switch to " + nextTheme + " mode");
    button.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    updateMetaThemeColor(theme);
    updateToggleLabel(theme);

    if (persist) {
      saveTheme(theme);
    }
  }

  function initializeTheme() {
    var theme = getCurrentTheme();
    var savedTheme = getSavedTheme();

    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
      root.setAttribute("data-theme", theme);
    }

    setTheme(theme, false);

    var button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }

    button.addEventListener("click", function() {
      var nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
      setTheme(nextTheme, true);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTheme);
  } else {
    initializeTheme();
  }
})();
