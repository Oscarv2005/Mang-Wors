import React, { useState } from "react";
import "./index.css";

function Chapters({ selectedManga }) {
  const [activeReadingChapter, setActiveReadingChapter] = useState(null);

  const title = selectedManga?.title || "UNSEALED SPECIMEN";
  const image =
    selectedManga?.image || "https://wallpapercave.com/wp/wp8848787.jpg";
  const description =
    selectedManga?.description ||
    "No archival chronicle summary provided for this volume.";
  const activeChapters = selectedManga?.chapters || [];

  return (
    <section className="chapters-section">
      <div className="chapters-section-ambient" aria-hidden="true" />

      <div className="chapters-container">
        {/* Gallery Title Banner */}
        <div className="manga-banner-gold">
          <div className="banner-image-viewport">
            <div className="banner-gold-tick tick-tl" />
            <div className="banner-gold-tick tick-br" />
            <img src={image} alt={title} />
          </div>

          <div className="banner-content-gold">
            <div className="banner-meta-row">
              <span className="meta-badge-gold">特選集</span>
              <span className="meta-badge-en">ARCHIVAL SPECIMEN</span>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {/* Dynamic Chapter Cards Wise Display Index */}
        <div className="chapters-list-gold">
          <div className="list-header-gold">
            <h2>AVAILABLE CHRONICLES</h2>
            <span className="list-header-jp">目次</span>
          </div>

          <div className="chapters-list-wrapper">
            {activeChapters.length > 0 ? (
              activeChapters.map((chapter, index) => (
                <div className="chapter-card-gold" key={chapter._id || index}>
                  <div className="chapter-info-block">
                    <span className="chapter-index-num">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="chapter-title-string">
                      {chapter.chapterTitle}
                    </span>
                  </div>

                  <button
                    className="chapter-read-btn-gold"
                    onClick={() => setActiveReadingChapter(chapter)}
                  >
                    <span className="read-btn-inner-text">LAUNCH INK</span>
                    <span className="read-btn-arrow">⟶</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="ledger-empty-notice" style={{ margin: 0 }}>
                NO VERIFIED CHAPTER ENTIRES ENGRAVED IN THIS MASTER RECORD
                STORAGE MATRIX YET.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DYNAMIC IMMERSIVE PRESTIGE READING THEATRE OVERLAY SYSTEM */}
      {activeReadingChapter && (
        <div className="prestige-reader-overlay">
          <div className="reader-header-navigation-bar">
            <div className="reader-title-context">
              <span className="reader-manga-lbl">{title}</span>
              <span className="reader-separator">／</span>
              <span className="reader-chapter-lbl">
                {activeReadingChapter.chapterTitle}
              </span>
            </div>
            <button
              className="close-reader-btn-gold"
              onClick={() => setActiveReadingChapter(null)}
            >
              CLOSE TRANSITION ✕
            </button>
          </div>

          <div className="reader-canvas-body">
            {/* CONDITION 1: CHRONICLE LOADED WITH DIRECT LINK PDF SYSTEM PORTAL OVERRIDE */}
            {activeReadingChapter.pdfUrl ? (
              <div className="reader-pdf-container">
                {(() => {
                  let embedUrl = activeReadingChapter.pdfUrl;
                  // Dynamic sanitization link conversion for Google Drive sources
                  if (
                    embedUrl.includes("drive.google.com") &&
                    embedUrl.includes("/view")
                  ) {
                    embedUrl = embedUrl
                      .replace("/view", "/preview")
                      .split("?")[0];
                  }
                  return (
                    <iframe
                      src={`${embedUrl}#toolbar=0&navpanes=0`}
                      title={activeReadingChapter.chapterTitle}
                      className="prestige-pdf-iframe"
                      frameBorder="0"
                      allow="autoplay"
                    />
                  );
                })()}
              </div>
            ) : activeReadingChapter.pages &&
              activeReadingChapter.pages.length > 0 ? (
              /* CONDITION 2: CHRONICLE IMAGES PAGE MATRIX RENDER SCREEN LAYER */
              <div className="reader-vertical-comic-stack">
                {activeReadingChapter.pages.map((imgUrl, pageIdx) => (
                  <img
                    key={pageIdx}
                    src={imgUrl}
                    alt={`Page ${(pageIdx + 1).toString()}`}
                    className="manga-render-page-layer"
                    loading="lazy"
                  />
                ))}
              </div>
            ) : (
              /* CONDITION 3: FALLBACK INTERFACE FEEDBACK EXCEPTION PROTOCOL */
              <div className="reader-empty-manifest-state">
                <span className="warning-diamond">✦</span>
                <p>MEDIA RESOURCE MANIFEST UNREADABLE OR HOLLOW.</p>
                <small>
                  Inject Page Asset URL list pointers or an explicit PDF
                  Document root via management channels.
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Chapters;
