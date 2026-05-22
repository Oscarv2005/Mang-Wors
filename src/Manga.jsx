import React, { useState, useEffect } from "react";
import "./index.css";

function Manga({ setView, setSelectedManga }) {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mang-wors-back.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching manga grid data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="manga-section">
      <div className="manga-section-ambient" aria-hidden="true" />

      <div className="manga-section-header">
        <span className="manga-section-subtitle">特選金装版 ARCHIVES</span>
        <h1 className="manga-title">MASTER COMPENDIUM</h1>
        <div className="manga-header-line-gold" />
      </div>

      {loading ? (
        <div className="manga-loading-box-prestige">
          <span className="manga-spinner-diamond" />
          <p>RETRIEVING GILDED ARCHIVE MANIFEST...</p>
        </div>
      ) : mangas.length === 0 ? (
        <div className="manga-empty-box-prestige">
          <p>NO MASTER EDITIONS FOUND IN VAULT STORAGE.</p>
        </div>
      ) : (
        <div className="manga-container">
          {mangas.map((manga, index) => (
            <div className="manga-card" key={manga._id}>
              {/* Luxury Gilded Framework Accents */}
              <div className="manga-card-gold-corner top-left" />
              <div className="manga-card-gold-corner bottom-right" />

              <div className="manga-card-serial-badge">
                VOL_{(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="manga-image-wrapper">
                <img src={manga.image} alt={manga.title} loading="lazy" />
                <div className="manga-card-matte-overlay" />
              </div>

              <div className="manga-content">
                <div className="manga-card-meta">
                  <span className="manga-tag-gold-jp">至高</span>
                  <span className="manga-card-dot-separator" />
                  <span className="manga-tag-prestige-en">DE LUXE PRESS</span>
                </div>

                <h2>{manga.title}</h2>

                <button
                  className="manga-read-btn-gold"
                  onClick={() => setSelectedManga(manga)}
                >
                  <span className="btn-label-prestige">UNSEAL SPECIMEN</span>
                  <span className="btn-arrow-gold">⟶</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Manga;
