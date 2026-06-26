(function () {
  var origin = window.location.origin;
  if (!origin || origin === "null" || origin.startsWith("file:")) return;

  document.querySelectorAll("[data-site-url]").forEach(function (el) {
    var href = el.getAttribute("href") || el.getAttribute("content");
    if (href) {
      href = href.replace("https://YOUR-SITE-URL", origin);
      if (el.hasAttribute("href")) el.setAttribute("href", href);
      if (el.hasAttribute("content")) el.setAttribute("content", href);
    }
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
    if (script.textContent.indexOf("YOUR-SITE-URL") !== -1) {
      script.textContent = script.textContent.split("https://YOUR-SITE-URL").join(origin);
    }
  });
})();
