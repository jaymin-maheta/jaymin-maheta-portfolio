/*
 * Safety net: if GSAP/ScrollTrigger/animations.js fail to load (CDN down, network error),
 * force-show any reveal-driven content instead of leaving it invisible forever.
 * Kept as its own tiny file (not inside animations.js) so it still runs even when
 * animations.js itself is the thing that failed to load.
 */
window.addEventListener("load", function () {
  setTimeout(function () {
    if (!window.__animInitDone) {
      document
        .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-item, .hero-reveal, .nav-reveal")
        .forEach(function (el) {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
    }
  }, 1500);
});
