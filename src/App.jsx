import React, { useState, useEffect } from "react";
import "./index.css";
import Nav from "./Nav.jsx";
import Hero from "./Hero.jsx";
import Manga from "./Manga.jsx";
import Chapters from "./Chapters.jsx";
import Contact from "./Contact.jsx";
import Admin from "./Admin.jsx";
import Login from "./Login.jsx";

function App() {
  const [view, setView] = useState("home");
  const [selectedManga, setSelectedManga] = useState(null);

  // User Authentication Context Tracking (Initial state hydrater check)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return localStorage.getItem("isUserLoggedIn") === "true";
  });
  const [targetRedirectManga, setTargetRedirectManga] = useState(null);

  // SESSION PERSISTENCE EFFECT: Keeps track of admin/user routing persistence on refreshes
  useEffect(() => {
    const savedView = localStorage.getItem("currentView");
    const savedManga = localStorage.getItem("selectedManga");

    if (savedView) {
      setView(savedView);
    }
    if (savedManga) {
      setSelectedManga(JSON.parse(savedManga));
    }
  }, []);

  // Structural sync router wrapper that preserves view states locally
  const handleViewChange = (newView) => {
    setView(newView);
    localStorage.setItem("currentView", newView);
    
    // Clear out session memory cache pointers on a manual return home
    if (newView === "home") {
      localStorage.removeItem("selectedManga");
      setSelectedManga(null);
    }
  };

  // Checks authentication status when a card is selected
  const handleMangaSelection = (manga) => {
    setSelectedManga(manga);
    localStorage.setItem("selectedManga", JSON.stringify(manga));

    if (!isUserLoggedIn) {
      setTargetRedirectManga(manga);
      setView("user-login");
      localStorage.setItem("currentView", "user-login");
    } else {
      setView("chapters");
      localStorage.setItem("currentView", "chapters");
    }
  };

  // Combined Login handler state injector
  const handleUserLoginSuccess = (status) => {
    setIsUserLoggedIn(status);
    localStorage.setItem("isUserLoggedIn", status ? "true" : "false");
  };

  return (
    <div className="app-container">
      <Nav setView={handleViewChange} />

      {view === "home" && (
        <>
          <Hero />
          <Manga setView={handleViewChange} setSelectedManga={handleMangaSelection} />
          <Contact />
        </>
      )}

      {view === "chapters" && <Chapters selectedManga={selectedManga} />}

      {/* FIXED UNIFIED MOUNT BLOCK: Handles both user-login and navbar portal transitions */}
      {(view === "user-login" || view === "login") && (
        <Login
          setView={handleViewChange}
          setIsUserLoggedIn={handleUserLoginSuccess}
          targetRedirectManga={targetRedirectManga}
          setSelectedManga={setSelectedManga}
        />
      )}

      {view === "admin" && <Admin />}
    </div>
  );
}

export default App;
