import React, { useState } from "react";
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

  // User Authentication Context Tracking
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [targetRedirectManga, setTargetRedirectManga] = useState(null);

  // Checks authentication status when a card is selected
  const handleMangaSelection = (manga) => {
    setSelectedManga(manga);

    if (!isUserLoggedIn) {
      // User is unauthenticated: hold onto selection and show login/register tabs
      setTargetRedirectManga(manga);
      setView("user-login");
    } else {
      // User is validated: proceed to read
      setView("chapters");
    }
  };

  return (
    <div className="app-container">
      <Nav setView={setView} />

      {view === "home" && (
        <>
          <Hero />
          {/* Hooked up structural selection interception parameter */}
          <Manga setView={setView} setSelectedManga={handleMangaSelection} />
          <Contact />
        </>
      )}

      {view === "chapters" && <Chapters selectedManga={selectedManga} />}

      {/* View Case 1: Member Deck Entrance (Sign In + Registration Matrix) */}
      {view === "user-login" && (
        <Login
          setView={setView}
          setIsUserLoggedIn={setIsUserLoggedIn}
          targetRedirectManga={targetRedirectManga}
          setSelectedManga={setSelectedManga}
          isUserGate={true}
        />
      )}

      {/* View Case 2: Secure Core Platform Administrative Key Authentication Gate */}
      {view === "login" && (
        <Login
          setView={setView}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isUserGate={false}
        />
      )}

      {view === "admin" && <Admin />}
    </div>
  );
}

export default App;
