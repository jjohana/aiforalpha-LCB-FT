const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 4177);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "training-records.json");

const users = [
  { email: "eric.benhamou@aiforalpha.com", name: "Eric Benhamou", defaultRole: "compliance", isAdmin: true },
  { email: "beatrice.guez@aiforalpha.com", name: "Béatrice Guez", defaultRole: "compliance", isAdmin: true },
  { email: "jean-jacques.ohana@aiforalpha.com", name: "Jean-Jacques Ohana", defaultRole: "compliance", isAdmin: true },
  { email: "ethan.setrouk@aiforalpha.com", name: "Ethan Setrouk", defaultRole: "research", isAdmin: false },
  { email: "chamyl.saadi@aiforalpha.com", name: "Chamyl Saadi", defaultRole: "client", isAdmin: false },
  { email: "thomas.jacquot@aiforalpha.com", name: "Thomas Jacquot", defaultRole: "research", isAdmin: false }
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const initial = {
      createdAt: new Date().toISOString(),
      users: users.map(user => ({
        ...user,
        loginCount: 0,
        lastLoginAt: null,
        currentSessionId: null,
        events: [],
        latestProgress: null,
        attempts: []
      }))
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

function readData() {
  ensureDataFile();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  for (const user of users) {
    if (!data.users.some(item => item.email === user.email)) {
      data.users.push({
        ...user,
        loginCount: 0,
        lastLoginAt: null,
        currentSessionId: null,
        events: [],
        latestProgress: null,
        attempts: []
      });
    }
  }
  return data;
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function findUserRecord(data, email) {
  return data.users.find(user => user.email.toLowerCase() === String(email || "").toLowerCase());
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function sanitizePublicUser(user) {
  return {
    email: user.email,
    name: user.name,
    defaultRole: user.defaultRole,
    isAdmin: user.isAdmin,
    loginCount: user.loginCount,
    lastLoginAt: user.lastLoginAt,
    latestProgress: user.latestProgress,
    attempts: user.attempts
  };
}

async function handleApi(req, res, url) {
  if (req.method === "POST" && url.pathname === "/api/login") {
    const body = await parseBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const data = readData();
    const user = findUserRecord(data, email);

    if (!user) {
      sendJson(res, 403, { error: "unauthorized" });
      return;
    }

    const sessionId = crypto.randomUUID();
    const now = new Date().toISOString();
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLoginAt = now;
    user.currentSessionId = sessionId;
    user.events = user.events || [];
    user.events.push({
      type: "login",
      at: now,
      sessionId,
      userAgent: req.headers["user-agent"] || null,
      ip: req.socket.remoteAddress || null
    });
    user.events = user.events.slice(-100);
    writeData(data);

    sendJson(res, 200, { sessionId, user: sanitizePublicUser(user) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/progress") {
    const body = await parseBody(req);
    const email = body?.learner?.email;
    const sessionId = body?.learner?.sessionId;
    const data = readData();
    const user = findUserRecord(data, email);

    if (!user || user.currentSessionId !== sessionId) {
      sendJson(res, 403, { error: "invalid_session" });
      return;
    }

    const now = new Date().toISOString();
    user.latestProgress = {
      savedAt: now,
      reason: body.reason || null,
      role: body.learner?.role || null,
      roleLabel: body.learner?.roleLabel || null,
      result: body.result || null,
      readModules: body.readModules || [],
      answers: body.answers || []
    };
    user.events = user.events || [];
    user.events.push({
      type: "progress",
      at: now,
      sessionId,
      reason: body.reason || null,
      score: body.result?.score ?? null,
      passed: Boolean(body.result?.passed)
    });
    user.events = user.events.slice(-100);

    if (body.result?.completedAt) {
      user.attempts = user.attempts || [];
      const exists = user.attempts.some(attempt => attempt.completedAt === body.result.completedAt);
      if (!exists) {
        user.attempts.push({
          completedAt: body.result.completedAt,
          savedAt: now,
          role: body.learner?.role || null,
          roleLabel: body.learner?.roleLabel || null,
          score: body.result.score,
          correct: body.result.correct,
          answered: body.result.answered,
          totalQuestions: body.result.totalQuestions,
          modulesRead: body.result.modulesRead,
          totalModules: body.result.totalModules,
          passed: Boolean(body.result.passed)
        });
        user.attempts = user.attempts.slice(-20);
      }
    }

    writeData(data);
    sendJson(res, 200, { ok: true, user: sanitizePublicUser(user) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/admin/records") {
    const email = url.searchParams.get("email");
    const sessionId = url.searchParams.get("sessionId");
    const data = readData();
    const user = findUserRecord(data, email);

    if (!user || !user.isAdmin || user.currentSessionId !== sessionId) {
      sendJson(res, 403, { error: "admin_required" });
      return;
    }

    sendJson(res, 200, { users: data.users.map(sanitizePublicUser) });
    return;
  }

  sendJson(res, 404, { error: "not_found" });
}

function serveStatic(req, res, url) {
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(ROOT, requested));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { error: "server_error", message: error.message });
  }
});

ensureDataFile();
server.listen(PORT, () => {
  console.log(`LCB-FT training site running at http://localhost:${PORT}`);
});
