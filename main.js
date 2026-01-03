import { login } from "./src/api/auth.js";
import { showToast } from "./src/ui/toast.js";

document.addEventListener("DOMContentLoaded", () => {

  /* ----- Auth - Login Form Handling ------- */
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await login(email, password);
      showToast("Login successful!", "success");
      // Redirect or update UI accordingly
    } catch (err) {
      showToast(`Login failed: ${err.message}`, "error");
    }
  });
});
