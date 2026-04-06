import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import cert1 from "../assets/Certifications/aquinas_diploma.jpg";
import cert2 from "../assets/Certifications/computer_hardware.jpg";
import cert3 from "../assets/Certifications/SLIIT_diploma.jpg";
import cert4 from "../assets/Certifications/basic_computer_course.jpg";
import cert5 from "../assets/Certifications/AI_ML_Stage_01.jpg";
import cert6 from "../assets/Certifications/AI_ML_Stage_02.jpg";
import cert7 from "../assets/Certifications/power_apps.jpg";
import cert8 from "../assets/Certifications/DSA.jpg";
import cert9 from "../assets/Certifications/mongoDB.jpg";

const CERTS = [
  {
    id: 1,
    title: "Get started with Power Apps canvas apps",
    issuer: "Microsoft Learn",
    date: "Mar 2026",
    category: "Power Apps",
    credentialId: "",
    color: "#ffffff",
    image: cert7,
  },
  {
    id: 2,
    title: "Basics of Data Structures and Algorithms",
    issuer: "Simplilearn",
    date: "Aug 2025",
    category: "DSA",
    credentialId: "8738869",
    color: "#ffffff",
    image: cert8,
  },
  {
    id: 3,
    title: "Introduction to MongoDB",
    issuer: "MongoDB University",
    date: "Dec 2024",
    category: "Database",
    credentialId: "MDBaj5qz29i2n",
    color: "#ffffff",
    image: cert9,
  },
  {
    id: 4,
    title: "AI/ML Engineer Stage 02",
    issuer: "Faculty of Computing, SLIIT",
    date: "Dec 2024",
    category: "AI/ML",
    credentialId: "cfhycko4da",
    color: "#ffffff",
    image: cert6,
  },
  {
    id: 5,
    title: "AI/ML Engineer Stage 01",
    issuer: "Faculty of Computing, SLIIT",
    date: "Nov 2024",
    category: "AI/ML",
    credentialId: "alpibmgr77",
    color: "#ffffff",
    image: cert5,
  },
  {
    id: 6,
    title: "Higher Diploma in Information Technology",
    issuer: "SLIIT",
    date: "Jul 2024",
    category: "Information Technology",
    credentialId: "HDPIT-8844",
    color: "#ffffff",
    image: cert3,
  },
  {
    id: 7,
    title: "Computer Hardware Technician (NVQ Level 4)",
    issuer: "Dept. of Technical Education & Training, Sri Lanka",
    date: "Dec 2022",
    category: "Computer Hardware",
    credentialId: "101061448",
    color: "#ffffff",
    image: cert2,
  },
  {
    id: 8,
    title: "Aquinas Diploma in English",
    issuer: "Joseph Vaz Institute ",
    date: "Jan 2022",
    category: "English",
    credentialId: "META-FE-2024-0192",
    color: "#ffffff",
    image: cert1,
  },

  {
    id: 9,
    title: "Computer Course for Beginners",
    issuer: "Ministry of Education, Sri Lanka",
    date: "Sep 2017",
    category: "Information Technology",
    credentialId: "",
    color: "#ffffff",
    image: cert4,
  },
];

