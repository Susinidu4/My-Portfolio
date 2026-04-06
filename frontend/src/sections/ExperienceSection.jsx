import { useState, useEffect, useRef } from "react";

import SLT_CT1 from "../assets/Experience/SLT/Appriciatiom_letter.jpg";
import SLT_CT2 from "../assets/Experience/SLT/Intern_letter.jpg";
import SLT_G1 from "../assets/Experience/SLT/SLT_1.jpeg";
import SLT_G2 from "../assets/Experience/SLT/SLT_2.jpeg";
import SLT_G3 from "../assets/Experience/SLT/SLT_3.jpeg";
import SLT_G4 from "../assets/Experience/SLT/SLT_4.jpeg";
import SLT_G5 from "../assets/Experience/SLT/SLT_5.jpeg";


const experiences = [
  {
    id: 1,
    title: "Intern Software Developer",
    company: "Sri Lanka Telecom",
    location: "Colombo, Western Province, Sri Lanka",
    period: "January 2025 – July 2025",
    bullets: [
      "Developed scalable full-stack modules using the MERN stack (MongoDB, Express.js, React.js, Node.js) to support enterprise-level debt recovery operations.",
      "Optimized backend API performance and system response times, resulting in improved system efficiency and reduced latency.",
      "Collaborated with cross-functional teams to integrate frontend components with backend logic, ensuring seamless user experiences.",
      "Enhanced data handling processes and implemented efficient database queries for high-volume transactional operations using MongoDB.",
      "Contributed to the design and debugging of UI features and RESTful APIs, improving user functionality and addressing performance issues in production.",
    ],
    tags: ["MERN Stack", "MongoDB", "Node.js", "React.js"],
    certifications: [
      {
        id: 1,
        title: "Debt Recovery System Project Appreciation Letter",
        issuer: "Sri Lanka Telecom PLC",
        date: "Aug 2025",
        src: SLT_CT1,
      },
      {
        id: 2,
        title: "Software Developer Internship Completion Letter",
        issuer: "Sri Lanka Telecom PLC",
        date: "Jul 2025",
        src: SLT_CT2,
      },
    ],
    gallery: [
      { id: 1, src: SLT_G1 },
      { id: 2, src: SLT_G2 },
      { id: 3, src: SLT_G3 },
      { id: 4, src: SLT_G4 },
      { id: 5, src: SLT_G5 },
    ],
  },
];

const CircuitSVG = () => (
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", right: 0, top: 0, width: "320px", height: "320px", opacity: 0.1, pointerEvents: "none" }}>
    <g stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none">
      <circle cx="250" cy="250" r="200" /><circle cx="250" cy="250" r="160" /><circle cx="250" cy="250" r="120" />
      <circle cx="250" cy="250" r="80" /><circle cx="250" cy="250" r="30" />
      <line x1="250" y1="50" x2="250" y2="220" /><line x1="250" y1="280" x2="250" y2="450" />
      <line x1="50" y1="250" x2="220" y2="250" /><line x1="280" y1="250" x2="450" y2="250" />
      <rect x="240" y="100" width="20" height="10" fill="rgba(255,255,255,0.3)" />
      <rect x="240" y="390" width="20" height="10" fill="rgba(255,255,255,0.3)" />
      <rect x="100" y="245" width="10" height="20" fill="rgba(255,255,255,0.3)" />
      <rect x="390" y="245" width="10" height="20" fill="rgba(255,255,255,0.3)" />
      <line x1="130" y1="130" x2="192" y2="192" /><line x1="370" y1="130" x2="308" y2="192" />
      <line x1="130" y1="370" x2="192" y2="308" /><line x1="370" y1="370" x2="308" y2="308" />
      <circle cx="130" cy="130" r="6" fill="rgba(255,255,255,0.3)" />
      <circle cx="370" cy="130" r="6" fill="rgba(255,255,255,0.3)" />
      <circle cx="130" cy="370" r="6" fill="rgba(255,255,255,0.3)" />
      <circle cx="370" cy="370" r="6" fill="rgba(255,255,255,0.3)" />
    </g>
  </svg>
);

