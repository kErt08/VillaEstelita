(function () {
  function bindToggle(btn) {
    const field = btn.closest(".password-field");
    const input = field?.querySelector("input");
    if (!input) return;

    btn.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", String(show));
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      btn.classList.toggle("is-visible", show);
    });
  }

  document.querySelectorAll(".password-toggle").forEach(bindToggle);
})();
