/**
 * Cloudflare Worker — recently-playing
 *
 * Returns the most recently played game across Steam and RetroAchievements.
 *
 * Required secrets (set via `wrangler secret put` or the CF dashboard):
 *   STEAM_API_KEY   — Steam Web API key
 *   STEAM_USER_ID   — Your Steam64 ID (e.g. "76561198012345678")
 *   RA_API_KEY      — RetroAchievements Web API key (from retroachievements.org/controlpanel.php)
 *   RA_USERNAME     — Your RetroAchievements username
 *
 * Optional env var (wrangler.toml [vars]):
 *   ALLOWED_ORIGIN  — Your site origin for CORS, e.g. "https://yoursite.com"
 *
 * Deploy:  wrangler deploy
 * Dev:     wrangler dev --local
 */

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN ?? "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    try {
      const [steamResult, raResult] = await Promise.allSettled([
        fetchSteam(env.STEAM_API_KEY, env.STEAM_USER_ID),
        fetchRA(env.RA_API_KEY, env.RA_USERNAME),
      ]);

      const steam =
        steamResult.status === "fulfilled" ? steamResult.value : null;
      const ra = raResult.status === "fulfilled" ? raResult.value : null;

      const game = pickMostRecent(steam, ra);

      if (!game) {
        return jsonResponse({ error: "No recent games found" }, 404, origin);
      }

      return jsonResponse(game, 200, origin);
    } catch (err) {
      return jsonResponse(
        { error: "Internal error", detail: err.message },
        500,
        origin,
      );
    }
  },
};

// ---------------------------------------------------------------------------
// Steam
// ---------------------------------------------------------------------------

async function fetchSteam(apiKey, steamId) {
  // GetOwnedGames reliably includes rtime_last_played for every game ever played.
  // GetRecentlyPlayedGames only covers 2 weeks and often omits rtime_last_played
  // even on public profiles, so we skip it entirely and use owned games as the
  // single source of truth, sorted by timestamp.
  const ownedUrl = new URL(
    "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
  );
  ownedUrl.searchParams.set("key", apiKey);
  ownedUrl.searchParams.set("steamid", steamId);
  ownedUrl.searchParams.set("include_appinfo", "true");
  ownedUrl.searchParams.set("include_played_free_games", "true");
  ownedUrl.searchParams.set("format", "json");

  const ownedRes = await fetch(ownedUrl.toString());
  if (!ownedRes.ok) throw new Error(`Steam owned API ${ownedRes.status}`);
  const ownedData = await ownedRes.json();

  const allGames = ownedData?.response?.games ?? [];
  if (allGames.length === 0) return null;

  // Sort descending by last played; games never launched have rtime=0
  allGames.sort(
    (a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0),
  );
  const g = allGames[0];
  console.log(g);
  // If the top game has never been launched, nothing useful to show
  if (!g || !g.rtime_last_played) return null;

  let achievementLabel = null;
  try {
    achievementLabel = await fetchSteamAchievements(apiKey, steamId, g.appid);
  } catch (_) {}

  const rtimeRaw = g.rtime_last_played || null;
  const lastPlayed = rtimeRaw ? new Date(rtimeRaw * 1000).toISOString() : null;

  const hours = Math.round((g.playtime_forever ?? 0) / 60);
  const playtimeLabel =
    hours < 1
      ? `${g.playtime_forever ?? 0} mins played`
      : `${hours} hr${hours !== 1 ? "s" : ""} played`;

  return {
    source: "steam",
    title: g.name,
    platform: "PC",
    cover_url: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
    last_played: lastPlayed,
    playtime_label: playtimeLabel,
    achievement_label: achievementLabel ?? "No achievements",
  };
}

async function fetchSteamAchievements(apiKey, steamId, appId) {
  const url = new URL(
    "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/",
  );
  url.searchParams.set("key", apiKey);
  url.searchParams.set("steamid", steamId);
  url.searchParams.set("appid", String(appId));

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();

  const achievements = data?.playerstats?.achievements;

  if (!achievements) return null;
  const earned = achievements.filter((a) => a.achieved === 1).length;
  const total = achievements.length;
  return `${earned} / ${total} achievements`;
}

// ---------------------------------------------------------------------------
// RetroAchievements
// ---------------------------------------------------------------------------

async function fetchRA(apiKey, username) {
  // Auth is via the `y` query param — same PHP-style URL, no Bearer header.
  // Key is from: https://retroachievements.org/controlpanel.php
  const url = new URL(
    "https://retroachievements.org/API/API_GetUserRecentlyPlayedGames.php",
  );
  url.searchParams.set("u", username);
  url.searchParams.set("y", apiKey);
  url.searchParams.set("c", "1");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "recently-playing-widget/1.0" },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`RA API ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const g = data[0];

  // LastPlayed is "YYYY-MM-DD HH:MM:SS" UTC
  const lastPlayedRaw = g.LastPlayed ?? null;
  let lastPlayed = null;
  if (lastPlayedRaw) {
    const normalized = lastPlayedRaw.includes("T")
      ? lastPlayedRaw.endsWith("Z")
        ? lastPlayedRaw
        : lastPlayedRaw + "Z"
      : lastPlayedRaw.replace(" ", "T") + "Z";
    const parsed = new Date(normalized);
    lastPlayed = isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  console.log(g);
  const earned = Math.max(g.NumAchievedHardcore ?? 0, g.NumAchieved ?? 0);
  const total = g.NumPossibleAchievements ?? 0;
  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;

  return {
    source: "retroachievements",
    title: g.Title,
    platform: g.ConsoleName ?? "Retro",
    cover_url: g.ImageIcon
      ? `https://retroachievements.org${g.ImageIcon}`
      : null,
    last_played: lastPlayed,
    playtime_label: `${pct}% complete`,
    achievement_label: `${earned} / ${total} achievements`,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickMostRecent(steam, ra) {
  if (!steam && !ra) return null;
  if (!steam) return ra;
  if (!ra) return steam;

  const steamTime = steam.last_played ? Date.parse(steam.last_played) : 0;
  const raTime = ra.last_played ? Date.parse(ra.last_played) : 0;

  if (steamTime === 0 && raTime === 0) return ra;

  return steamTime >= raTime ? steam : ra;
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
      ...corsHeaders(origin),
    },
  });
}
