import React, { useState } from "react";
import "./index.css";
import { API_BASE_URL } from "./App.jsx";

function Login({ setView, setIsUserLoggedIn, targetRedirectManga }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/api/register" : "/api/login";

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        if (isRegistering) {
          // After register, switch to login tab automatically
          setIsRegistering(false);
          setMessage("Registration successful! Now login.");
        } else {
          // ── Admin login ──────────────────────────────────────────────────────
          if (data.role === "admin") {
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem("isUserLoggedIn", "true");
            setIsUserLoggedIn(true);
            setView(targetRedirectManga ? "chapters" : "admin");
            return;
          }
          // ── Regular user login ───────────────────────────────────────────────
          setIsUserLoggedIn(true);
          localStorage.setItem("isUserLoggedIn", "true");
          // If user was trying to read a manga, send them to chapters; else home
          setView(targetRedirectManga ? "chapters" : "home");
        }
      } else {
        setMessage(data.message || "Operation failed.");
      }
    } catch {
      setMessage("Server connection error.");
    }
  };

  return (
    <section className="login-section-gold">
      <div className="login-bg-lines-prestige" aria-hidden="true" />
      <div className="login-container-gold">
        <div className="login-gate-pin pin-tl" />
        <div className="login-gate-pin pin-br" />

        <div className="login-header-gold">
          <span className="login-subtitle-gold">
            {isRegistering ? "CREATE IDENTITY" : "IDENTIFICATION GATE"}
          </span>
          <h1 className="login-title-gold">
            {isRegistering ? "REGISTER ACCESS" : "ARCHIVE ACCESS"}
          </h1>
          <div className="login-rule-gold" />
        </div>

        <div className="auth-mode-selector-tabs">
          <button
            className={`auth-tab-btn ${!isRegistering ? "active-tab" : ""}`}
            onClick={() => { setIsRegistering(false); setMessage(""); }}
          >
            LOGIN
          </button>
          <button
            className={`auth-tab-btn ${isRegistering ? "active-tab" : ""}`}
            onClick={() => { setIsRegistering(true); setMessage(""); }}
          >
            REGISTER
          </button>
        </div>

        {message && (
          <div className="login-error-box-gold">
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form-gold">
          <div className="login-input-group-gold">
            <label>IDENTITY ID / EMAIL</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group-gold">
            <label>SECURITY PHRASE</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-btn-gold">
            {isRegistering ? "INITIATE REGISTRATION" : "AUTHENTICATE"} ⟶
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
