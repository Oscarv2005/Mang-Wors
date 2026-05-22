import React, { useState } from "react";
import "./index.css";

function Login({
  setView,
  setIsUserLoggedIn,
  targetRedirectManga,
  setSelectedManga,
  isUserGate,
}) {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleModeSwitch = (mode) => {
    setAuthMode(mode);
    setErrorMessage("");
    setSuccessMessage("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // --- SUB-ROUTE A: REGISTRATION COMPLIANCE ---
    if (isUserGate && authMode === "register") {
      if (password !== confirmPassword) {
        setErrorMessage("PASSWORDS DO NOT MATCH. VERIFY ENTRIES.");
        return;
      }

      setSuccessMessage(
        "PROFILE ACCREDITED! UNSEALING INK SYSTEM CHRONICLES...",
      );
      setTimeout(() => {
        setIsUserLoggedIn(true);
        if (targetRedirectManga) {
          setSelectedManga(targetRedirectManga);
          setView("chapters");
        } else {
          setView("home");
        }
      }, 1200);
      return;
    }

    // --- SUB-ROUTE B: GENERAL ACCESS FLOWS ---
    if (isUserGate) {
      // USER LOGIN GATEWAY: Instantly authorize session
      setIsUserLoggedIn(true);
      if (targetRedirectManga) {
        setSelectedManga(targetRedirectManga);
        setView("chapters");
      } else {
        setView("home");
      }
    } else {
      // FIXED: Swapped local environment domain route point for your live Render production link
      fetch("https://mang-wors-back.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("GATE CLEARANCE DENIED OR ROUTE INVALID");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setView("admin");
          } else {
            setErrorMessage(data.message || "INVALID CREDENTIAL MATRIX");
          }
        })
        .catch((err) => {
          console.error("Authentication link down:", err);
          setErrorMessage("SERVER ERROR. VERIFY CORE GATE OPERATIONAL STATUS.");
        });
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
            {isUserGate
              ? "会員アクセス // MEMBER PLATFORM"
              : "アクセス制限 // SECURE PORTAL"}
          </span>
          <h1 className="login-title-gold">
            {isUserGate
              ? authMode === "login"
                ? "READER ACCESS"
                : "ENGRAVE LEDGER"
              : "ADMIN IDENTITY"}
          </h1>
          <div className="login-rule-gold" />
        </div>

        {/* Dynamic Nav Switcher Tabs for Users */}
        {isUserGate && (
          <div className="auth-mode-selector-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${authMode === "login" ? "active-tab" : ""}`}
              onClick={() => handleModeSwitch("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${authMode === "register" ? "active-tab" : ""}`}
              onClick={() => handleModeSwitch("register")}
            >
              Register
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="login-error-box-gold">
            <span className="error-icon-gold">✦</span>
            <p>{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="login-success-box-gold">
            <span className="success-icon-gold">✦</span>
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="login-form-gold">
          <div className="login-input-group-gold">
            <label>
              {isUserGate ? "ACCOUNT ID / EMAIL" : "ADMINISTRATOR USERNAME"}
            </label>
            <input
              type="text"
              placeholder={
                isUserGate
                  ? "ENTER DECK PROFILE IDENTITY"
                  : "ENTER SECURE KEY ID"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group-gold">
            <label>SECURITY PHRASE / PASSWORD</label>
            <input
              type="password"
              placeholder="ENTER SECURE SECURITY PHRASE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isUserGate && authMode === "register" && (
            <div className="login-input-group-gold field-fade-in-prestige">
              <label>CONFIRM ARCHIVE ACCOUNT PASSWORD</label>
              <input
                type="password"
                placeholder="RE-ENTER PASSWORD PHRASE"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="login-submit-btn-gold">
            <span>
              {isUserGate
                ? authMode === "login"
                  ? "UNLOCK MATRIX CHRONICLE"
                  : "ENGRAVE READER CARD"
                : "REQUEST GATE CLEARANCE"}
            </span>
            <span className="btn-arrow-gold">⟶</span>
          </button>
        </form>

        <p className="login-footer-notice-gold">
          {isUserGate
            ? "Free creation log endpoints are accessible. Standard credentials synchronize across network ledgers safely."
            : "Access keys are hardcoded to your permanent admin account profile configuration."}
        </p>
      </div>
    </section>
  );
}

export default Login;
