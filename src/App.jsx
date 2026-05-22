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

  // Authorization Flags
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [targetRedirectManga, setTargetRedirectManga] = useState(null);

  // Gated function managing card clicks
  const handleMangaSelection = (manga) => {
    setSelectedManga(manga);

    if (!isUserLoggedIn) {
      // User is unauthenticated -> save target selection object and swap views to user-login
      setTargetRedirectManga(manga);
      setView("user-login");
    } else {
      // User is logged in -> route directly to chapters page
      setView("chapters");
    }
  };

  return (
    <div className="app-container">
      <Nav setView={setView} />

      {view === "home" && (
        <>
          <Hero />
          {/* Passed the handler interceptor correctly into props here */}
          <Manga setView={setView} setSelectedManga={handleMangaSelection} />
          <Contact />
        </>
      )}

      {view === "chapters" && <Chapters selectedManga={selectedManga} />}

      {/* User Login View state logic block */}
      {view === "user-login" && (
        <Login
          setView={setView}
          setIsUserLoggedIn={setIsUserLoggedIn}
          targetRedirectManga={targetRedirectManga}
          setSelectedManga={setSelectedManga}
          isUserGate={true}
        />
      )}

      {/* Admin Panel Gateway view state block */}
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
