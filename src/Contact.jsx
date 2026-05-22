import React, { useEffect, useState, useRef } from "react";
import "./index.css";

function Contact() {
  const [loaded, setLoaded] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!formRef.current) return;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      // Floating card response remains intact for smooth interactivity
      formRef.current.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className={`contact-section-prestige ${loaded ? "contact-loaded" : ""}`}
    >
      {/* SOLID TEXTURED BACKGROUND GUIDES (Bypasses rendering split-line bug) */}
      <div className="contact-bg-prestige-lines" aria-hidden="true" />
      <div className="contact-nebula-glow" aria-hidden="true" />

      {/* GEOMETRIC INTERACTIVE BACKPLANE DECORATIVE RINGS */}
      <div className="contact-portal-wrapper" aria-hidden="true">
        <div className="contact-kinetic-portal">
          <div className="contact-ring ring-outer" />
          <div className="contact-ring ring-mid" />
        </div>
      </div>

      {/* CORE FRAME CONTAINER LEDGER */}
      <div ref={formRef} className="contact-wrapper-prestige">
        {/* Subtle decorative geometric corners */}
        <div className="contact-gate-pin pin-tl" />
        <div className="contact-gate-pin pin-br" />

        <div className="contact-header-prestige">
          <span className="contact-subtitle-prestige">
            通信 · IMPERIAL DESK
          </span>
          <h1 className="contact-title-prestige">CONNECT ARCHIVE</h1>
          <div className="contact-rule-gold" />
        </div>

        <div className="contact-grid-prestige">
          {/* Left Block: Elite Editorial Imprint Grid */}
          <div className="contact-imprint-table-gold">
            <div className="contact-row-gold">
              <div className="contact-label-gold">
                <span className="label-gold-jp">電子メール</span>
                <span className="label-gold-en">EMAIL DIRECT</span>
              </div>
              <div className="contact-value-gold">
                <a
                  href="mailto:yourmail@gmail.com"
                  className="contact-link-gold"
                >
                  yourmail@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-row-gold">
              <div className="contact-label-gold">
                <span className="label-gold-jp">通信回線</span>
                <span className="label-gold-en">TELEPHONE</span>
              </div>
              <div className="contact-value-gold">
                <span className="contact-text-gold-neutral">
                  +91 XXXXX XXXXX
                </span>
              </div>
            </div>

            <div className="contact-row-gold">
              <div className="contact-label-gold">
                <span className="label-gold-jp">外部接続</span>
                <span className="label-gold-en">LINKEDIN PROFILE</span>
              </div>
              <div className="contact-value-gold">
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link-gold"
                >
                  linkedin.com/in/yourprofile{" "}
                  <span className="link-arrow-gold">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Block: Luxury Editorial Note Sidebar */}
          <div className="contact-editorial-sidebar-gold">
            <div className="sidebar-gold-brackets">
              <span className="bracket-gold">【</span>
              <p className="sidebar-gold-text">
                For administrative inquiries, curatorial submissions, or digital
                portfolio syndication, please forward your briefs through our
                secure secure ledger endpoints. Our archival desk responds to
                accredited members within 24 operational hours.
              </p>
              <span className="bracket-gold">】</span>
            </div>
            <div className="sidebar-stamp-gold-jp">MANGWORS 統括管理室</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
