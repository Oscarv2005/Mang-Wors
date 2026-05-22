import React, { useState } from "react";
import "./index.css";

function Login({
  setView,
  setIsUserLoggedIn,
  targetRedirectManga,
  setSelectedManga,
  isUserGate,
}) {
  // Gate Modes: 'login' or 'register'
  const [authMode, setAuthMode] = useState("login");

  // Form Input States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status Feedback States
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

  const handleSubmitAction = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // --- MODE 1: REGISTRATION PROTOCOL ---
    if (authMode === "register") {
      if (password !== confirmPassword) {
        setErrorMessage("PASSWORDS DO NOT MATCH. VERIFY ENTRIES.");
        return;
      }

      // Simulated local/database user registration success trace
      setSuccessMessage(
        "DECK ACCOUNT ENGRAVED SUCCESSFULLY! PROCESSING OVERLAY ACCESS...",
      );

      // Auto-login user upon successful profile creation
      setTimeout(() => {
        setIsUserLoggedIn(true);
        if (isUserGate && targetRedirectManga) {
          setSelectedManga(targetRedirectManga);
          setView("chapters");
        } else {
          setView("home");
        }
      }, 1200);
      return;
    }

    // --- MODE 2: LOGIN AUTHENTICATION GATEWAY ---
    if (isUserGate) {
      // USER LOGIN GATE: Instantly authorize open reading privileges
      setIsUserLoggedIn(true);
      if (targetRedirectManga) {
        setSelectedManga(targetRedirectManga);
        setView("chapters");
      } else {
        setView("home");
      }
    } else {
      // ADMIN LOGIN GATE: Query hardcoded cloud production authentication endpoint
      fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
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
        {/* Subtle decorative framing anchors */}
        <div className="login-gate-pin pin-tl" />
        <div className="login-gate-pin pin-br" />

        {/* Dynamic Mode Switch Headers */}
        <div className="login-header-gold">
          <span className="login-subtitle-gold">
            {isUserGate
              ? "閲覧制限 // ACCESS CONTROL"
              : "アクセス制限 // SECURE PORTAL"}
          </span>
          <h1 className="login-title-gold">
            {isUserGate
              ? authMode === "login"
                ? "READER ACCESS"
                : "ENGRAVE PROFILE"
              : "ADMIN IDENTITY"}
          </h1>
          <div className="login-rule-gold" />
        </div>

        {/* Sub-navigation selector tabs visible strictly for Users */}
        {isUserGate && (
          <div className="auth-mode-selector-tabs">
            <button
              className={`auth-tab-btn ${authMode === "login" ? "active-tab" : ""}`}
              onClick={() => handleModeSwitch("login")}
            >
              SIGN IN
            </button>
            <button
              className={`auth-tab-btn ${authMode === "register" ? "active-tab" : ""}`}
              onClick={() => handleModeSwitch("register")}
            >
              REGISTER
            </button>
          </div>
        )}

        {/* Status Messages Panels */}
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

        {/* Form Submission Pipeline */}
        <form onSubmit={handleSubmitAction} className="login-form-gold">
          <div className="login-input-group-gold">
            <label>
              {isUserGate
                ? "ACCOUNT IDENTITY / EMAIL"
                : "ADMINISTRATOR USERNAME"}
            </label>
            <input
              type={isUserGate ? "text" : "email"}
              placeholder={
                isUserGate
                  ? "ENTER YOUR DECK PROFILE ID"
                  : "ENTER SECURE KEY ID"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group-gold">
            <label>
              {isUserGate
                ? "SECURE ACCESS PASSWORD"
                : "ACCESS PHRASE / PASSWORD"}
            </label>
            <input
              type="password"
              placeholder="ENTER SECURE PHRASE PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password field visible strictly on Register mode */}
          {isUserGate && authMode === "register" && (
            <div className="login-input-group-gold field-fade-in-prestige">
              <label>CONFIRM SECURE PASSWORD</label>
              <input
                type="password"
                placeholder="RE-ENTER PASSWORD SECURE SECURITY PHRASE"
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
                  ? "UNLOCK SPECIMEN INDEX"
                  : "CREATE ACCREDITED LEDGER"
                : "REQUEST GATE CLEARANCE"}
            </span>
            <span className="btn-arrow-gold">⟶</span>
          </button>
        </form>

        <p className="login-footer-notice-gold">
          {isUserGate
            ? "Free member log endpoints are accessible. Standard credentials synchronize across network ledgers safely."
            : "Access keys are hardcoded to your permanent profile ledger vector configuration."}
        </p>
      </div>
    </section>
  );
}

export default Login;