/* ─────────────────────────────────────────
   LIGHTBOX MODAL — orientation-aware
───────────────────────────────────────── */
function Lightbox({ cert, onClose, onPrev, onNext, total, current }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLandscape, setIsLandscape] = useState(null); // null = unknown yet
  const imgRef = useRef(null);

  // Detect orientation whenever cert changes
  useEffect(() => {
    setImgLoaded(false);
    setIsLandscape(null);
  }, [cert.id]);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsLandscape(naturalWidth >= naturalHeight);
    setImgLoaded(true);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  // Layout adapts: landscape → wide card with image on top (shorter)
  //                portrait  → narrower card with image taller
  const cardMaxWidth = isLandscape === false ? "max-w-xl" : "max-w-3xl";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/92"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(20px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
      />

      {/* Card */}
      <motion.div
        className={`relative z-10 w-full ${cardMaxWidth} overflow-hidden rounded-[32px]`}
        style={{
          background: "linear-gradient(160deg, #111 0%, #070707 100%)",
          border: "0.5px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 60px 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)",
          // Ensure the card never exceeds the viewport height
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10 rounded-t-[32px] flex-shrink-0"
          style={{
            background: `linear-gradient(to right, transparent, ${cert.color}, transparent)`,
          }}
        />

        {/* ── IMAGE AREA ── */}
        {/*
          Key change: we use a neutral dark background + object-contain so the
          full certificate is always visible regardless of orientation.
          A soft vignette overlay keeps the aesthetic without cropping.
        */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            /*
              Landscape certs get a shorter image box (they're wide already).
              Portrait certs get a taller box so they fill nicely.
              While orientation is still loading we use a sensible default.
            */
            height:
              isLandscape === false
                ? "clamp(260px, 52vw, 480px)"
                : isLandscape === true
                  ? "clamp(220px, 28vw, 320px)"
                  : "clamp(220px, 30vw, 340px)",
            transition: "height 0.4s ease",
            background: "#0a0a0a",
          }}
        >
          {/* Skeleton shimmer while loading */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background:
                  "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)",
              }}
            />
          )}

          <motion.img
            key={cert.id}
            ref={imgRef}
            src={cert.image}
            alt={cert.title}
            onLoad={handleImageLoad}
            className="w-full h-full"
            style={{
              objectFit: "contain", // ← FULL cert always visible
              objectPosition: "center",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
            initial={{ scale: 1.04 }}
            animate={{ scale: imgLoaded ? 1 : 1.04 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          {/*
            Subtle corner vignette — gives depth without hiding the cert.
            We avoid a heavy bottom gradient so portrait certs aren't obscured.
          */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Floating category badge */}
          <div
            className="absolute top-4 left-4 text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full"
            style={{
              background: `${cert.color}22`,
              border: `0.5px solid ${cert.color}55`,
              color: cert.color,
              backdropFilter: "blur(8px)",
            }}
          >
            {cert.category}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] text-white/40 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/8">
            {current + 1} / {total}
          </div>
        </div>

        {/* ── DETAILS AREA (scrollable if content overflows) ── */}
        <div
          className="overflow-y-auto flex-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Title + issuer strip */}
          <div
            className="px-6 pt-5 pb-1"
            style={{
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <motion.h3
              key={cert.id + "title"}
              className="text-xl sm:text-2xl text-white font-light leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {cert.title}
            </motion.h3>
            <motion.p
              key={cert.id + "issuer"}
              className="text-xs tracking-[0.18em] text-white/40 mt-1 mb-4 uppercase"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.22,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {cert.issuer} · {cert.date}
            </motion.p>
          </div>

          {/* Body */}
          <motion.div
            key={cert.id + "body"}
            className="p-6 sm:p-8 pt-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.2em] text-white/20 uppercase mb-1">
                  Credential ID
                </p>
                <p className="text-[11px] font-mono text-white/40">
                  {cert.credentialId || "—"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nav arrows */}
        {[
          { dir: "prev", action: onPrev, icon: "M8 2L4 6l4 4", x: "left-3 " },
          { dir: "next", action: onNext, icon: "M4 2l4 4-4 4", x: "right-3 " },
        ].map(({ dir, action, icon, x }) => (
          <button
            key={dir}
            onClick={action}
            className={`absolute ${x} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/12 bg-black/80 backdrop-blur flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all duration-200 hover:scale-105`}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d={icon}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-[4.5rem] w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all duration-200 backdrop-blur-md z-20"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

// GALLERY TILE  (horizontal scroll card)
function GalleryTile({ cert, index, onClick, sectionInView }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onClick={() => onClick(cert)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden rounded-[24px] cursor-pointer flex-shrink-0"
      style={{
        width: "clamp(260px, 26vw, 340px)",
        height: "clamp(340px, 34vw, 440px)",
        border: hov
          ? "0.5px solid rgba(255,255,255,0.2)"
          : "0.5px solid rgba(255,255,255,0.07)",
        transition: "border 0.4s ease",
      }}
      initial={{ opacity: 0, x: 60, scale: 0.93 }}
      animate={sectionInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{
        delay: 0.1 + index * 0.09,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hov ? 1.08 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
          style={{
            filter: hov
              ? "brightness(0.6) saturate(1.15)"
              : "brightness(0.25) saturate(0.6)",
            transition: "filter 0.7s ease",
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hov
            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 52%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          transition: "background 0.55s ease",
        }}
      />

      {/* Color accent glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 105%, ${cert.color}30 0%, transparent 65%)`,
        }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.55 }}
      />

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px]"
        style={{
          background: `linear-gradient(to right, ${cert.color}, ${cert.color}88)`,
          transformOrigin: "left",
        }}
        animate={{ scaleX: hov ? 1 : 0.28, opacity: hov ? 1 : 0.35 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Category pill */}
      <motion.div
        className="absolute top-4 left-4 text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full"
        style={{
          background: `${cert.color}20`,
          border: `0.5px solid ${cert.color}50`,
          color: cert.color,
          backdropFilter: "blur(8px)",
        }}
        animate={{ opacity: hov ? 1 : 0.55, y: hov ? 0 : 3 }}
        transition={{ duration: 0.35 }}
      >
        {cert.category}
      </motion.div>

      {/* Expand icon */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/55 border border-white/12 flex items-center justify-center backdrop-blur-sm"
        animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.65 }}
        transition={{ duration: 0.35 }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 10L10 2M10 2H6M10 2V6"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.p
          className="text-[10px] tracking-[0.22em] uppercase mb-2 font-mono"
          style={{ color: cert.color }}
          animate={{ opacity: hov ? 1 : 0.45, y: hov ? 0 : 4 }}
          transition={{ duration: 0.4 }}
        >
          {cert.issuer}
        </motion.p>

        <motion.h3
          className="text-xl font-light text-white leading-snug mb-1"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em" }}
          animate={{ y: hov ? 0 : 6, opacity: hov ? 1 : 0.7 }}
          transition={{ duration: 0.45 }}
        >
          {cert.title}
        </motion.h3>

        <motion.p
          className="text-[10px] tracking-[0.18em] text-white/30 mb-4"
          animate={{ opacity: hov ? 0.7 : 0.3 }}
          transition={{ duration: 0.35 }}
        >
          {cert.date}
        </motion.p>

        
      </div>
    </motion.div>
  );
}

// MAIN SECTION
export default function CertificationsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 });

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const openLightbox = (cert) =>
    setLightboxIndex(CERTS.findIndex((c) => c.id === cert.id));
  const closeLightbox = () => setLightboxIndex(null);
  const prevCert = () =>
    setLightboxIndex((i) => (i - 1 + CERTS.length) % CERTS.length);
  const nextCert = () => setLightboxIndex((i) => (i + 1) % CERTS.length);

  return (
    <>
      <section
        ref={sectionRef}
        id="certifications"
        className="relative w-full bg-black overflow-hidden py-24 lg:py-32"
      >
        {/* Parallax atmosphere */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ y: bgY }}
        >
          <div className="absolute right-[-10%] top-[8%] h-[550px] w-[550px] rounded-full bg-white/[0.02] blur-[100px]" />
          <div className="absolute left-[-8%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-white/[0.018] blur-[85px]" />
          <div
            className="absolute inset-0 opacity-[0.016]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
          {/* Heading */}
          <div
            ref={headingRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3"
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-[54px] font-light text-white leading-[0.88] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                initial={{ y: 72, opacity: 0 }}
                animate={headingInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: 0.1,
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                MY
                <br />
                <motion.span
                  className="text-white"
                  initial={{ y: 72, opacity: 0 }}
                  animate={headingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    delay: 0.22,
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  CERTIFICATIONS
                </motion.span>
                <div
                  style={{
                    marginTop: "12px",
                    width: "450px",
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.18)",
                  }}
                />
              </motion.h2>
            </div>
            <motion.p
              className="text-[11px] tracking-[0.2em] text-white/25 uppercase max-w-[180px] text-right leading-relaxed hidden sm:block"
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Click any card to view details
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            className="h-[0.5px] mb-10"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.14), rgba(255,255,255,0.04), transparent)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Horizontal scroll gallery */}
          <div className="relative group/scroll">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />

            <motion.button
              onClick={() => {
                const el = document.getElementById("cert-scroll-track");
                el.scrollBy({ left: -380, behavior: "smooth" });
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/12 flex items-center justify-center text-white/50 backdrop-blur-sm hover:text-white hover:border-white/28 transition-all duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path
                  d="M8 2L4 6l4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                const el = document.getElementById("cert-scroll-track");
                el.scrollBy({ left: 380, behavior: "smooth" });
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/12 flex items-center justify-center text-white/50 backdrop-blur-sm hover:text-white hover:border-white/28 transition-all duration-200"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <div
              id="cert-scroll-track"
              className="flex gap-5 overflow-x-auto pb-4 px-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
              }}
            >
              <style>{`#cert-scroll-track::-webkit-scrollbar { display: none; }`}</style>
              {CERTS.map((cert, i) => (
                <div key={cert.id} style={{ scrollSnapAlign: "start" }}>
                  <GalleryTile
                    cert={cert}
                    index={i}
                    onClick={openLightbox}
                    sectionInView={inView}
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-4" />
            </div>

            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {CERTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = document.getElementById("cert-scroll-track");
                    const cardW = el.scrollWidth / CERTS.length;
                    el.scrollTo({ left: cardW * i, behavior: "smooth" });
                  }}
                  className="w-1 h-1 rounded-full bg-white/20 hover:bg-white/50 transition-colors duration-200"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            cert={CERTS[lightboxIndex]}
            current={lightboxIndex}
            total={CERTS.length}
            onClose={closeLightbox}
            onPrev={prevCert}
            onNext={nextCert}
          />
        )}
      </AnimatePresence>
    </>
  );
}
