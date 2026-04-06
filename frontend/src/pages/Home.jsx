import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import Navbar from "../components/NavBar.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import EducationSection from "../sections/EducationSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import MyPassion from "../sections/MyPassionSection.jsx";
import Certification from "../sections/CertificationSection.jsx";

/* ═══════════════════════════════════════
   SCROLL PROGRESS — thin top bar + orb
═══════════════════════════════════════ */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const orbLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
        }}
      />
      <motion.div
        className="fixed top-0 z-[101] w-2 h-2 rounded-full"
        style={{
          left: orbLeft,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, white 0%, rgba(255,255,255,0.2) 70%, transparent 100%)",
          boxShadow: "0 0 10px 3px rgba(255,255,255,0.35)",
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════
   DRUMHEAD RIPPLE RINGS
═══════════════════════════════════════ */
function DrumRipples({ origin, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[200]"
      style={{ left: origin.x, top: origin.y }}
    >
      {/* Concentric ripple rings — like a drumhead */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ width: 10, height: 10, opacity: 0.9, borderWidth: 2 - i * 0.3 }}
          animate={{
            width: 80 + i * 70,
            height: 80 + i * 70,
            opacity: 0,
          }}
          transition={{
            duration: 0.7 + i * 0.08,
            delay: i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Stick impact sparks — short radial lines */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const len = 20 + Math.random() * 30;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute bg-white"
            style={{
              height: 1.5,
              width: len,
              x: 0,
              y: 0,
              rotate: angle * (180 / Math.PI),
              transformOrigin: "left center",
              borderRadius: 2,
            }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0, x: Math.cos(angle) * 8, y: Math.sin(angle) * 8 }}
            transition={{ duration: 0.35 + Math.random() * 0.2, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN SHAKE
═══════════════════════════════════════ */
function useScreenShake() {
  const [shaking, setShaking] = useState(false);
  const shake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  };
  return { shaking, shake };
}

/* ═══════════════════════════════════════
   GLITCH TEXT HOOK
═══════════════════════════════════════ */
const GLITCH = "▓▒░█▄▀■□◆⌗";
function useGlitch(target, trigger) {
  const [text, setText] = useState(target);
  const frame = useRef(null);
  const iter = useRef(0);
  useEffect(() => {
    if (!trigger) { setText(target); return; }
    iter.current = 0;
    const step = () => {
      iter.current += 1;
      setText(
        target.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (iter.current > i * 2.5) return ch;
          return GLITCH[Math.floor(Math.random() * GLITCH.length)];
        }).join("")
      );
      if (iter.current < target.length * 3)
        frame.current = requestAnimationFrame(step);
      else setText(target);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [trigger, target]);
  return text;
}

/* ═══════════════════════════════════════
   SNARE DRUM SCROLL-TO-TOP
═══════════════════════════════════════ */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(null);
  const [struck, setStruck] = useState(false);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const { shaking, shake } = useScreenShake();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  const label = useGlitch("HIT IT", visible);

  /* BPM = 120 → beat every 500ms */
  const BPM_INTERVAL = 500;

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setVisible(v > 0.08));
    return () => unsub();
  }, [scrollYProgress]);

  /* Magnetic pull */
  useEffect(() => {
    const onMove = (e) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const pull = (1 - dist / 110) * 16;
        setMagnetPos({ x: (dx / dist) * pull, y: (dy / dist) * pull });
      } else {
        setMagnetPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleClick = (e) => {
    setRipple({ x: e.clientX, y: e.clientY });
    setStruck(true);
    shake();
    setTimeout(() => setStruck(false), 300);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
  };

  /* Drum tension rod count */
  const RODS = 12;

  return (
    <>
      <AnimatePresence>
        {ripple && <DrumRipples origin={ripple} onDone={() => setRipple(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            ref={btnRef}
            className="fixed bottom-10 right-10 z-50"
            initial={{ opacity: 0, scale: 0, rotate: -180, filter: "blur(16px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: shaking ? [-2, 3, -3, 2, -1, 0] : 0,
              filter: "blur(0px)",
              x: magnetPos.x,
              y: magnetPos.y,
            }}
            exit={{
              opacity: 0,
              scale: 0.1,
              rotate: 180,
              filter: "blur(20px)",
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: shaking ? 0.3 : 0.7,
              ease: shaking ? "easeInOut" : [0.16, 1, 0.3, 1],
            }}
          >
            <motion.button
              onClick={handleClick}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => { setHovered(false); setMagnetPos({ x: 0, y: 0 }); }}
              className="relative flex flex-col items-center justify-center gap-2 cursor-pointer select-none"
              animate={{ y: magnetPos.y * 0.2 }}
            >

              {/* ── BPM pulse ring (breathes at 120 BPM) ── */}
              <motion.div
                className="absolute rounded-full border border-white/10"
                style={{ width: 100, height: 100, top: "38%", left: "50%", x: "-50%", y: "-50%" }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: BPM_INTERVAL / 1000, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Strike shockwave ring */}
              <AnimatePresence>
                {struck && (
                  <motion.div
                    className="absolute rounded-full border-2 border-white/60"
                    style={{ width: 80, height: 80, top: "38%", left: "50%", x: "-50%", y: "-50%" }}
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {/* ── DRUM BODY ── */}
              <div className="relative" style={{ width: 72, height: 72 }}>

                {/* Outer rim ring with tension rods */}
                <svg width={72} height={72} className="absolute inset-0" viewBox="0 0 72 72">
                  {/* Drum shell rim */}
                  <circle
                    cx={36} cy={36} r={34}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="3"
                  />
                  {/* Tension rods around the rim */}
                  {Array.from({ length: RODS }, (_, i) => {
                    const angle = (i / RODS) * Math.PI * 2 - Math.PI / 2;
                    const x1 = 36 + Math.cos(angle) * 29;
                    const y1 = 36 + Math.sin(angle) * 29;
                    const x2 = 36 + Math.cos(angle) * 34;
                    const y2 = 36 + Math.sin(angle) * 34;
                    return (
                      <motion.line
                        key={i}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        animate={hovered ? {
                          stroke: ["rgba(255,255,255,0.35)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.35)"],
                        } : {}}
                        transition={{ duration: 0.4, delay: i * 0.03, repeat: hovered ? Infinity : 0 }}
                      />
                    );
                  })}
                </svg>

                {/* Progress arc */}
                <svg width={72} height={72} className="absolute inset-0" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={36} cy={36} r={26} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                  <motion.circle
                    cx={36} cy={36} r={26}
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                  />
                </svg>

                {/* Drumhead — the glass disc */}
                <motion.div
                  className="absolute rounded-full border border-white/20 backdrop-blur-xl overflow-hidden flex items-center justify-center"
                  style={{ inset: 10 }}
                  animate={{
                    backgroundColor: hovered
                      ? "rgba(255,255,255,0.12)"
                      : struck
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.04)",
                    boxShadow: hovered
                      ? "0 0 30px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.08)"
                      : struck
                      ? "0 0 60px rgba(255,255,255,0.4)"
                      : "none",
                    scaleY: struck ? [1, 0.88, 1.05, 1] : 1,
                    scaleX: struck ? [1, 1.06, 0.97, 1] : 1,
                  }}
                  transition={{ duration: struck ? 0.25 : 0.3 }}
                >
                  {/* Snare wire lines across the head */}
                  {[0.3, 0.5, 0.7].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-2 right-2 bg-white/10"
                      style={{ top: `${pos * 100}%`, height: 0.5 }}
                      animate={struck ? { scaleY: [1, 3, 1], opacity: [0.15, 0.6, 0.15] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  ))}

                  {/* Drumhead center dot */}
                  <motion.div
                    className="absolute rounded-full bg-white/15"
                    style={{ width: 8, height: 8 }}
                    animate={struck ? { scale: [1, 2.5, 0.8, 1], opacity: [0.3, 1, 0.3] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Arrow — only on hover */}
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="relative z-10 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      opacity: hovered ? 1 : 0,
                      color: "#ffffff",
                      y: hovered ? -1 : 4,
                      filter: hovered ? "drop-shadow(0 0 6px white)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </motion.svg>
                </motion.div>
              </div>

              {/* ── "HIT IT" glitch label ── */}
              <motion.div
                className="flex items-center gap-1.5"
                animate={{ opacity: hovered ? 1 : 0.3 }}
              >
                {/* Left drumstick glyph */}
                <motion.span
                  className="font-mono text-white/40 text-[9px]"
                  animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : 3 }}
                  transition={{ duration: 0.2 }}
                >
                  ╱
                </motion.span>

                <motion.div className="h-[1px] bg-white/30"
                  animate={{ width: hovered ? 12 : 4 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.span
                  className="font-mono text-[7px] tracking-[0.5em] uppercase"
                  animate={{
                    color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
                    textShadow: hovered ? "0 0 14px rgba(255,255,255,0.9)" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>

                <motion.div className="h-[1px] bg-white/30"
                  animate={{ width: hovered ? 12 : 4 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Right drumstick glyph */}
                <motion.span
                  className="font-mono text-white/40 text-[9px]"
                  animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -3 }}
                  transition={{ duration: 0.2 }}
                >
                  ╲
                </motion.span>
              </motion.div>

              {/* ── Corner targeting brackets ── */}
              <AnimatePresence>
                {hovered && (
                  <>
                    {[
                      { top: -12, left: -12, borderTop: "1px solid", borderLeft: "1px solid" },
                      { top: -12, right: -12, borderTop: "1px solid", borderRight: "1px solid" },
                      { bottom: -12, right: -12, borderBottom: "1px solid", borderRight: "1px solid" },
                      { bottom: -12, left: -12, borderBottom: "1px solid", borderLeft: "1px solid" },
                    ].map((style, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 border-white/40"
                        style={style}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.18, delay: i * 0.04 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* ── HUD side readout ── */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    className="absolute right-full mr-4 flex flex-col items-end gap-[3px]"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {[
                      { label: "BPM", value: "120" },
                      { label: "MODE", value: "SNARE" },
                      { label: "CMD", value: "SCROLL ↑" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <span className="font-mono text-[6px] text-white/25 tracking-widest uppercase">
                          {item.label}
                        </span>
                        <span className="font-mono text-[7px] text-white/55 tracking-wider">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Copyright footer with dot grid, glow line, and decorative glyphs

function CopyrightFooter() {
  const year = new Date().getFullYear();
 
  return (
    <footer
      style={{
        position: "relative",
        background: "#000",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
 
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
          boxShadow: "0 0 12px rgba(255,255,255,0.12)",
        }}
      />
 
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "28px 40px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Left: decorative glyph + copyright text */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            © {year}{" "}
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              Susinidu Sachinthana
            </span>
            {" "}·{" "}
            <span style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "11px" }}>
              Software Engineer
            </span>
            {" "}· All rights reserved.
          </p>
        </div>
 
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════
   HOME
═══════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <Navbar />

      <main className="pt-16 sm:pt-20">
        <section className="relative">
          <div><HeroSection /></div>
          <div><AboutSection /></div>
          <div><ExperienceSection /></div>
          <div><EducationSection /></div>
          <div><SkillsSection /></div>
          <div><ProjectsSection /></div>
          <div><Certification /></div>
          <div><MyPassion /></div>
        </section>
      </main>

      <CopyrightFooter />
      <ScrollToTop />
    </div>
  );
}