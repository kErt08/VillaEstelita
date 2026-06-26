(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const STAGGER_GROUPS = [
    { parent: ".features-grid", child: ".feature-card", step: 90 },
    { parent: ".amenities-list", child: ".amenity-item", step: 70 },
    { parent: ".rate-packages", child: ".rate-package-card", step: 90 },
    { parent: ".contact-grid", child: ".contact-card", step: 90 },
    { parent: ".rate-details", child: ".rate-detail", step: 60 },
  ];

  const REVEAL_TARGETS = [
    { selector: ".section-header", variant: "reveal--fade-up" },
    { selector: ".about-image", variant: "reveal--fade-right" },
    { selector: ".about-text", variant: "reveal--fade-left" },
    { selector: ".gallery-dome", variant: "reveal--scale-up" },
    { selector: ".amenities-grid > div:first-child", variant: "reveal--fade-left" },
    { selector: ".amenities-image", variant: "reveal--fade-right" },
    { selector: ".rate-inclusions", variant: "reveal--fade-up" },
    { selector: ".rates-main > .btn-primary", variant: "reveal--fade-up" },
    { selector: ".rules-panel", variant: "reveal--fade-left" },
    { selector: ".location-resort-card", variant: "reveal--fade-left" },
    { selector: ".location-nearby-block", variant: "reveal--fade-left" },
    { selector: ".location-map-panel", variant: "reveal--fade-right" },
    { selector: ".footer-brand", variant: "reveal--fade-up" },
    { selector: ".footer-contact", variant: "reveal--fade-up" },
    { selector: ".footer-links", variant: "reveal--fade-up" },
  ];

  function mark(el, variant, delay) {
    el.classList.add("reveal", variant);
    if (delay) el.style.setProperty("--reveal-delay", delay);
  }

  function setupReveals() {
    REVEAL_TARGETS.forEach(({ selector, variant }) => {
      document.querySelectorAll(selector).forEach((el) => mark(el, variant));
    });

    STAGGER_GROUPS.forEach(({ parent, child, step }) => {
      document.querySelectorAll(parent).forEach((group) => {
        group.querySelectorAll(child).forEach((el, i) => {
          mark(el, "reveal--fade-up", `${Math.min(i * step, 420)}ms`);
        });
      });
    });
  }

  function animateHero() {
    const items = document.querySelectorAll(".hero-content .container > *");
    items.forEach((el, i) => {
      mark(el, "reveal--fade-up", `${120 + i * 90}ms`);
    });
    void document.body.offsetHeight;
    items.forEach((el) => el.classList.add("reveal--visible"));
  }

  function setupScrollReveals() {
    setupReveals();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll(".reveal:not(.reveal--visible)").forEach((el) => {
      observer.observe(el);
    });
  }

  function init() {
    animateHero();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupScrollReveals);
    } else {
      setupScrollReveals();
    }
  }

  init();
})();
