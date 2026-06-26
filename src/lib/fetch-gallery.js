export async function fetchGalleryImages(defaultImages) {
  const cfg = typeof window !== "undefined" ? window.VILLA_SUPABASE : null;
  if (!cfg?.url || !cfg?.anonKey || cfg.url.includes("YOUR_PROJECT")) {
    return defaultImages;
  }

  try {
    const url = new URL("/rest/v1/gallery_images", cfg.url);
    url.searchParams.set("select", "public_url,alt");
    url.searchParams.set("order", "sort_order.asc");

    const res = await fetch(url, {
      headers: {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !Array.isArray(data) || !data.length) {
      return defaultImages;
    }

    return data.map((row) => ({
      src: row.public_url,
      alt: row.alt || "",
    }));
  } catch {
    return defaultImages;
  }
}
