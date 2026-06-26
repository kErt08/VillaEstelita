(function () {
  const DEFAULT_GALLERY = [
    { src: "/assets/gallery/pool-dual.webp", alt: "Swimming pool and jacuzzi courtyard" },
    { src: "/assets/gallery/pool-fountain.webp", alt: "Pool with fountain and lounge area" },
    { src: "/assets/gallery/pool-lounge.webp", alt: "Shaded poolside lounge and bar" },
    { src: "/assets/gallery/aerial-courtyard.webp", alt: "Aerial view of the resort courtyard" },
    { src: "/assets/gallery/terrace-pavilion.webp", alt: "Rooftop terrace pavilion" },
    { src: "/assets/gallery/gazebo-interior.webp", alt: "Wooden gazebo lounge" },
    { src: "/assets/gallery/dining-lounge.webp", alt: "Indoor dining and lounge area" },
    { src: "/assets/gallery/bar-area.webp", alt: "Bar area beside the pool" },
    { src: "/assets/gallery/outdoor-kitchen.webp", alt: "Outdoor kitchen and grill" },
    { src: "/assets/gallery/bathroom.webp", alt: "Modern marble bathroom" },
    { src: "/assets/gallery/bedroom-purple.webp", alt: "Guest bedroom with ambient lighting" },
    { src: "/assets/gallery/bedroom-trundle.webp", alt: "Family room with trundle beds" },
    { src: "/assets/gallery/bedroom-bunk.webp", alt: "Bunk bed room" },
  ];

  function formatPeso(n) {
    return "₱" + Number(n).toLocaleString("en-PH");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function fetchGalleryImages() {
    const client = window.villaSupabase;
    if (!client) return DEFAULT_GALLERY;
    const { data, error } = await client
      .from("gallery_images")
      .select("public_url, alt")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return DEFAULT_GALLERY;
    return data.map((row) => ({ src: row.public_url, alt: row.alt || "" }));
  }

  function renderRates(value) {
    const packagesEl = document.getElementById("rate-packages");
    const inclusionsEl = document.getElementById("rate-inclusions");
    const detailsEl = document.getElementById("rate-details");
    if (!packagesEl || !value?.packages) return;

    packagesEl.innerHTML = value.packages
      .map((pkg) => {
        const note = pkg.note
          ? `<p style="font-size: 12px; color: var(--muted); margin: 10px 0 0">${escapeHtml(pkg.note)}</p>`
          : "";
        const jacuzzi = pkg.jacuzzi_note
          ? `<p class="rate-package-note">${escapeHtml(pkg.jacuzzi_note)}</p>`
          : "";
        return `
          <div class="rate-package-card">
            <h3>${escapeHtml(pkg.title)}</h3>
            <div class="rate-package-time">${escapeHtml(pkg.time)}</div>
            <div class="rate-package-prices">
              <div class="rate-promo">${formatPeso(pkg.promo)}</div>
              <div class="rate-original">Original: ${formatPeso(pkg.original)}</div>
            </div>
            ${note}${jacuzzi}
          </div>`;
      })
      .join("");

    if (inclusionsEl && value.inclusions_html) {
      inclusionsEl.innerHTML = value.inclusions_html;
    }

    if (detailsEl && value.details) {
      detailsEl.innerHTML = value.details
        .map(
          (d) => `
          <div class="rate-detail">
            <strong>${escapeHtml(d.label)}</strong>
            <span>${escapeHtml(d.value)}</span>
          </div>`
        )
        .join("");
    }
  }

  function renderPolicies(value) {
    const listEl = document.getElementById("rules-list");
    const noteEl = document.getElementById("rules-panel-note");
    if (!listEl || !value?.items) return;

    listEl.innerHTML = value.items
      .map((item) => `<div class="rule-item"><b>${escapeHtml(item.title)}:</b> ${escapeHtml(item.text)}</div>`)
      .join("");

    if (noteEl && value.footer_note) {
      noteEl.textContent = value.footer_note;
    }
  }

  async function loadSiteContent() {
    const client = window.villaSupabase;
    if (!client) return;

    const { data, error } = await client.from("site_content").select("key, value").in("key", ["rates", "policies"]);
    if (error || !data) return;

    for (const row of data) {
      if (row.key === "rates") renderRates(row.value);
      if (row.key === "policies") renderPolicies(row.value);
    }
  }

  window.VillaSiteContent = {
    DEFAULT_GALLERY,
    fetchGalleryImages,
    loadSiteContent,
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadSiteContent();
  });
})();
