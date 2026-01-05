import { publicApiFetch } from "./client.js";

export async function signup(name, email, password) {
  return await publicApiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
}

export async function login(email, password) {
  return await publicApiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return await publicApiFetch("/auth/logout", {
    method: "POST",
  });
}
