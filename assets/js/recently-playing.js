(function () {
  // ── Config ────────────────────────────────────────────────────────────────
  var WORKER_URL = "https://recently-playing.still-dawn-ccee.workers.dev";
  // ─────────────────────────────────────────────────────────────────────────

  var widget = document.getElementById("rp-widget");

  function relativeTime(iso) {
    var diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + " mins ago";
    if (diff < 86400) {
      var h = Math.floor(diff / 3600);
      return h + " hour" + (h !== 1 ? "s" : "") + " ago";
    }
    var d = Math.floor(diff / 86400);
    return d + " day" + (d !== 1 ? "s" : "") + " ago";
  }

  var iconClock =
    '<svg class="rp-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  var iconTrophy =
    '<svg class="rp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9H3V4h3M18 9h3V4h-3M6 4h12v8a6 6 0 0 1-12 0V4z"/><path d="M12 18v3M8 21h8"/></svg>';
  var iconGamepad =
    '<svg style="width:30px;height:30px;stroke:rgba(255,255,255,0.25);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 11h.01M17 13h.01"/></svg>';

  function makeGamepadFallback() {
    var div = document.createElement("div");
    div.className = "rp-art rp-art--fallback";
    div.innerHTML = iconGamepad;
    return div;
  }

  function render(game) {
    var card = document.createElement("div");
    card.className = "rp-card";

    if (game.cover_url) {
      var img = document.createElement("img");
      img.className = "rp-art";
      img.src = game.cover_url;
      img.alt = game.title + " cover art";
      img.onerror = function () {
        this.parentNode.replaceChild(makeGamepadFallback(), this);
      };
      card.appendChild(img);
    } else {
      card.appendChild(makeGamepadFallback());
    }

    var sourceLabel = game.source === "steam" ? "Steam" : "RetroAchievements";
    var timeAgo = game.last_played ? relativeTime(game.last_played) : "";

    var meta = document.createElement("div");
    meta.className = "rp-meta";
    meta.innerHTML =
      '<p class="rp-label"><span class="rp-pulse" aria-hidden="true"></span>Recently playing</p>' +
      '<p class="rp-title">' +
      game.title +
      "</p>" +
      '<span class="rp-platform">' +
      game.platform +
      " \u00b7 " +
      sourceLabel +
      "</span>" +
      '<div class="rp-stats">' +
      '<span class="rp-stat">' +
      iconClock +
      game.playtime_label +
      "</span>" +
      '<span class="rp-stat">' +
      iconTrophy +
      game.achievement_label +
      "</span>" +
      "</div>" +
      (timeAgo ? '<p class="rp-time">Last played ' + timeAgo + "</p>" : "");

    card.appendChild(meta);
    widget.innerHTML = "";
    widget.appendChild(card);
  }

  function renderError() {
    var card = document.createElement("div");
    card.className = "rp-card";
    card.appendChild(makeGamepadFallback());

    var meta = document.createElement("div");
    meta.className = "rp-meta";
    meta.innerHTML =
      '<p class="rp-label"><span class="rp-pulse" style="background:#f87171" aria-hidden="true"></span>Recently playing</p>' +
      '<p class="rp-title">Couldn\'t load game data</p>' +
      '<p class="rp-error-note">Worker unreachable or APIs timed out.</p>';

    card.appendChild(meta);
    widget.innerHTML = "";
    widget.appendChild(card);
  }

  fetch(WORKER_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (game) {
      if (game.error) {
        renderError();
        return;
      }
      render(game);
    })
    .catch(renderError);
})();
