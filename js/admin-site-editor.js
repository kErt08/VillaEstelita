(function () {
  const auth = window.VillaAdminAuth;
  const admin = window.VillaAdmin;

  let galleryRefreshTimer = null;

  function showToast(message, type) {
    const el = document.getElementById("adminSiteToast");
    if (!el) return;
    el.textContent = message;
    el.className = `admin-site-toast admin-site-toast--${type || "info"}`;
    el.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      el.hidden = true;
    }, 4000);
  }

  function scheduleGalleryRefresh() {
    clearTimeout(galleryRefreshTimer);
    galleryRefreshTimer = setTimeout(() => window.location.reload(), 800);
  }

  async function guardPage() {
    if (!auth.isConfigured()) {
      window.location.replace("./admin.html");
      return null;
    }
    try {
      const user = await auth.requireAdmin();
      if (!user) {
        window.location.replace("./admin.html");
        return null;
      }
      return user;
    } catch {
      window.location.replace("./admin.html");
      return null;
    }
  }

  async function initGalleryManager() {
    const grid = document.getElementById("galleryAdminGrid");
    if (!grid) return;

    const render = async () => {
      const images = await admin.loadGallery();
      if (!images.length) {
        grid.innerHTML = '<p class="admin-muted">No photos yet. Upload one below.</p>';
        return;
      }
      grid.innerHTML = images
        .map(
          (img) => `
          <article class="admin-gallery-card" data-id="${img.id}" data-path="${auth.escapeHtml(img.storage_path || "")}">
            <img src="${auth.escapeHtml(img.public_url)}" alt="${auth.escapeHtml(img.alt)}" loading="lazy" />
            <input type="text" data-alt value="${auth.escapeHtml(img.alt)}" placeholder="Description" />
            <div class="admin-gallery-actions">
              <button type="button" class="btn btn-outline btn-sm" data-save-meta>Save</button>
              <button type="button" class="btn btn-danger btn-sm" data-delete>Delete</button>
            </div>
          </article>`
        )
        .join("");
    };

    await render();

    document.getElementById("galleryUploadBtn")?.addEventListener("click", async () => {
      const file = document.getElementById("galleryUploadInput")?.files?.[0];
      const alt = document.getElementById("galleryUploadAlt")?.value.trim() || "";
      if (!file) {
        showToast("Choose an image file first.", "error");
        return;
      }
      try {
        await admin.uploadGalleryImage(file, alt);
        document.getElementById("galleryUploadInput").value = "";
        document.getElementById("galleryUploadAlt").value = "";
        showToast("Photo uploaded. Refreshing gallery…", "success");
        scheduleGalleryRefresh();
      } catch (err) {
        showToast(err.message, "error");
      }
    });

    grid.addEventListener("click", async (e) => {
      const card = e.target.closest(".admin-gallery-card");
      if (!card) return;
      const id = card.dataset.id;
      const storage_path = card.dataset.path || null;

      if (e.target.matches("[data-delete]")) {
        if (!confirm("Remove this photo from the gallery?")) return;
        try {
          await admin.deleteGalleryImage(id, storage_path);
          showToast("Photo deleted. Refreshing gallery…", "success");
          scheduleGalleryRefresh();
        } catch (err) {
          showToast(err.message, "error");
        }
      }

      if (e.target.matches("[data-save-meta]")) {
        try {
          const alt = card.querySelector("[data-alt]").value.trim();
          const row = (await admin.loadGallery()).find((img) => img.id === id);
          await admin.updateGalleryMeta(id, alt, row?.sort_order ?? 0);
          showToast("Photo details saved.", "success");
        } catch (err) {
          showToast(err.message, "error");
        }
      }
    });
  }

  function bindRatesEditor() {
    document.getElementById("editRatesBtn")?.addEventListener("click", () => {
      document.getElementById("ratesEditorPanel")?.classList.toggle("admin-hidden");
    });

    document.getElementById("addPackageBtn")?.addEventListener("click", () => {
      const data = admin.collectRatesForm();
      data.packages.push({ title: "", time: "", promo: 0, original: 0, note: "", jacuzzi_note: "" });
      admin.renderRatesForm(data);
    });

    document.getElementById("ratePackagesEditor")?.addEventListener("click", (e) => {
      if (!e.target.matches("[data-remove-package]")) return;
      const data = admin.collectRatesForm();
      const index = [...document.querySelectorAll("[data-package]")].indexOf(
        e.target.closest("[data-package]")
      );
      data.packages.splice(index, 1);
      admin.renderRatesForm(data);
    });

    document.getElementById("addDetailBtn")?.addEventListener("click", () => {
      const data = admin.collectRatesForm();
      data.details.push({ label: "", value: "" });
      admin.renderRatesForm(data);
    });

    document.getElementById("rateDetailsEditor")?.addEventListener("click", (e) => {
      if (!e.target.matches("[data-remove-detail]")) return;
      const data = admin.collectRatesForm();
      const index = [...document.querySelectorAll("[data-detail]")].indexOf(
        e.target.closest("[data-detail]")
      );
      data.details.splice(index, 1);
      admin.renderRatesForm(data);
    });

    document.getElementById("saveRatesBtn")?.addEventListener("click", async () => {
      try {
        await admin.saveRates();
        showToast("Rates saved.", "success");
        if (window.VillaSiteContent) await window.VillaSiteContent.loadSiteContent();
        document.getElementById("ratesEditorPanel")?.classList.add("admin-hidden");
      } catch (err) {
        showToast(err.message, "error");
      }
    });
  }

  function bindPoliciesEditor() {
    document.getElementById("editPoliciesBtn")?.addEventListener("click", () => {
      document.getElementById("policiesEditorPanel")?.classList.toggle("admin-hidden");
    });

    document.getElementById("addPolicyBtn")?.addEventListener("click", () => {
      const data = admin.collectPoliciesForm();
      data.items.push({ title: "", text: "" });
      admin.renderPoliciesForm(data);
    });

    document.getElementById("policiesEditor")?.addEventListener("click", (e) => {
      if (!e.target.matches("[data-remove-policy]")) return;
      const data = admin.collectPoliciesForm();
      const index = [...document.querySelectorAll("[data-policy]")].indexOf(
        e.target.closest("[data-policy]")
      );
      data.items.splice(index, 1);
      admin.renderPoliciesForm(data);
    });

    document.getElementById("savePoliciesBtn")?.addEventListener("click", async () => {
      try {
        await admin.savePolicies();
        showToast("Policies saved.", "success");
        if (window.VillaSiteContent) await window.VillaSiteContent.loadSiteContent();
        document.getElementById("policiesEditorPanel")?.classList.add("admin-hidden");
      } catch (err) {
        showToast(err.message, "error");
      }
    });
  }

  async function loadEditors() {
    await admin.loadRates();
    await admin.loadPolicies();
  }

  async function init() {
    const user = await guardPage();
    if (!user) return;

    document.getElementById("adminSignOutBtn")?.addEventListener("click", async () => {
      await auth.signOut();
      window.location.replace("./admin.html");
    });

    await loadEditors();
    bindRatesEditor();
    bindPoliciesEditor();
    await initGalleryManager();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
