/*
 * Set the dark class before first paint to avoid a flash of the wrong color scheme.
 * Loaded synchronously (no defer/async) in <head>, before any stylesheet that reads it.
 */
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
