import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import profileImg from "../assets/profile_pic.png";

/* ── Floating particle dots ── */
function Particles() {
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 6,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.35, 0], y: [0, -30, -60] }}
          transition={{
            delay: d.delay,
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Scan-line texture overlay ── */
function ScanLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
        zIndex: 1,
      }}
    />
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    description: "Susinidu Sachinthana",
    accent: "#0A66C2",
    href: "https://www.linkedin.com/in/susinidu-sachinthana-17ss4",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 24h4V7.98h-4V24zM8 7.98h3.83v2.2h.05c.53-1 1.83-2.2 3.77-2.2C20.1 7.98 22 10.02 22 14.4V24h-4v-8.5c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24H8V7.98z",
  },
  {
    label: "GitHub",
    description: "Susinidu4",
    accent: "#f0f6fc",
    href: "https://github.com/Susinidu4",
    path: "M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.44 9.41 8.2 10.94.6.12.82-.27.82-.59v-2.1c-3.34.74-4.04-1.46-4.04-1.46-.55-1.42-1.35-1.8-1.35-1.8-1.1-.78.08-.77.08-.77 1.22.09 1.86 1.28 1.86 1.28 1.08 1.9 2.84 1.35 3.53 1.03.11-.8.42-1.35.77-1.66-2.66-.31-5.46-1.36-5.46-6.05 0-1.34.46-2.44 1.22-3.3-.12-.31-.53-1.58.12-3.29 0 0 1-.33 3.3 1.26a11.2 11.2 0 0 1 3-.42c1.02 0 2.05.14 3 .42 2.3-1.59 3.3-1.26 3.3-1.26.65 1.71.24 2.98.12 3.29.76.86 1.22 1.96 1.22 3.3 0 4.7-2.8 5.74-5.47 6.05.43.38.81 1.12.81 2.26v3.35c0 .33.22.71.82.59A11.28 11.28 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5z",
  },
  {
    label: "Email",
    description: "susinidusachinthana@gmail.com",
    accent: "#EA4335",
    href: "mailto:susinidusachinthana@gmail.com?cc=susinidusachinthana@gmail.com&subject=Contact%20from%20Portfolio&body=Hi%20Susinidu,%0A%0AI%20would%20like%20to%20connect%20with%20you.",
    path: "M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z",
  },
  {
    label: "Location",
    description: "Kekillapitiya, Pannala",
    accent: "#06B6D4",
    href: "https://www.google.com/maps?q=7.33793,80.05064",
    path: "M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z",
  },
  {
    label: "Phone",
    description: "+94 76 354 1455",
    accent: "#25D366",
    href: "tel:+94763541455",
    path: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z",
  },
];

/* ── Social tooltip component ── */
function SocialTooltip({ label, description, accent }) {
  return (
    <motion.div
      className="absolute right-[calc(100%+20px)] top-1/2 pointer-events-none z-50"
      style={{ translateY: "-50%", transform: "translateY(-50%)" }}
      initial={{ opacity: 0, x: 12, scale: 0.88, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 8, scale: 0.92, filter: "blur(3px)" }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative flex flex-col items-end overflow-hidden rounded-xl border border-white/10 bg-black/80 px-4 py-2.5 backdrop-blur-2xl"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${accent}18`,
        }}
      >
        {/* Accent sweep bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Label */}
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 whitespace-nowrap"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.22 }}
        >
          {label}
        </motion.p>
        {/* Description */}
        <motion.p
          className="mt-0.5 text-[10px] tracking-[0.06em] whitespace-nowrap"
          style={{ color: `${accent}cc` }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.22 }}
        >
          {description}
        </motion.p>
        {/* Arrow notch */}
        <div
          className="absolute top-1/2 -right-[7px] w-[7px] h-[7px] rotate-45 border-r border-t border-white/10 bg-black/80"
          style={{ transform: "translateY(-50%) rotate(45deg)" }}
        />
      </div>
    </motion.div>
  );
}

