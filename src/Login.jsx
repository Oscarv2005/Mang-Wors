import React, { useState } from "react";
import "./index.css";
import { API_BASE_URL } from "./App.jsx";

function Login({ setView, setIsUserLoggedIn, targetRedirectManga, setSelectedManga }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsUserLoggedIn(true);
          localStorage.setItem("isUserLoggedIn", "true");
          if (data.role === "admin") {
            setView("admin");
          } else {
            setView(targetRedirectManga ? "chapters" : "home");
          }
        } else {
          setErrorMessage("Access Denied: Incorrect Identity Keys.");
        }
      })
      .catch(() => setErrorMessage("Server connection error."));
  };

  return (
    <section className="login-section-gold">
      <div className="login-bg-lines-prestige" aria-hidden="true" />
      <div className="login-container-gold">
        <div className="login-gate-pin pin-tl" />
        <div className="login-gate-pin pin-br" />
        <div className="login-header-gold">
          <span className="login-subtitle-gold">IDENTIFICATION GATE</span>
          <h1 className="login-title-gold">ARCHIVE ACCESS</h1>
          <div className="login-rule-gold" />
        </div>
        {errorMessage && (
          <div className="login-error-box-gold">
            <span className="error-icon-gold">✦</span>
            <p>{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleLogin} className="login-form-gold">
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
            AUTHENTICATE ⟶
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
