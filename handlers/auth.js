import { login } from "../api/auth";

export function loginHandler() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      showToast("Login successful!", "success");
      window.location.href = "/dashboard.html";
    } catch (err) {
      showToast(`Login failed: ${err.message}`, "error");
    }
  });
}

export function signupHandler() {
  const signupForm = document.getElementById("signupForm");
  
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await signup(name, email, password);
      localStorage.setItem("token", response.token);
      showToast("Signup successful!", "success");
      window.location.href = "/dashboard.html";
    } catch (err) {
      showToast(`Signup failed: ${err.message}`, "error");
    }
  });
}
