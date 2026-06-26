(function () {
  const auth = window.VillaAdminAuth;
  const loginForm = document.getElementById("loginForm");
  const loginAlert = document.getElementById("loginAlert");

  function showAlert(message, type) {
    loginAlert.textContent = message;
    loginAlert.className = `admin-alert admin-alert-${type}`;
  }

  async function boot() {
    if (!auth.isConfigured()) {
      showAlert(
        "Supabase is not configured. Open js/supabase-config.js on your computer and paste your Project URL and anon public key from Supabase → Project Settings → API. On Vercel, add VILLA_SUPABASE_URL and VILLA_SUPABASE_ANON_KEY environment variables, then redeploy.",
        "info"
      );
      return;
    }

    try {
      const user = await auth.requireAdmin();
      if (user) {
        window.location.replace("./admin-dashboard.html");
      }
    } catch (err) {
      showAlert(err.message, "error");
    }
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginAlert.className = "admin-alert admin-hidden";
    try {
      await auth.signIn(
        document.getElementById("loginEmail").value.trim(),
        document.getElementById("loginPassword").value
      );
      window.location.replace("./admin-dashboard.html");
    } catch (err) {
      showAlert(err.message, "error");
    }
  });

  boot();
})();
