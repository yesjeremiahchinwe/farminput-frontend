let activeController = null;

const BASE_URL = "https://farminput-capstone-project.onrender.com/api/auth/signup";


export async function apiFetch(endpoint, options = {}) {
  // Cancel previous request
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  const api = `${BASE_URL}/${endpoint}`;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(api, {
      ...options,
      signal: activeController.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
      },
      credentials: "include", // cookies support
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || "Request failed");
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request aborted");
      return;
    }
    throw err;
  }
}
