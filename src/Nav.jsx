import React, { useState, useEffect } from "react";
import "./index.css";

function Nav({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = localStorage.getItem("isUserLoggedIn") === "true" || 
                     localStorage.getItem("isAdminLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (targetView) => {
    setView(targetView);
    setIsOpen(false);
  };

  const handleHomeShortcut = () => {
    setIsOpen(false);
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setView("home");
  };

  const handleLibraryShortcut = () => {
    setView("home");
    setIsOpen(false);
    setTimeout(() => {
      const mangaGridElement = document.querySelector(".manga-section");
      if (mangaGridElement) {
        mangaGridElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleContactShortcut = () => {
    setView("home");
    setIsOpen(false);
    setTimeout(() => {
      const contactSectionElement = document.querySelector(".contact-section-prestige");
      if (contactSectionElement) {
        contactSectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleLogoutAction = () => {
    localStorage.clear();
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={handleHomeShortcut}>
        MANG<span>WORS</span>
      </div>

      <button
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li onClick={handleHomeShortcut} data-text="HOME">
          Home
        </li>
        <li onClick={handleLibraryShortcut} data-text="LIBRARY">
          Library
        </li>
        <li onClick={handleContactShortcut} data-text="CONTACT">
          Contact
        </li>
        {isAdmin && (
          <li onClick={() => handleNavigation("admin")} data-text="ADMIN">
            Admin Panel
          </li>
        )}
        
        <li className="mobile-only-btn">
          {isLoggedIn ? (
            <button className="nav-login-btn nav-logout-btn-gold" onClick={handleLogoutAction}>
              <span className="nav-btn-inner">LOGOUT</span>
            </button>
          ) : (
            <button className="nav-login-btn" onClick={() => handleNavigation("login")}>
              <span className="nav-btn-inner">LOGIN</span>
            </button>
          )}
        </li>
      </ul>

      {isLoggedIn ? (
        <button className="nav-login-btn desktop-only nav-logout-btn-gold" onClick={handleLogoutAction}>
          <span className="nav-btn-inner">LOGOUT</span>
        </button>
      ) : (
        <button className="nav-login-btn desktop-only" onClick={() => handleNavigation("login")}>
          <span className="nav-btn-inner">LOGIN</span>
        </button>
      )}
    </nav>
  );
}

export default Nav;
