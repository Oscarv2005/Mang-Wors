import React, { useState, useEffect } from "react";
import "./index.css";
import Nav from "./Nav.jsx";
import Hero from "./Hero.jsx";
import Manga from "./Manga.jsx";
import Chapters from "./Chapters.jsx";
import Contact from "./Contact.jsx";
import Admin from "./Admin.jsx";
import Login from "./Login.jsx";

export const API_BASE_URL = "https://mang-wors-back.vercel.app";

function App() {
  const [view, setView] = useState("home");
  const [selectedManga, setSelectedManga] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return localStorage.getItem("isUserLoggedIn") === "true";
  });
  const [targetRedirectManga, setTargetRedirectManga] = useState(null);

  useEffect(() => {
    const savedView = localStorage.getItem("currentView");
    const savedManga = localStorage.getItem("selectedManga");
    if (savedView) setView(savedView);
    if (savedManga) setSelectedManga(JSON.parse(savedManga));
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
    localStorage.setItem("currentView", newView);
    if (newView === "home") {
      localStorage.removeItem("selectedManga");
      setSelectedManga(null);
    }
  };

  const handleMangaSelection = (manga) => {
    setSelectedManga(manga);
    localStorage.setItem("selectedManga", JSON.stringify(manga));
    if (!isUserLoggedIn) {
      setTargetRedirectManga(manga);
      setView("user-login");
    } else {
      setView("chapters");
    }
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
      {(view === "user-login" || view === "login") && (
        <Login
          setView={handleViewChange}
          setIsUserLoggedIn={setIsUserLoggedIn}
          targetRedirectManga={targetRedirectManga}
          setSelectedManga={setSelectedManga}
        />
      )}
      {view === "admin" && <Admin />}
    </div>
  );
}

export default App;
