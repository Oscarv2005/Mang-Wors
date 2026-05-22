import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import bgImage from "./ChatGPT Image May 21, 2026, 05_57_44 PM.png";

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const bgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current || !titleRef.current) return;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      // Smooth fullscreen background parallax sliding
      bgRef.current.style.transform = `translate3d(${x * -20}px, ${y * -15}px, 0) scale(1.05)`;

      // Floating interface layer movement
      titleRef.current.style.transform = `translate3d(${x * 15}px, ${y * 10}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={`leg-hero ${loaded ? "leg-loaded" : ""}`}>
      {/* FULL COVER BACKGROUND IMAGE LAYER */}
      <div className="leg-fullscreen-bg-wrapper">
        <div
          ref={bgRef}
          className="leg-fullscreen-artwork"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Layered luxury matrix overrides to protect text legibility */}
        <div className="leg-matte-overlay" />
        <div className="leg-dust-particles" />
        <div className="leg-nebula-glow" />
      </div>

      {/* FLOATING SACRED GEOMETRY (Overlay gold lens rings) */}
      <div className="leg-portal-wrapper" aria-hidden="true">
        <div className="leg-kinetic-portal">
          <div className="leg-ring ring-outer" />
          <div className="leg-ring ring-mid" />
          <div className="leg-ring ring-inner" />
        </div>
      </div>

      {/* ARCHIVAL BOUNDARY STRIPS */}
      <div className="leg-side-marker leg-left-axis" aria-hidden="true">
        <span className="leg-axis-title">MANGWORS PROTOCOL</span>
        <div className="leg-axis-line" />
        <span className="leg-axis-serial">
          COLLECTION_01 // PLATINUM_ARCHIVE
        </span>
      </div>

      <div className="leg-side-marker leg-right-axis" aria-hidden="true">
        <span>漫</span>
        <span>画</span>
        <span>の</span>
        <span>聖</span>
        <span>域</span>
      </div>

      {/* TYPOGRAPHY WRAPPER */}
      <div ref={titleRef} className="leg-ui-wrapper">
        <div className="leg-editorial-header">
          <span className="leg-header-jp">公式の最高峰コレクション</span>
          <span className="leg-header-dot" />
          <span className="leg-header-en">PREMIUM LOGISTICS SPECIFICATION</span>
        </div>

        <div className="leg-title-cluster">
          {/* Subtle stylized background kanji reading "Manga" */}
          <div className="leg-title-backdrop">漫画</div>
          {/* Logo Heading matching your exact brand name syntax */}
          <h1 className="leg-main-heading">
            MANG<span className="leg-gold-gradient-text">WORS</span>
          </h1>
        </div>

        <div className="leg-crest-separator">
          <div className="leg-crest-line" />
          <svg
            className="leg-crest-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
              fill="currentColor"
            />
          </svg>
          <div className="leg-crest-line" />
        </div>

        {/* Tailored platform master narrative summary */}
        <p className="leg-prose-body">
          Welcome to the ultimate digital sanctuary for sequential fine art.
          Explore an exquisitely curated archive of master-editions where
          legendary storytelling traditions fuse perfectly with deep obsidian
          aesthetics and golden-tier production values.
        </p>

        <div className="leg-cta-group">
          <button className="leg-btn-prestige">
            <span className="leg-btn-shimmer-line" />
            <span className="leg-btn-inner-text">BEGIN READING</span>
          </button>
          <button className="leg-btn-outline">EXPLORE LIBRARY</button>
        </div>
      </div>

      {/* METRIC RUNIC FOOTER */}
      <div className="leg-footer-metrics" aria-hidden="true">
        <span className="metric-cell">ARCHIVE COLLECTION 01</span>
        <span className="metric-divider">✧</span>
        <span className="metric-cell">TOKYO · EST. 2024</span>
        <span className="metric-divider">✧</span>
        <span className="metric-cell">ALL DIGITAL SPECIMENS ENCRYPTED</span>
      </div>
    </section>
  );
}

export default Hero;
