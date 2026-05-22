import React, { useState, useEffect } from "react";
import "./index.css";

function Admin() {
  const [mangaName, setMangaName] = useState("");
  const [mangaImage, setMangaImage] = useState("");
  const [mangaDesc, setMangaDesc] = useState("");
  const [mangas, setMangas] = useState([]);
  const [activeMangaId, setActiveMangaId] = useState(null);

  // New Chapter Entry State variables
  const [chapTitle, setChapTitle] = useState("");
  const [chapPages, setChapPages] = useState("");
  const [chapPdf, setChapPdf] = useState("");

  const fetchMangas = () => {
    fetch("http://localhost:5000/api/mangas")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
        if (data.length > 0 && !activeMangaId) {
          setActiveMangaId(data[0]._id);
        }
      })
      .catch((err) => console.error("Error syncing admin view matrix:", err));
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  const addManga = () => {
    if (!mangaName.trim()) return;
    const payload = {
      title: mangaName,
      image: mangaImage,
      description: mangaDesc,
    };

    fetch("http://localhost:5000/api/mangas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchMangas();
        if (data?._id) setActiveMangaId(data._id);
        setMangaName("");
        setMangaImage("");
        setMangaDesc("");
      });
  };

  const deleteManga = (mangaId, e) => {
    e.stopPropagation();
    if (!window.confirm("PURGE THIS MASTER ARCHIVE RECORD PERMANENTLY?"))
      return;
    fetch(`http://localhost:5000/api/mangas/${mangaId}`, {
      method: "DELETE",
    }).then(() => {
      if (activeMangaId === mangaId) setActiveMangaId(null);
      fetchMangas();
    });
  };

  const addChapter = (e) => {
    e.preventDefault();
    if (!chapTitle.trim() || !activeMangaId) return;

    const payload = {
      chapterTitle: chapTitle,
      pages: chapPages,
      pdfUrl: chapPdf,
    };

    fetch(`http://localhost:5000/api/mangas/${activeMangaId}/chapters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        fetchMangas();
        setChapTitle("");
        setChapPages("");
        setChapPdf("");
      });
  };

  const deleteChapter = (chapterId) => {
    fetch(
      `http://localhost:5000/api/mangas/${activeMangaId}/chapters/${chapterId}`,
      {
        method: "DELETE",
      },
    ).then(() => fetchMangas());
  };

  const selectedManga = mangas.find((m) => m._id === activeMangaId);

  return (
    <section className="admin-section">
      <div className="admin-wrapper">
        <div className="admin-header">
          <span className="admin-subtitle">
            管理者コンソール // STORAGE PROTOCOLS
          </span>
          <h1 className="admin-title">PRESTIGE ARCHIVE ENGINE</h1>
          <div className="admin-header-rule-gold" />
        </div>

        <div className="admin-workspace-grid">
          {/* LEFT PANEL: ARCHIVE GENERATOR */}
          <div className="admin-workspace-left">
            <div className="admin-panel-box-gold">
              <div className="panel-box-header">
                <span className="box-dot" />
                <h3>ENGRAVE MASTER SERIES</h3>
              </div>
              <div className="panel-box-form">
                <div className="form-field-gold">
                  <label>MANGA TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g., VAGABOND REFLECTION"
                    value={mangaName}
                    onChange={(e) => setMangaName(e.target.value)}
                  />
                </div>
                <div className="form-field-gold">
                  <label>IMAGE HERO URL</label>
                  <input
                    type="text"
                    placeholder="https://domain.com/art.jpg"
                    value={mangaImage}
                    onChange={(e) => setMangaImage(e.target.value)}
                  />
                </div>
                <div className="form-field-gold">
                  <label>VOLUME DESCRIPTION SUMMARY</label>
                  <textarea
                    placeholder="Enter brief synopsis metadata details..."
                    value={mangaDesc}
                    onChange={(e) => setMangaDesc(e.target.value)}
                    rows={2}
                  />
                </div>
                <button className="panel-submit-btn" onClick={addManga}>
                  COMMIT SERIES TARGET
                </button>
              </div>
            </div>

            <div className="admin-selector-ledger">
              <div className="ledger-header-small">
                MANIFEST INDEX CATALOGUE
              </div>
              <div className="selector-list-wrapper">
                {mangas.map((m, idx) => (
                  <div
                    key={m._id}
                    className={`selector-row-item ${m._id === activeMangaId ? "is-active" : ""}`}
                    onClick={() => setActiveMangaId(m._id)}
                  >
                    <div className="selector-row-left">
                      <span className="row-index">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="row-title">{m.title}</span>
                    </div>
                    <button
                      className="row-purge-btn"
                      onClick={(e) => deleteManga(m._id, e)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: DYNAMIC CHAPTER CARDS WISE INJECTION MANAGER */}
          <div className="admin-workspace-right">
            {selectedManga ? (
              <div className="admin-media-manager">
                <div className="admin-panel-box-gold high-contrast-box">
                  <div className="panel-box-header">
                    <div className="header-meta">
                      <span className="meta-lbl">SERIES INDEX COMPILING:</span>
                      <h2>{selectedManga.title}</h2>
                    </div>
                  </div>

                  {/* Complete Form Container Block */}
                  <form
                    onSubmit={addChapter}
                    className="panel-box-form card-wise-form"
                  >
                    <div className="form-field-gold">
                      <label>CHAPTER TITLE NAME</label>
                      <input
                        type="text"
                        placeholder="e.g., ACT 01: THE INK WASH JOURNEY"
                        value={chapTitle}
                        onChange={(e) => setChapTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-field-gold">
                      <label>
                        MANGA PAGE IMAGE LINK COLLECTION (COMMA SEPARATED
                        SELECTION)
                      </label>
                      <textarea
                        placeholder="https://link1.png, https://link2.png, https://link3.png"
                        value={chapPages}
                        onChange={(e) => setChapPages(e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="form-field-gold">
                      <label>
                        DIRECT OVERRIDE PDF STORAGE FILE LINK (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="https://domain.com/vault/document.pdf"
                        value={chapPdf}
                        onChange={(e) => setChapPdf(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="panel-submit-btn gold-flash-btn"
                    >
                      INJECT SYSTEM CHAPTER CARD
                    </button>
                  </form>
                </div>

                {/* Rendered Chapter Grid List View */}
                <div className="admin-chapter-cards-grid">
                  {selectedManga.chapters &&
                  selectedManga.chapters.length > 0 ? (
                    selectedManga.chapters.map((chap, index) => (
                      <div
                        className="admin-chapter-display-card"
                        key={chap._id || index}
                      >
                        <div className="admin-chapter-card-top">
                          <span className="chapter-card-num">
                            ACT {(index + 1).toString().padStart(2, "0")}
                          </span>
                          <button
                            className="chapter-card-purge-trigger"
                            onClick={() => deleteChapter(chap._id)}
                          >
                            PURGE
                          </button>
                        </div>
                        <h4>{chap.chapterTitle}</h4>
                        <div className="chapter-card-metrics">
                          <span>
                            📊 {chap.pages?.length || 0} PANELS DETECTED
                          </span>
                          {chap.pdfUrl && (
                            <span className="pdf-attached-badge">
                              📑 PDF SOURCE ACTIVE
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ledger-empty-notice">
                      NO CHRONICLES LINKED VIA CARD ENGINE ARCHIVES
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="admin-no-selection-placeholder">
                <p>
                  SELECT A SERIES OBJECT MANIFEST MATRIX RECORD LINK ON THE LEFT
                  PLATFORM EDGE TO ACCESS CARD SYSTEM UTILITIES.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
