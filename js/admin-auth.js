(function () {
  const ADMIN_EMAIL = "idiankert@gmail.com";
  const sb = () => window.villaSupabase;

  function isConfigured() {
    return Boolean(sb());
  }

  function isAdminUser(user) {
    return user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }

  async function getSession() {
    const client = sb();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session;
  }

  async function getAdminUser() {
    const session = await getSession();
    if (!session?.user || !isAdminUser(session.user)) return null;
    return session.user;
  }

  async function requireAdmin() {
    const client = sb();
    if (!client) {
      throw new Error("Supabase is not configured. Edit js/supabase-config.js.");
    }
    const session = await getSession();
    if (!session) return null;
    if (!isAdminUser(session.user)) {
      await client.auth.signOut();
      throw new Error("This account does not have admin access.");
    }
    return session.user;
  }

  async function signIn(email, password) {
    const client = sb();
    if (!client) throw new Error("Supabase is not configured.");
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      throw new Error("Only the authorized admin account can sign in.");
    }
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!isAdminUser(data.user)) {
      await client.auth.signOut();
      throw new Error("This account is not authorized as admin.");
    }
    return data.user;
  }

  async function signOut() {
    const client = sb();
    if (client) await client.auth.signOut();
  }

  async function logAction(action, entity, details) {
    const client = sb();
    const user = await getAdminUser();
    if (!client || !user) return;
    await client.from("admin_logs").insert({
      admin_id: user.id,
      admin_email: user.email,
      action,
      entity,
      details: details || {},
    });
  }

  function formatPeso(amount) {
    return "₱" + Number(amount).toLocaleString("en-PH");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.VillaAdminAuth = {
    ADMIN_EMAIL,
    sb,
    isConfigured,
    isAdminUser,
    getSession,
    getAdminUser,
    requireAdmin,
    signIn,
    signOut,
    logAction,
    formatPeso,
    escapeHtml,
  };
})();
