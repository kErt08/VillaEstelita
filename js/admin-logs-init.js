(function () {
  const auth = window.VillaAdminAuth;
  const logs = window.VillaAdminLogs;

  const loginView = document.getElementById("loginView");
  const logsView = document.getElementById("logsView");
  const loginForm = document.getElementById("loginForm");
  const loginAlert = document.getElementById("loginAlert");
  const logsAlert = document.getElementById("logsAlert");

  function showAlert(el, message, type) {
    el.textContent = message;
    el.className = `admin-alert admin-alert-${type}`;
  }

  function hideAlert(el) {
    el.className = "admin-alert admin-hidden";
  }

  async function loadLogsTable() {
    const rows = await logs.loadLogs();
    logs.renderLogsTable(rows);
  }

  async function showLogs(user) {
    loginView.classList.add("admin-hidden");
    logsView.classList.remove("admin-hidden");
    document.getElementById("adminEmailLabel").textContent = user.email;
    await loadLogsTable();
  }

  function showLogin() {
    logsView.classList.add("admin-hidden");
    loginView.classList.remove("admin-hidden");
  }

  async function boot() {
    if (!auth.isConfigured()) {
      showAlert(
        loginAlert,
        "Supabase is not configured. Edit js/supabase-config.js with your project credentials.",
        "info"
      );
      return;
    }

    try {
      const user = await auth.requireAdmin();
      if (user) await showLogs(user);
    } catch (err) {
      showAlert(loginAlert, err.message, "error");
    }
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert(loginAlert);
    try {
      const user = await auth.signIn(
        document.getElementById("loginEmail").value.trim(),
        document.getElementById("loginPassword").value
      );
      await showLogs(user);
    } catch (err) {
      showAlert(loginAlert, err.message, "error");
    }
  });

  document.getElementById("signOutBtn").addEventListener("click", async () => {
    await auth.signOut();
    showLogin();
  });

  document.getElementById("refreshLogsBtn").addEventListener("click", async () => {
    try {
      await loadLogsTable();
      showAlert(logsAlert, "Logs refreshed.", "success");
    } catch (err) {
      showAlert(logsAlert, err.message, "error");
    }
  });

  boot();
})();
