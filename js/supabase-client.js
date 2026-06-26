(function () {
  const cfg = window.VILLA_SUPABASE;
  const url = cfg?.url || "";
  const anonKey = cfg?.anonKey || "";
  const isPlaceholder =
    !url ||
    !anonKey ||
    url.includes("YOUR_PROJECT") ||
    anonKey.includes("YOUR_ANON") ||
    anonKey.startsWith("sb_secret_");

  if (isPlaceholder) {
    window.villaSupabase = null;
    return;
  }
  window.villaSupabase = window.supabase.createClient(url, anonKey);
})();
