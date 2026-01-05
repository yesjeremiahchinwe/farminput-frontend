import { apiFetch } from "./client.js";

export async function signup(username, email, password) {
  return await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password })
  });
}

export async function login(email, password) {
  return await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return await apiFetch("/auth/logout", {
    method: "POST",
  });
}
