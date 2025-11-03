// src/api.js
export const BASE_URL = "http://127.0.0.1:8000";

export async function postJSON(path, payload) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include" // don't send cookies; change later if using cookies
  });
  const text = await res.text();
  // try parse JSON, otherwise return text
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}
