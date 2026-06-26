(function () {
  const kb = window.VillaEstelitaKB;
  if (!kb) return;

  const widget = document.getElementById("veChatbot");
  const panel = document.getElementById("veChatPanel");
  const toggle = document.getElementById("veChatToggle");
  const closeBtn = document.getElementById("veChatClose");
  const messagesEl = document.getElementById("veChatMessages");
  const form = document.getElementById("veChatForm");
  const input = document.getElementById("veChatInput");
  const chipsEl = document.getElementById("veChatChips");

  if (!widget || !panel || !toggle || !closeBtn || !messagesEl || !form || !input || !chipsEl) return;

  let greeted = false;

  const STOP_WORDS = new Set([
    "how", "can", "what", "when", "where", "why", "who", "are", "is", "do", "does",
    "the", "you", "your", "our", "for", "and", "or", "in", "at", "to", "a", "an",
    "me", "we", "they", "this", "that", "i", "my", "of", "on", "it", "be", "as",
  ]);

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s?₱]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(text) {
    return normalize(text)
      .split(" ")
      .filter((w) => w.length > 1);
  }

  function keywordMatches(keyword, q, tokens) {
    const k = normalize(keyword);
    const parts = k.split(" ").filter(Boolean);

    if (parts.length > 1) {
      return q.includes(k);
    }

    if (parts.length === 1) {
      const word = parts[0];
      if (word.length <= 3) {
        return tokens.includes(word);
      }
      return tokens.includes(word);
    }

    return false;
  }

  function scoreEntry(query, entry) {
    const q = normalize(query);
    const tokens = tokenize(query);
    let score = 0;

    for (const keyword of entry.keywords) {
      const k = normalize(keyword);
      if (keywordMatches(keyword, q, tokens)) {
        score += k.split(" ").filter(Boolean).length * 4;
      } else {
        const kwTokens = k.split(" ").filter((t) => t.length > 1 && !STOP_WORDS.has(t));
        const overlap = kwTokens.filter((t) => tokens.includes(t)).length;
        if (overlap >= 2 || (overlap === 1 && kwTokens.length === 1)) {
          score += overlap * 2;
        }
      }
    }

    if (entry.id === "greeting" && tokens.length <= 2) score += 1;
    return score;
  }

  function findAnswer(query) {
    const trimmed = query.trim();
    const qNorm = normalize(trimmed);

    if (kb.quickAnswers && kb.quickAnswers[trimmed]) {
      const quickEntry = kb.entries.find((e) => e.id === kb.quickAnswers[trimmed]);
      if (quickEntry) return quickEntry.answer;
    }

    if (/\b(facebook|fb|messenger|social media)\b/.test(qNorm)) {
      const fb = kb.entries.find((e) => e.id === "facebook");
      if (fb) return fb.answer;
    }

    if (/\b(contact|phone|call|text|number|reach)\b/.test(qNorm) && !/\b(emergency|911)\b/.test(qNorm)) {
      const contact = kb.entries.find((e) => e.id === "contact");
      if (contact) return contact.answer;
    }

    if (/\b(house rules|stay guidelines|guidelines|important rules)\b/.test(qNorm)) {
      const rules = kb.entries.find((e) => e.id === "stay-guidelines");
      if (rules) return rules.answer;
    }

    let best = null;
    let bestScore = 0;

    for (const entry of kb.entries) {
      const score = scoreEntry(query, entry);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    if (best && bestScore >= 2) return best.answer;

    return (
      "I'm not sure about that specific detail, but our team can help!\n\n" +
      "• Call: 0999 228 6117\n" +
      "• Facebook: facebook.com/VillaEstelitaIdian\n" +
      "• Book: Airbnb via the Book Here button on this site\n\n" +
      "Try asking about rates, location, capacity, amenities, check-in times, or booking."
    );
  }

  function linkify(text) {
    return text
      .replace(/facebook\.com\/VillaEstelitaIdian/gi, '<a href="' + kb.links.facebook + '" target="_blank" rel="noopener noreferrer">facebook.com/VillaEstelitaIdian</a>')
      .replace(/@VillaEstelitaIdian/g, '<a href="' + kb.links.facebook + '" target="_blank" rel="noopener noreferrer">@VillaEstelitaIdian</a>')
      .replace(/0999 228 6117/g, '<a href="' + kb.links.phone + '">0999 228 6117</a>')
      .replace(/\n/g, "<br>");
  }

  function appendMessage(text, role) {
    const bubble = document.createElement("div");
    bubble.className = "ve-chat-msg ve-chat-msg--" + role;
    bubble.innerHTML = role === "bot" ? linkify(text) : escapeHtml(text).replace(/\n/g, "<br>");
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "ve-chat-msg ve-chat-msg--bot ve-chat-typing";
    el.id = "veChatTyping";
    el.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    document.getElementById("veChatTyping")?.remove();
  }

  function respond(query) {
    showTyping();
    window.setTimeout(() => {
      hideTyping();
      appendMessage(findAnswer(query), "bot");
    }, 350 + Math.random() * 250);
  }

  function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    appendMessage(trimmed, "user");
    input.value = "";
    respond(trimmed);
  }

  function isOpen() {
    return panel.classList.contains("is-open");
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    widget.classList.add("ve-chatbot--open");
    if (!greeted) {
      greeted = true;
      appendMessage(
        "Hi! I'm your Villa Estelita assistant. Ask anything about the resort — rates, booking, pool, amenities, location, or house rules.",
        "bot"
      );
    }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    widget.classList.remove("ve-chatbot--open");
  }

  function renderChips() {
    chipsEl.innerHTML = "";
    kb.quickQuestions.forEach((q) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ve-chat-chip";
      btn.textContent = q;
      btn.addEventListener("click", () => {
        if (!isOpen()) openPanel();
        handleUserMessage(q);
      });
      chipsEl.appendChild(btn);
    });
  }

  toggle.addEventListener("click", () => {
    if (!isOpen()) openPanel();
    else closePanel();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closePanel();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closePanel();
  });

  renderChips();
})();