/* ── Social icon component ── */
function SocialIcon({ s, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={s.href}
      aria-label={s.label}
      className="relative group flex items-center justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 1.4 + index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: -4 }}
    >
      <AnimatePresence>
        {hovered && (
          <SocialTooltip
            label={s.label}
            description={s.description}
            accent={s.accent}
          />
        )}
      </AnimatePresence>

      {/* Hover line */}
      <motion.div
        className="absolute right-full mr-2 h-[1px] origin-right"
        style={{ width: 20, opacity: 0.6, backgroundColor: s.accent }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon ring + glow */}
      <motion.div
        className="relative flex items-center justify-center w-9 h-9 rounded-full"
        animate={{
          backgroundColor: hovered ? `${s.accent}15` : "transparent",
          boxShadow: hovered
            ? `0 0 14px ${s.accent}30, inset 0 0 8px ${s.accent}10`
            : "none",
        }}
        transition={{ duration: 0.25 }}
      >
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(black, black) padding-box, conic-gradient(from 0deg, transparent, ${s.accent}, transparent) border-box`,
              border: "1px solid transparent",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] relative z-10"
          fill="currentColor"
          animate={{
            color: hovered ? s.accent : "rgba(255,255,255,0.4)",
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <path d={s.path} />
        </motion.svg>
      </motion.div>
    </motion.a>
  );
}

/* ── Letter-by-letter stagger animation ── */
function AnimatedWord({ text, className, delay = 0, charDelay = 0.04 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * charDelay,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  const smoothX = useSpring(0, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setLoaded(true);
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      smoothX.set((e.clientX - rect.left) / rect.width - 0.5);
      smoothY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const imgRotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const imgRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  /* ── Scroll fade-out ── */
  const { scrollY } = useScroll();
  const sectionOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const sectionY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <ScanLines />
      <Particles />

      {/* Radial glow center */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "40%",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Corner accent lines */}
      <motion.div
        className="pointer-events-none absolute top-8 left-8"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-8 h-[1px] bg-white/30" />
        <div className="w-[1px] h-8 bg-white/30 mt-0" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute top-8 right-16 lg:right-20"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-8 h-[1px] bg-white/30 ml-auto" />
        <div className="w-[1px] h-8 bg-white/30 ml-auto" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 pt-28 lg:pt-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* LEFT — text */}
          <div className="relative z-10">
            {/* Eyebrow line */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="h-[1px] w-10 bg-white/40" />
              <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Portfolio
              </span>
            </motion.div>

            <h1 className="leading-[0.85] perspective-[800px]">
              <div className="block overflow-hidden">
                <AnimatedWord
                  text="SUSI"
                  delay={0.35}
                  charDelay={0.045}
                  className="block font-bold text-[68px] sm:text-[88px] lg:text-[112px] tracking-[0.02em] text-white"
                  style={{ fontFamily: "'Libre Bodoni', serif" }}
                />
              </div>
              <div className="block overflow-hidden mt-4">
                <AnimatedWord
                  text="SACHINTHANA"
                  delay={0.85}
                  charDelay={0.03}
                  className="block text-[36px] sm:text-[46px] lg:text-[44px] tracking-[0.1em] text-white/80"
                  style={{ fontFamily: "'Libre Bodoni', serif" }}
                />
              </div>
            </h1>

            {/* Role tag */}
            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.6,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <p className="text-sm tracking-[0.08em] text-white/60 uppercase">
                Junior Software Engineer | Full-Stack Developer
              </p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-14 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
            >
              <div className="relative w-[1px] h-12 bg-white/15 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-white/60"
                  style={{ height: "40%" }}
                  animate={{ y: ["0%", "260%"] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] text-white/25 uppercase">
                Scroll
              </span>
            </motion.div>
          </div>

          {/* RIGHT — photo */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              style={{
                rotateX: imgRotateX,
                rotateY: imgRotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Glow behind photo */}
              <motion.div
                className="absolute inset-0 rounded-[32px] -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scale(1.15)",
                }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Photo */}
              <img
                src={profileImg}
                alt="Susinidu Sachinthana"
                className="relative z-10 h-[340px] sm:h-[420px] lg:h-[520px] w-auto object-contain select-none"
                draggable="false"
              />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-6 z-20 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  delay: 1.5,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(255,255,255,0.25)",
                }}
              >
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-0.5">
                  Based in
                </p>
                <p
                  className="text-sm tracking-wider text-white/80"
                  style={{ fontFamily: "'Libre Bodoni', serif" }}
                >
                  Sri Lanka
                </p>
              </motion.div>

              {/* Tech stack pill */}
              <motion.div
                className="absolute -top-3 -right-4 z-20 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.04 }}
              >
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-0.5">
                  Stack
                </p>
                <p className="text-sm tracking-wider text-white/80">
                  MERN + Spring
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Social icons */}
        <div className="hidden lg:flex flex-col gap-5 absolute right-1 top-1/2 -translate-y-1/2">
          {SOCIALS.map((s, i) => (
            <SocialIcon key={s.label} s={s} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </motion.section>
  );
}
