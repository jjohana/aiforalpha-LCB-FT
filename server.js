const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 4177);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "training-records.json");
const DATA_EVENTS_FILE = path.join(DATA_DIR, "training-events.jsonl");
const DATA_SCHEMA_VERSION = 2;
const MAX_SERVER_EVENTS = 1000;
const MAX_SERVER_ATTEMPTS = 200;

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
      schemaVersion: DATA_SCHEMA_VERSION,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      users: users.map(user => ({
        ...createUserRecord(user)
      }))
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
  if (!fs.existsSync(DATA_EVENTS_FILE)) fs.writeFileSync(DATA_EVENTS_FILE, "", "utf8");
}

function readData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8").replace(/^\uFEFF/, "");
  const data = normalizeData(JSON.parse(raw));
  for (const user of users) {
    if (!data.users.some(item => item.email === user.email)) {
      data.users.push(createUserRecord(user));
    }
  }
  return data;
}

function writeData(data) {
  data.schemaVersion = DATA_SCHEMA_VERSION;
  data.updatedAt = new Date().toISOString();
  const tempFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tempFile, DATA_FILE);
}

function appendAuditEvent(event) {
  ensureDataFile();
  fs.appendFileSync(DATA_EVENTS_FILE, `${JSON.stringify({ ...event, at: event.at || new Date().toISOString() })}\n`, "utf8");
}

function createUserRecord(user) {
  return {
    ...user,
    loginCount: 0,
    lastLoginAt: null,
    currentSessionId: null,
    totalTimeMs: 0,
    moduleTimeMs: {},
    sessions: [],
    events: [],
    latestProgress: null,
    attempts: []
  };
}

function normalizeData(data) {
  const normalized = data && typeof data === "object" ? data : {};
  normalized.schemaVersion = normalized.schemaVersion || 1;
  normalized.createdAt = normalized.createdAt || new Date().toISOString();
  normalized.updatedAt = normalized.updatedAt || normalized.createdAt;
  normalized.users = Array.isArray(normalized.users) ? normalized.users.map(normalizeUserRecord) : [];
  return normalized;
}

function normalizeUserRecord(record) {
  const allowed = users.find(user => user.email.toLowerCase() === String(record.email || "").toLowerCase()) || {};
  return {
    ...allowed,
    ...record,
    loginCount: Number(record.loginCount || 0),
    lastLoginAt: record.lastLoginAt || null,
    currentSessionId: record.currentSessionId || null,
    totalTimeMs: Number(record.totalTimeMs || record.latestProgress?.result?.timeSpentMs || 0),
    moduleTimeMs: record.moduleTimeMs && typeof record.moduleTimeMs === "object" ? record.moduleTimeMs : {},
    sessions: Array.isArray(record.sessions) ? record.sessions : [],
    events: Array.isArray(record.events) ? record.events.slice(-MAX_SERVER_EVENTS) : [],
    latestProgress: record.latestProgress || null,
    attempts: Array.isArray(record.attempts) ? record.attempts.slice(-MAX_SERVER_ATTEMPTS) : []
  };
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
    totalTimeMs: user.totalTimeMs || 0,
    moduleTimeMs: user.moduleTimeMs || {},
    latestProgress: user.latestProgress,
    attempts: user.attempts
  };
}

function isValidSession(user, sessionId) {
  if (!sessionId) return false;
  if (user.currentSessionId === sessionId) return true;
  return Array.isArray(user.sessions) && user.sessions.some(session => session.sessionId === sessionId);
}

function touchSession(user, sessionId, now) {
  user.sessions = Array.isArray(user.sessions) ? user.sessions : [];
  const session = user.sessions.find(item => item.sessionId === sessionId);
  if (session) {
    session.lastSeenAt = now;
    return;
  }
  user.sessions.push({ sessionId, createdAt: now, lastSeenAt: now });
  user.sessions = user.sessions.slice(-50);
}

function mergeModuleTimes(...sources) {
  const result = {};
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    for (const [moduleId, value] of Object.entries(source)) {
      const time = Number(value || 0);
      if (Number.isFinite(time) && time >= 0) {
        result[moduleId] = Math.max(Number(result[moduleId] || 0), time);
      }
    }
  }
  return result;
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function dateMs(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : 0;
}

function progressQuality(progress) {
  const result = progress?.result || {};
  return {
    completedAtMs: dateMs(result.completedAt),
    trainingPassed: Boolean(result.trainingPassed || result.passed),
    qcmPassed: Boolean(result.qcmPassed || result.passed),
    modulesComplete: Boolean(result.modulesComplete || safeNumber(result.modulesRead) >= safeNumber(result.totalModules || 7)),
    score: safeNumber(result.score),
    correct: safeNumber(result.correct),
    answered: safeNumber(result.answered),
    modulesRead: safeNumber(result.modulesRead)
  };
}

function shouldReplaceLatestProgress(existingProgress, incomingProgress) {
  if (!existingProgress) return true;
  const existing = progressQuality(existingProgress);
  const incoming = progressQuality(incomingProgress);

  if (incoming.completedAtMs > existing.completedAtMs + 1000) return true;
  if (existing.completedAtMs > incoming.completedAtMs + 1000) {
    if (
      existing.trainingPassed
      && incoming.trainingPassed
      && existing.answered >= incoming.answered
      && existing.modulesRead >= incoming.modulesRead
      && existing.correct >= incoming.correct
    ) {
      return false;
    }
  }

  if (incoming.trainingPassed && !existing.trainingPassed) return true;
  if (!incoming.trainingPassed && existing.trainingPassed && incoming.answered <= existing.answered && incoming.modulesRead <= existing.modulesRead) return false;
  if (incoming.answered > existing.answered) return true;
  if (incoming.modulesRead > existing.modulesRead && incoming.answered >= existing.answered) return true;
  if (incoming.answered >= existing.answered && incoming.modulesRead >= existing.modulesRead && incoming.correct > existing.correct) return true;
  if (existing.answered >= incoming.answered && existing.modulesRead >= incoming.modulesRead && existing.correct > incoming.correct) return false;
  return true;
}

