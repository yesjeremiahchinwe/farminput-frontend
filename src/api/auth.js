import { apiFetch } from "./client.js";

export async function signup(username, email, password) {
  return await apiFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function login(email, password) {
  return await apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return await apiFetch("/api/logout", {
    method: "POST",
  });
}
