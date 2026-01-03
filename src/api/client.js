let activeController = null;

export async function apiFetch(url, options = {}) {
  // Cancel previous request
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await fetch(url, {
      ...options,
      signal: activeController.signal,
      headers: {
        "Content-Type": "application/json",
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