function shouldStoreAttempt(attempts, incomingAttempt) {
  const incomingCompletedMs = dateMs(incomingAttempt.completedAt);
  return !attempts.some(existing => {
    const existingCompletedMs = dateMs(existing.completedAt);
    return existingCompletedMs > incomingCompletedMs + 1000
      && Boolean(existing.passed)
      && Boolean(incomingAttempt.passed)
      && safeNumber(existing.correct) >= safeNumber(incomingAttempt.correct)
      && safeNumber(existing.answered) >= safeNumber(incomingAttempt.answered)
      && safeNumber(existing.modulesRead) >= safeNumber(incomingAttempt.modulesRead);
  });
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
    user.sessions = user.sessions || [];
    user.sessions.push({
      sessionId,
      createdAt: now,
      lastSeenAt: now,
      userAgent: req.headers["user-agent"] || null,
      ip: req.socket.remoteAddress || null
    });
    user.sessions = user.sessions.slice(-50);
    user.events = user.events || [];
    user.events.push({
      type: "login",
      at: now,
      sessionId,
      userAgent: req.headers["user-agent"] || null,
      ip: req.socket.remoteAddress || null
    });
    user.events = user.events.slice(-MAX_SERVER_EVENTS);
    appendAuditEvent({
      type: "login",
      email,
      sessionId,
      userAgent: req.headers["user-agent"] || null,
      ip: req.socket.remoteAddress || null,
      at: now
    });
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

    if (!user || !isValidSession(user, sessionId)) {
      sendJson(res, 403, { error: "invalid_session" });
      return;
    }

    const now = new Date().toISOString();
    touchSession(user, sessionId, now);
    user.totalTimeMs = Math.max(
      Number(user.totalTimeMs || 0),
      Number(body.result?.timeSpentMs || 0),
      Number(body.longRecord?.totalTimeMs || 0)
    );
    user.moduleTimeMs = mergeModuleTimes(user.moduleTimeMs, body.result?.moduleTimeMs, body.longRecord?.moduleTimeMs);
    const incomingProgress = {
      savedAt: now,
      reason: body.reason || null,
      role: body.learner?.role || null,
      roleLabel: body.learner?.roleLabel || null,
      result: body.result || null,
      storage: body.storage || null,
      longRecord: body.longRecord || null,
      readModules: body.readModules || [],
      answers: body.answers || []
    };
    const latestProgressAccepted = shouldReplaceLatestProgress(user.latestProgress, incomingProgress);
    if (latestProgressAccepted) {
      user.latestProgress = incomingProgress;
    }
    user.events = user.events || [];
    user.events.push({
      type: "progress",
      at: now,
      sessionId,
      reason: body.reason || null,
      accepted: latestProgressAccepted,
      score: body.result?.score ?? null,
      correct: body.result?.correct ?? null,
      answered: body.result?.answered ?? null,
      timeSpentMs: body.result?.timeSpentMs ?? null,
      passed: Boolean(body.result?.passed)
    });
    user.events = user.events.slice(-MAX_SERVER_EVENTS);
    appendAuditEvent({
      type: "progress",
      email,
      sessionId,
      reason: body.reason || null,
      accepted: latestProgressAccepted,
      score: body.result?.score ?? null,
      correct: body.result?.correct ?? null,
      answered: body.result?.answered ?? null,
      timeSpentMs: body.result?.timeSpentMs ?? null,
      passed: Boolean(body.result?.passed),
      at: now
    });

    if (body.result?.completedAt) {
      user.attempts = user.attempts || [];
      const attemptId = body.longRecord?.latestSnapshot?.attemptId || body.answers?.[0]?.attemptId || `${sessionId}:${body.result.completedAt}`;
      const exists = user.attempts.some(attempt => attempt.completedAt === body.result.completedAt || attempt.attemptId === attemptId);
      if (!exists) {
        const incomingAttempt = {
          attemptId,
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
          passed: Boolean(body.result.passed),
          timeSpentMs: body.result.timeSpentMs || null,
          attemptTimeMs: body.result.attemptTimeMs || null,
          answers: body.answers || []
        };
        if (shouldStoreAttempt(user.attempts, incomingAttempt)) {
          user.attempts.push(incomingAttempt);
        }
        user.attempts = user.attempts.slice(-MAX_SERVER_ATTEMPTS);
      }
    }

    writeData(data);
    sendJson(res, 200, { ok: true, user: sanitizePublicUser(user) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/user") {
    const email = url.searchParams.get("email");
    const sessionId = url.searchParams.get("sessionId");
    const data = readData();
    const user = findUserRecord(data, email);

    if (!user || !isValidSession(user, sessionId)) {
      sendJson(res, 403, { error: "invalid_session" });
      return;
    }

    touchSession(user, sessionId, new Date().toISOString());
    writeData(data);
    sendJson(res, 200, { user: sanitizePublicUser(user) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/admin/records") {
    const email = url.searchParams.get("email");
    const sessionId = url.searchParams.get("sessionId");
    const data = readData();
    const user = findUserRecord(data, email);

    if (!user || !user.isAdmin || !isValidSession(user, sessionId)) {
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
