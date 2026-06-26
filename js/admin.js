(function () {
  const { sb, formatPeso, escapeHtml } = window.VillaAdminAuth;

  function renderRatePackages(packages) {
    return packages
      .map((pkg) => {
        const note = pkg.note
          ? `<p class="admin-muted" style="margin:8px 0 0;font-size:12px">${escapeHtml(pkg.note)}</p>`
          : "";
        const jacuzzi = pkg.jacuzzi_note
          ? `<p class="rate-package-note">${escapeHtml(pkg.jacuzzi_note)}</p>`
          : "";
        return `
          <div class="rate-package-card" data-package>
            <input type="text" data-field="title" value="${escapeHtml(pkg.title)}" placeholder="Package name" />
            <input type="text" data-field="time" value="${escapeHtml(pkg.time)}" placeholder="Schedule" />
            <div class="admin-row-2">
              <label>Promo <input type="number" data-field="promo" value="${pkg.promo}" min="0" /></label>
              <label>Original <input type="number" data-field="original" value="${pkg.original}" min="0" /></label>
            </div>
            <input type="text" data-field="note" value="${escapeHtml(pkg.note || "")}" placeholder="Optional note" />
            <input type="text" data-field="jacuzzi_note" value="${escapeHtml(pkg.jacuzzi_note || "")}" placeholder="Optional jacuzzi note" />
            ${note}${jacuzzi}
            <button type="button" class="btn btn-outline btn-sm" data-remove-package>Remove package</button>
          </div>`;
      })
      .join("");
  }

  function collectRatesForm() {
    const packages = [...document.querySelectorAll("[data-package]")].map((card) => ({
      title: card.querySelector('[data-field="title"]').value.trim(),
      time: card.querySelector('[data-field="time"]').value.trim(),
      promo: Number(card.querySelector('[data-field="promo"]').value),
      original: Number(card.querySelector('[data-field="original"]').value),
      note: card.querySelector('[data-field="note"]').value.trim(),
      jacuzzi_note: card.querySelector('[data-field="jacuzzi_note"]').value.trim(),
    }));

    const details = [...document.querySelectorAll("[data-detail]")].map((row) => ({
      label: row.querySelector('[data-field="label"]').value.trim(),
      value: row.querySelector('[data-field="value"]').value.trim(),
    }));

    return {
      packages,
      inclusions_html: document.getElementById("inclusionsHtml").value.trim(),
      details,
    };
  }

  function renderRatesForm(data) {
    document.getElementById("ratePackagesEditor").innerHTML = renderRatePackages(data.packages || []);
    document.getElementById("inclusionsHtml").value = data.inclusions_html || "";

    document.getElementById("rateDetailsEditor").innerHTML = (data.details || [])
      .map(
        (d) => `
        <div class="admin-detail-row" data-detail>
          <input type="text" data-field="label" value="${escapeHtml(d.label)}" placeholder="Label" />
          <input type="text" data-field="value" value="${escapeHtml(d.value)}" placeholder="Value" />
          <button type="button" class="btn btn-outline btn-sm" data-remove-detail>×</button>
        </div>`
      )
      .join("");
  }

  function renderPoliciesForm(data) {
    document.getElementById("policiesEditor").innerHTML = (data.items || [])
      .map(
        (item) => `
        <div class="admin-policy-row" data-policy>
          <input type="text" data-field="title" value="${escapeHtml(item.title)}" placeholder="Policy title" />
          <textarea data-field="text" rows="2" placeholder="Policy text">${escapeHtml(item.text)}</textarea>
          <button type="button" class="btn btn-outline btn-sm" data-remove-policy>Remove</button>
        </div>`
      )
      .join("");
    document.getElementById("policiesFooter").value = data.footer_note || "";
  }

  function collectPoliciesForm() {
    const items = [...document.querySelectorAll("[data-policy]")].map((row) => ({
      title: row.querySelector('[data-field="title"]').value.trim(),
      text: row.querySelector('[data-field="text"]').value.trim(),
    }));
    return {
      items,
      footer_note: document.getElementById("policiesFooter").value.trim(),
    };
  }

  async function loadRates() {
    const { data, error } = await sb().from("site_content").select("value").eq("key", "rates").maybeSingle();
    if (error) throw error;
    renderRatesForm(data?.value || { packages: [], details: [], inclusions_html: "" });
  }

  async function loadPolicies() {
    const { data, error } = await sb().from("site_content").select("value").eq("key", "policies").maybeSingle();
    if (error) throw error;
    renderPoliciesForm(data?.value || { items: [], footer_note: "" });
  }

  async function saveRates() {
    const value = collectRatesForm();
    const { error } = await sb().from("site_content").upsert({ key: "rates", value });
    if (error) throw error;
    await window.VillaAdminAuth.logAction("update", "rates", { package_count: value.packages.length });
  }

  async function savePolicies() {
    const value = collectPoliciesForm();
    const { error } = await sb().from("site_content").upsert({ key: "policies", value });
    if (error) throw error;
    await window.VillaAdminAuth.logAction("update", "policies", { policy_count: value.items.length });
  }

  async function loadGallery() {
    const { data, error } = await sb()
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data || [];
  }

  function renderGalleryGrid(images) {
    const grid = document.getElementById("galleryAdminGrid");
    if (!images.length) {
      grid.innerHTML = '<p class="admin-muted">No gallery images yet. Upload one above.</p>';
      return;
    }
    grid.innerHTML = images
      .map(
        (img) => `
        <article class="admin-gallery-card" data-id="${img.id}">
          <img src="${escapeHtml(img.public_url)}" alt="${escapeHtml(img.alt)}" loading="lazy" />
          <input type="text" data-alt value="${escapeHtml(img.alt)}" placeholder="Alt text" />
          <input type="number" data-sort value="${img.sort_order}" min="0" title="Sort order" />
          <div class="admin-gallery-actions">
            <button type="button" class="btn btn-outline btn-sm" data-save-meta>Save</button>
            <button type="button" class="btn btn-danger btn-sm" data-delete>Delete</button>
          </div>
        </article>`
      )
      .join("");
  }

  async function uploadGalleryImage(file, alt) {
    const client = sb();
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await client.storage.from("gallery").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (uploadError) throw uploadError;

    const { data: urlData } = client.storage.from("gallery").getPublicUrl(path);
    const { data: maxRow } = await client
      .from("gallery_images")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const sort_order = (maxRow?.sort_order || 0) + 1;
    const { data, error } = await client
      .from("gallery_images")
      .insert({
        storage_path: path,
        public_url: urlData.publicUrl,
        alt: alt || file.name.replace(/\.[^.]+$/, ""),
        sort_order,
      })
      .select()
      .single();
    if (error) throw error;

    await window.VillaAdminAuth.logAction("upload", "gallery", {
      id: data.id,
      filename: file.name,
      alt: data.alt,
    });
    return data;
  }

  async function updateGalleryMeta(id, alt, sort_order) {
    const { error } = await sb().from("gallery_images").update({ alt, sort_order }).eq("id", id);
    if (error) throw error;
    await window.VillaAdminAuth.logAction("update", "gallery", { id, alt, sort_order });
  }

  async function deleteGalleryImage(id, storage_path) {
    const client = sb();
    if (storage_path) {
      await client.storage.from("gallery").remove([storage_path]);
    }
    const { error } = await client.from("gallery_images").delete().eq("id", id);
    if (error) throw error;
    await window.VillaAdminAuth.logAction("delete", "gallery", { id, storage_path });
  }

  window.VillaAdmin = {
    loadRates,
    loadPolicies,
    saveRates,
    savePolicies,
    loadGallery,
    renderGalleryGrid,
    uploadGalleryImage,
    updateGalleryMeta,
    deleteGalleryImage,
    renderRatesForm,
    renderPoliciesForm,
    collectRatesForm,
    collectPoliciesForm,
    formatPeso,
  };
})();