/* ─── CERTIFICATIONS MODAL ─────────────────────────────────────────── */
function CertificationsModal({ certs, onClose }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const go = (dir) => {
    if (sliding) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next" ? (prev + 1) % certs.length : (prev - 1 + certs.length) % certs.length
      );
      setSliding(false);
    }, 220);
  };

  const jumpTo = (i) => {
    if (sliding || i === current) return;
    setDirection(i > current ? "next" : "prev");
    setSliding(true);
    setTimeout(() => { setCurrent(i); setSliding(false); }, 220);
  };

  const cert = certs[current];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        background: `rgba(0,0,0,${visible ? 0.88 : 0})`,
        backdropFilter: `blur(${visible ? 18 : 0}px)`,
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "820px",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04) inset",
          transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
        }}
      >
        {/* ── Top bar: counter + close only ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
              {current + 1} / {certs.length}
            </span>
            <button
              onClick={handleClose}
              style={{
                width: "32px", height: "32px", borderRadius: "8px",
                border: "0.5px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.5)", fontSize: "16px",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Certificate image + side arrows ── */}
        <div style={{ position: "relative", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "420px" }}>
          {/* Left arrow */}
          <button
            onClick={() => go("prev")}
            style={{
              position: "absolute", left: "14px", zIndex: 10,
              width: "42px", height: "42px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.65)",
              color: "rgba(255,255,255,0.8)", fontSize: "22px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.38)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
          >
            ‹
          </button>

          {/* Image */}
          <div style={{ width: "100%", padding: "0 72px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              key={cert.id}
              src={cert.src}
              alt={cert.title}
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "contain",
                borderRadius: "6px",
                display: "block",
                opacity: sliding ? 0 : 1,
                transform: sliding
                  ? `translateX(${direction === "next" ? "-24px" : "24px"})`
                  : "translateX(0)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go("next")}
            style={{
              position: "absolute", right: "14px", zIndex: 10,
              width: "42px", height: "42px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.65)",
              color: "rgba(255,255,255,0.8)", fontSize: "22px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.38)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
          >
            ›
          </button>
        </div>

        {/* ── Bottom info bar ── */}
        <div style={{
          padding: "18px 28px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px",
        }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>
              {cert.title}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
              {cert.issuer} · {cert.date}
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
            {certs.map((_, i) => (
              <div
                key={i}
                onClick={() => jumpTo(i)}
                style={{
                  width: i === current ? "18px" : "6px",
                  height: "6px",
                  borderRadius: i === current ? "3px" : "50%",
                  background: i === current ? "#fff" : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GALLERY MODAL ─────────────────────────────────────────────────── */
function GalleryModal({ items, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        background: `rgba(0,0,0,${visible ? 0.85 : 0})`,
        backdropFilter: `blur(${visible ? 16 : 0}px)`,
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "760px",
          background: "linear-gradient(160deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.9)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "28px 32px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          position: "relative",
        }}>
          <div style={{ position: "absolute", top: 0, left: "36px", right: "36px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)" }} />
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "6px", margin: "0 0 6px" }}>
              Visual Archive
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", margin: 0 }}>
              Gallery
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: "34px", height: "34px", borderRadius: "9px",
              border: "0.5px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)", fontSize: "16px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            ✕
          </button>
        </div>

        {/* Grid — images only, no text overlay */}
        <div style={{ padding: "24px 32px 32px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                position: "relative", aspectRatio: "4/3",
                borderRadius: "12px",
                border: "0.5px solid rgba(255,255,255,0.09)",
                overflow: "hidden",
                animation: `galleryFadeIn 0.4s ${0.05 + i * 0.06}s both ease`,
              }}
            >
              <img
                src={item.src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes galleryFadeIn {
            from { opacity: 0; transform: scale(0.92); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ─── MAIN EXPERIENCE SECTION ──────────────────────────────────────── */
export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animState, setAnimState] = useState("idle");
  const [displayIndex, setDisplayIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const timeoutRef = useRef(null);

  const switchTo = (idx) => {
    if (idx === activeIndex || animState !== "idle") return;
    setAnimState("exit");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayIndex(idx);
      setActiveIndex(idx);
      setAnimState("enter");
      timeoutRef.current = setTimeout(() => setAnimState("idle"), 500);
    }, 350);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    if (animState === "enter") {
      const t = setTimeout(() => setAnimState("idle"), 20);
      return () => clearTimeout(t);
    }
  }, [animState]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const exp = experiences[displayIndex];

  const cardStyle = {
    transition: "opacity 0.35s ease, transform 0.35s ease",
    opacity: animState === "exit" ? 0 : 1,
    transform:
      animState === "exit" ? "translateX(-28px) scale(0.97)"
      : animState === "enter" ? "translateX(28px) scale(0.97)"
      : "translateX(0) scale(1)",
    pointerEvents: animState !== "idle" ? "none" : "auto",
  };

  return (
    <div
      id="experience"
      style={{
        scrollMarginTop: "80px", minHeight: "100vh",
        background: "#000000",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        color: "#ffffff", position: "relative", overflow: "hidden", padding: "0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        .exp-bullet::before { content: '·'; position: absolute; left: 0; top: 0; color: rgba(255,255,255,0.5); font-size: 18px; line-height: 1.5; }
        .nav-card { position: relative; background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 16px; cursor: pointer; transition: all 0.3s ease; overflow: hidden; }
        .nav-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
        .nav-card.active { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }
        .tag-pill { display: inline-block; padding: 3px 12px; border-radius: 100px; border: 0.5px solid rgba(255,255,255,0.25); font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.08em; color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.05); text-transform: uppercase; }
        .action-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 28px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.22); background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.03) 100%); color: rgba(255,255,255,0.78); font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease; box-shadow: inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -4px 10px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.35); }
        .action-btn:hover { border-color: rgba(255,255,255,0.42); background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 100%); color: rgba(255,255,255,0.98); transform: translateY(-2px); }
        .action-btn:active { transform: translateY(1px); }
        .dot-indicator { width: 6px; height: 6px; border-radius: 50%; transition: all 0.3s ease; cursor: pointer; border: 0.5px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.1); }
        .dot-indicator.active { background: #ffffff; border-color: #ffffff; width: 20px; border-radius: 3px; }
        .nav-arrow-btn { flex: 1; height: 36px; background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 12px; color: rgba(255,255,255,0.4); font-size: 16px; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; }
        .nav-arrow-btn:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.06); }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .stagger-in { animation: fadeSlideIn 0.5s ease both; }
      `}</style>

      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", right: "8%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      <CircuitSVG />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 32px 64px" }}>
        {/* Heading */}
        <div style={{ marginBottom: "52px" }} className="stagger-in">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "12px" }}>Career Journey</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff", lineHeight: 1, margin: 0 }}>Work Experience</h1>
          <div style={{ marginTop: "16px", width: "480px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)", boxShadow: "0 0 12px rgba(255,255,255,0.18)" }} />
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* Main card */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <div style={{
              ...cardStyle,
              background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.16)", borderRadius: "20px",
              padding: "40px 44px 36px", position: "relative", overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -8px 18px rgba(0,0,0,0.85), 0 0 18px rgba(255,255,255,0.06), 0 20px 45px rgba(0,0,0,0.55)",
            }}>
              <div style={{ position: "absolute", top: 0, left: "40px", right: "40px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }} />

              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", margin: "0 0 20px" }}>
                {exp.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>📍</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{exp.company}, {exp.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>📅</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{exp.period}</span>
                </div>
              </div>

              <div style={{ height: "0.5px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} className="exp-bullet" style={{ position: "relative", paddingLeft: "18px", fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>{b}</li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "28px" }}>
                {exp.tags.map((t) => <span key={t} className="tag-pill">{t}</span>)}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                <button className="action-btn" onClick={() => setModal("certs")}>
                  <span style={{ fontSize: "13px" }}>◎</span> Certifications
                </button>
                <button className="action-btn" onClick={() => setModal("gallery")}>
                  <span style={{ fontSize: "13px" }}>⊞</span> Gallery
                </button>
              </div>

              <div style={{ position: "absolute", bottom: 0, left: "40px", right: "40px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)", boxShadow: "0 0 10px rgba(255,255,255,0.12)" }} />
            </div>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px", alignItems: "center" }}>
              {experiences.map((_, i) => (
                <div key={i} className={`dot-indicator${activeIndex === i ? " active" : ""}`} onClick={() => switchTo(i)} />
              ))}
            </div>
          </div>

          {/* Side nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "220px", flexShrink: 0 }}>
            {experiences.map((e, i) => (
              <div key={e.id} className={`nav-card${activeIndex === i ? " active" : ""}`} onClick={() => switchTo(i)} style={{ padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: activeIndex === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)", marginBottom: "6px", transition: "color 0.3s" }}>0{i + 1}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.45)", lineHeight: 1.4, transition: "color 0.3s" }}>{e.title}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: activeIndex === i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)", marginTop: "4px", transition: "color 0.3s" }}>{e.company}</div>
                <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px", borderRadius: "0 2px 2px 0", background: "#ffffff", opacity: activeIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button className="nav-arrow-btn" onClick={() => switchTo((activeIndex - 1 + experiences.length) % experiences.length)}>←</button>
              <button className="nav-arrow-btn" onClick={() => switchTo((activeIndex + 1) % experiences.length)}>→</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "certs" && <CertificationsModal certs={exp.certifications} onClose={() => setModal(null)} />}
      {modal === "gallery" && <GalleryModal items={exp.gallery} onClose={() => setModal(null)} />}
    </div>
  );
}