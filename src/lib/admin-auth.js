import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "psaa_admin_session";
const sessionDurationSeconds = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-admin-session-secret-change-me";
}

export function shouldUseSecureAdminCookie() {
  return process.env.ADMIN_COOKIE_SECURE === "true";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin12345",
  };
}

function sign(value) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function credentialsMatch(username, password) {
  const credentials = getAdminCredentials();
  return safeEqual(username, credentials.username) && safeEqual(password, credentials.password);
}

export function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function isAdminSessionValid(token) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature) {
    return false;
  }

  const expiresAtNumber = Number(expiresAt);

  if (!Number.isFinite(expiresAtNumber) || expiresAtNumber < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return safeEqual(signature, sign(expiresAt));
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureAdminCookie(),
    path: "/",
    maxAge: sessionDurationSeconds,
  };
}
