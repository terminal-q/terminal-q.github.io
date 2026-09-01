(function () {
  var KEY = "tq-lang";

  function detectLang() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === "uk" || stored === "en") return stored;
    } catch (e) {
      // localStorage can throw in private-browsing/embedded contexts —
      // fall through to navigator-based detection.
    }
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("uk") === 0 ? "uk" : "en";
  }

  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        String(btn.getAttribute("data-lang-toggle") === lang)
      );
    });
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      // Persistence is a nicety; the toggle still works for this page view.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLang(detectLang());
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-toggle"));
      });
    });
  });
})();
