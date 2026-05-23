import React, { useState } from "react";
import "./index.css";

function Login({
  setView,
  setIsUserLoggedIn,
  targetRedirectManga,
  setSelectedManga,
}) {
  // Identity Segment Track: 'reader' or 'admin'
  const [identityRole, setIdentityRole] = useState("reader");
  // Sub-Authentication Phase for Readers: 'login' or 'register'
  const [readerMode, setReaderMode] = useState("login");

  // Form Input Coordinates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // System State Messaging Pointers
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Clean transition switcher between modes
  const handleRoleToggle = (role) => {
    setIdentityRole(role);
    setReaderMode("login"); // Reset back to default sub-login screen on tab change
    setErrorMessage("");
    setSuccessMessage("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleAuthPipelineSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // --- PIPELINE 1: SECURE ADMINISTRATIVE IDENTITY CLEARANCE ---
    if (identityRole === "admin") {
      fetch("https://mang-wors-back.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("CORE INTEGRITY VERIFICATION FAILED");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSuccessMessage("ADMINISTRATIVE VERIFICATION PASSED. BOOTING CONSOLE...");
            setTimeout(() => {
              setView("admin");
            }, 1000);
          } else {
            setErrorMessage(data.message || "INVALID ADMINISTRATIVE SECURITY KEYS");
          }
        })
        .catch((err) => {
          console.error("Authentication link down:", err);
          setErrorMessage("SERVER CONNECTION REFUSED. VERIFY LIVE BACKEND ENGINE STATUS.");
        });
      return;
    }

    // --- PIPELINE 2: READER ACCOUNT NEW REGISTRATION ---
    if (readerMode === "register") {
      if (password !== confirmPassword) {
        setErrorMessage("PASSWORDS DO NOT MATCH. VERIFY SECURE STRINGS.");
        return;
      }

      setSuccessMessage("NEW READER LOG ENGRAVED! ACCESS GRANTED...");
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

    // --- PIPELINE 3: EXISTING READER DIRECT SIGN IN ---
    setSuccessMessage("WELCOME BACK, READER. RETRIEVING INTERACTIVE PORTFOLIO...");
    setTimeout(() => {
      setIsUserLoggedIn(true);
      if (targetRedirectManga) {
        setSelectedManga(targetRedirectManga);
        setView("chapters");
      } else {
        setView("home");
      }
    }, 1000);
  };

  return (
    <section className="login-section-gold">
      <div className="login-bg-lines-prestige" aria-hidden="true" />

      <div className="login-container-gold">
        {/* Prestige Gilded Boundary Corner Clips */}
        <div className="login-gate-pin pin-tl" />
        <div className="login-gate-pin pin-br" />

        {/* TOP COMPONENT: Identity Segment Toggle Matrix */}
        <div className="identity-segment-bar-prestige">
          <button
            type="button"
            className={`identity-segment-btn ${identityRole === "reader" ? "active-segment" : ""}`}
            onClick={() => handleRoleToggle("reader")}
          >
            READER PORTAL
          </button>
          <button
            type="button"
            className={`identity-segment-btn ${identityRole === "admin" ? "active-segment" : ""}`}
            onClick={() => handleRoleToggle("admin")}
          >
            ADMIN GATE
          </button>
        </div>

        {/* HEADER SECTION */}
        <div className="login-header-gold">
          <span className="login-subtitle-gold">
            {identityRole === "admin" ? "管理者コンソール // SECURE PORTAL" : "会員システム // MEMBERS INTERFACE"}
          </span>
          <h1 className="login-title-gold">
            {identityRole === "admin"
              ? "ADMIN IDENTITY"
              : readerMode === "login"
              ? "RETURNING READER"
              : "ENGRAVE LEDGER PROFILE"}
          </h1>
          <div className="login-rule-gold" />
        </div>

        {/* FEEDBACK & STATUS MESSAGE CARDS */}
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

        {/* CORE SECURE ENTRY FORM FORMATION */}
        <form onSubmit={handleAuthPipelineSubmit} className="login-form-gold">
          <div className="login-input-group-gold">
            <label>
              {identityRole === "admin" ? "ADMINISTRATOR ACCOUNT USERNAME" : "READER IDENTITY ID / EMAIL"}
            </label>
            <input
              type={identityRole === "admin" ? "email" : "text"}
              placeholder={identityRole === "admin" ? "e.g., admin@manga.com" : "ENTER CARD DECK KEY OR EMAIL"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group-gold">
            <label>SECURITY PHRASE / PASSWORD</label>
            <input
              type="password"
              placeholder="ENTER COMPLEX ACCOUNT PHRASE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* DYNAMIC FIELD: Slides open instantly when readerMode state shifts to register */}
          {identityRole === "reader" && readerMode === "register" && (
            <div className="login-input-group-gold field-fade-in-prestige">
              <label>CONFIRM SECURE PASSWORD</label>
              <input
                type="password"
                placeholder="RE-ENTER SECURITY PHRASE"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="login-submit-btn-gold">
            <span>
              {identityRole === "admin"
                ? "REQUEST CONSOLE ENTRY"
                : readerMode === "login"
                ? "UNLOCK SPECIMEN INDEX"
                : "COMMIT ACCOUNT TO LEDGER"}
            </span>
            <span className="btn-arrow-gold">⟶</span>
          </button>
        </form>

        {/* FOOTER DIALOG: Swaps mode state variables instantly onClick */}
        <div className="login-footer-notice-gold">
          {identityRole === "admin" ? (
            <p className="admin-lock-text-warning">
              Security Notice: Unauthorized access attempts trigger encrypted database lockdown protocols automatically.
            </p>
          ) : readerMode === "login" ? (
            <p className="auth-helper-subtext">
              First time unsealing specimens?{" "}
              <span className="inline-gold-link" onClick={() => setReaderMode("register")}>
                REGISTER NEW ARCHIVE CARD
              </span>
            </p>
          ) : (
            <p className="auth-helper-subtext">
              Already possess an active reading license?{" "}
              <span className="inline-gold-link" onClick={() => setReaderMode("login")}>
                DIRECT SIGN IN
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
