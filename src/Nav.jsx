import React, { useState, useEffect } from "react";
import "./index.css";

function Nav({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // FIXED: Smooth reset action to bring users back up to the top of Hero section safely
  const handleHomeShortcut = () => {
    setIsOpen(false);

    // If user is already on the home track view, scroll them up smoothly
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setView("home");
  };

  // Automated premium smooth shortcut scroll routine for Library grid placement
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

  // Automated premium smooth shortcut scroll routine for Contact segment placement
  const handleContactShortcut = () => {
    setView("home");
    setIsOpen(false);

    setTimeout(() => {
      const contactSectionElement = document.querySelector(
        ".contact-section-prestige",
      );
      if (contactSectionElement) {
        contactSectionElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 60);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Brand Logo - Fixed to use the clean scroll anchor reset routine too */}
      <div className="logo" onClick={handleHomeShortcut}>
        MANG<span>WORS</span>
      </div>

      {/* Premium Minimal Toggle for Mobile */}
      <button
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Gilded Navigation Items */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {/* FIXED: Swapped static parameter pointer for the dynamic anchor scroll router reset */}
        <li onClick={handleHomeShortcut} data-text="HOME">
          Home
        </li>
        <li onClick={handleLibraryShortcut} data-text="LIBRARY">
          Library
        </li>
        <li onClick={handleContactShortcut} data-text="CONTACT">
          Contact
        </li>
        <li className="mobile-only-btn">
          <button
            className="nav-login-btn"
            onClick={() => handleNavigation("login")}
          >
            <span className="nav-btn-inner">PREMIUM PORTAL</span>
          </button>
        </li>
      </ul>

      {/* Desktop Gilded Button */}
      <button
        className="nav-login-btn desktop-only"
        onClick={() => handleNavigation("login")}
      >
        <span className="nav-btn-inner">PREMIUM PORTAL</span>
      </button>
    </nav>
  );
}

export default Nav;
