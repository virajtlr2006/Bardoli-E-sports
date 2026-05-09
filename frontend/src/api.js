const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function readErrorMessage(res) {
  const text = await res.text();
  if (!text) return "Request failed";
  try {
    const data = JSON.parse(text);
    return data?.message || "Request failed";
  } catch {
    return text;
  }
}

function normalizeOptions(options) {
  if (typeof options === "string") return { email: options };
  return options || {};
}

export async function apiGet(path, options = {}) {
  const { email = "", token = "" } = normalizeOptions(options);
  const query = email ? `?email=${encodeURIComponent(email)}` : "";
  const res = await fetch(`${API_URL}${path}${query}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return res.json();
}

export async function apiPost(path, payload, options = {}) {
  const { email = "", token = "" } = normalizeOptions(options);
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(email ? { "x-user-email": email } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return res.json();
}
