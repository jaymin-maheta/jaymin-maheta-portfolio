/*
 * Shared GSAP scroll-reveal system — loaded by every page after gsap.min.js and
 * ScrollTrigger.min.js. Drives the .reveal / .reveal-left / .reveal-right / .reveal-item /
 * .hero-reveal / .nav-reveal / .tilt-card / .parallax-orb classes used across the markup.
 * Starting (hidden) styles live in assets/css/animations.css.
 */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof gsap === "undefined" || reduceMotion) {
    window.__animInitDone = true;
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Nav + hero: animate in immediately on load, staggered.
  gsap.to(".nav-reveal", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
  gsap.to(".hero-reveal", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, delay: 0.1 });

  // Scroll-triggered reveals.
  gsap.utils.toArray(".reveal").forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.utils.toArray(".reveal-left").forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.utils.toArray(".reveal-right").forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // Grouped items (cards, badges) — staggered as their container enters view.
  gsap.utils.toArray(".reveal-group").forEach(function (group) {
    var items = group.querySelectorAll(".reveal-item");
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 88%" },
    });
  });

  // Subtle 3D tilt on project cards, following the pointer.
  document.querySelectorAll(".tilt-card").forEach(function (card) {
    var bounds;
    card.addEventListener("pointerenter", function () {
      bounds = card.getBoundingClientRect();
    });
    card.addEventListener("pointermove", function (e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      var relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      var relY = (e.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(card, {
        rotateX: relY * -6,
        rotateY: relX * 6,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    });
    card.addEventListener("pointerleave", function () {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    });
  });

  // Gentle parallax drift on the decorative hero orb.
  gsap.utils.toArray(".parallax-orb").forEach(function (orb) {
    gsap.to(orb, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: orb.closest("div"),
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  window.__animInitDone = true;
})();
