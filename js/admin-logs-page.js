(function () {
  const { sb, escapeHtml } = window.VillaAdminAuth;

  function formatDate(iso) {
    return new Date(iso).toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function actionLabel(action, entity) {
    const labels = {
      upload: "Uploaded",
      delete: "Deleted",
      update: "Updated",
    };
    return `${labels[action] || action} ${entity}`;
  }

  function renderDetails(details) {
    if (!details || !Object.keys(details).length) return "—";
    return Object.entries(details)
      .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`)
      .join(" · ");
  }

  async function loadLogs(limit = 100) {
    const { data, error } = await sb()
      .from("admin_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  function renderLogsTable(logs) {
    const tbody = document.getElementById("logsTableBody");
    if (!logs.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="admin-muted">No activity logged yet.</td></tr>';
      return;
    }
    tbody.innerHTML = logs
      .map(
        (log) => `
        <tr>
          <td>${escapeHtml(formatDate(log.created_at))}</td>
          <td>${escapeHtml(log.admin_email || "—")}</td>
          <td><span class="admin-badge">${escapeHtml(actionLabel(log.action, log.entity))}</span></td>
          <td>${escapeHtml(log.entity)}</td>
          <td class="admin-log-details">${escapeHtml(renderDetails(log.details))}</td>
        </tr>`
      )
      .join("");
  }

  window.VillaAdminLogs = { loadLogs, renderLogsTable };
})();
