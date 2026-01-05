import { showToast } from "../ui/toast";

let activeController = null;

const BASE_URL = "https://farminput-capstone-project.onrender.com/api";

async function baseFetch(endpoint, options = {}, withAuth = false) {
  // Cancel previous request
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  const api = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Attach token only when required
  if (withAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(api, {
      ...options,
      signal: activeController.signal,
      headers,
      credentials: "include", // cookies support
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || response.statusText);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      showToast("Request cancelled", "info");
      return;
    }
    showToast(`API Error: ${err.message}`, "error");
    throw err;
  }
}

/* ================================
   PUBLIC (no auth)
================================ */
export function publicApiFetch(endpoint, options = {}) {
  return baseFetch(endpoint, options, false);
}

/* ================================
   PROTECTED (auth required)
================================ */
export function protectedApiFetch(endpoint, options = {}) {
  return baseFetch(endpoint, options, true);
}
