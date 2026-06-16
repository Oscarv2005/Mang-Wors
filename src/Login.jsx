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
          setIsRegistering(false);
          setMessage("Registration successful! Now login.");
        } else {
          setIsUserLoggedIn(true);
          localStorage.setItem("isUserLoggedIn", "true");
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
      <div className="login-container-gold">
        <h1>{isRegistering ? "REGISTER FIRST" : "LOGIN"}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{isRegistering ? "REGISTER" : "LOGIN"}</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
        </button>
      </div>
    </section>
  );
}

export default Login;
