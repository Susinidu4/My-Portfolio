import { useState, useEffect, useRef, useCallback } from "react";

import cb1 from "../assets/Projects_Images/Chromabloom/chromabloom_1.png";
import cb2 from "../assets/Projects_Images/Chromabloom/chromabloom_2.png";
import cb3 from "../assets/Projects_Images/Chromabloom/chromabloom_3.png";

import sm1 from "../assets/Projects_Images/Serenemind/serenemind_1.jpg";
import sm2 from "../assets/Projects_Images/Serenemind/serenemind_2.jpg";
import sm3 from "../assets/Projects_Images/Serenemind/serenemind_3.jpg";

import ll1 from "../assets/Projects_Images/Learnloop/learnloop_1.jpg";
import ll2 from "../assets/Projects_Images/Learnloop/learnloop_2.jpg";
import ll3 from "../assets/Projects_Images/Learnloop/learnloop_3.jpg";
import ll4 from "../assets/Projects_Images/Learnloop/learnloop_4.jpg";

import hc1 from "../assets/Projects_Images/Herbcare/herbcare_1.jpg";
import hc2 from "../assets/Projects_Images/Herbcare/herbcare_2.jpg";
import hc3 from "../assets/Projects_Images/Herbcare/herbcare_3.jpg";
import hc4 from "../assets/Projects_Images/Herbcare/herbcare_4.jpg";

import mp1 from "../assets/Projects_Images/Medicalpotal/medicalpotal_1.png";
import mp2 from "../assets/Projects_Images/Medicalpotal/medicalpotal_2.png";
import mp3 from "../assets/Projects_Images/Medicalpotal/medicalpotal_3.png";

const projects = [
  {
    id: 1,
    number: "01",
    title: "ChromaBloom",
    subtitle:
      "An AI-Driven Cognitive Support System for Children with Down Syndrome",
    color: "#5B8DEF",
    accent: "#A8C4FF",
    tech: [
      "React.js",
      "Flutter",
      "Node.js",
      "FastAPI",
      "MongoDB",
      "TensorFlow",
      "LightGBM",
    ],
    images: [cb1, cb2, cb3],
    GitHub: "https://github.com/Susinidu4/ChromaBloom_Research_Project.git",
    points: [
      "Developed an AI-powered cognitive support platform to enhance learning and daily routines for children with Down syndrome.",
      "Built a machine learning–based parental stress prediction system using behavioral and digital wellbeing data.",
      "Designed an interactive visual task scheduler (IVTS) with dynamic difficulty adaptation using a LightGBM model.",
      "Implemented a scalable microservices architecture integrating Node.js backend with FastAPI-based ML services.",
      "Engineered cross-platform applications (Flutter + React) with cloud-based media handling and real-time API communication.",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "SereneMind",
    subtitle:
      "A Machine Learning-Based Personalized Mental Health Support Platform",
    color: "#5BD4A4",
    accent: "#9EEFD0",
    tech: ["React.js", "Node.js", "MongoDB", "JWT", "Machine Learning"],
    images: [sm1, sm2, sm3],
    GitHub: "https://github.com/Susinidu4/SereneMind.git",
    points: [
      "Developed a full-stack mental health platform enabling personalized mood tracking, journaling, and AI-driven self-care recommendations.",
      "Implemented a machine learning model to analyze mood patterns and generate adaptive wellness suggestions based on user behavior.",
      "Designed responsive and interactive user interfaces using React.js for journaling, activity tracking, and mental health resource access.",
      "Built secure RESTful APIs with Node.js and Express, integrating JWT-based authentication for role-based user management.",
      "Engineered a scalable system architecture with MongoDB and modular ML integration to support future intelligent features.",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "LearnLoop",
    subtitle: "A Community-Based Skill Sharing & Learning Platform",
    color: "#E8855B",
    accent: "#FFB994",
    tech: ["React.js", "Spring Boot", "MongoDB", "OAuth2", "REST APIs"],
    images: [ll1, ll2, ll3, ll4],
    GitHub: "https://github.com/Susinidu4/LearnLoop.git",
    points: [
      "Developed a full-stack community-driven learning platform enabling users to share knowledge, create structured learning plans, and track progress.",
      "Designed and implemented interactive social features including likes, comments, and real-time notification handling to enhance user engagement.",
      "Built scalable RESTful APIs using Spring Boot, ensuring efficient data handling and seamless frontend-backend communication.",
      "Integrated secure authentication and role-based access control using OAuth 2.0 for user management.",
      "Engineered responsive React.js interfaces for content creation, media sharing, and user interaction workflows.",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "HerbCare",
    subtitle: "A Full-Stack Herbal E-Commerce & Wellness Platform",
    color: "#C47FE8",
    accent: "#DDB3FF",
    tech: ["React.js", "Node.js", "MongoDB", "JWT", "Stripe API"],
    images: [hc1, hc2, hc3, hc4],
    GitHub: "https://github.com/Susinidu4/herb-care.git",
    points: [
      "Developed a full-featured e-commerce platform for herbal products with support for product customization, order management, and secure checkout.",
      "Designed and implemented responsive user interfaces in React.js, focusing on intuitive user experience and seamless navigation.",
      "Built and managed a feedback and complaint handling system, enabling users to submit issues and track resolution workflows.",
      "Integrated secure RESTful APIs using Node.js and Express with JWT-based authentication for role-based access control.",
      "Collaborated on backend modules including inventory management, order processing, and consultation booking features.",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Medical Portal",
    subtitle: "A Web-Based Healthcare Management & Appointment System",
    color: "#F0C040",
    accent: "#FFE08A",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    images: [mp1, mp2, mp3],
    GitHub: "https://github.com/Susinidu4/Medical_Portal_project.git",
    points: [
      "Developed a web-based healthcare management system for handling appointments, doctors, hospitals, and medical centers.",
      "Implemented appointment scheduling workflows, enabling users to book, manage, and track medical consultations efficiently.",
      "Designed and developed modules for doctor, hospital, and medical center management with structured data handling.",
      "Built static and dynamic pages including privacy policy and terms & conditions to ensure compliance and user trust.",
      "Created responsive UI layouts using HTML, CSS, and JavaScript to provide a smooth user experience across pages.",
    ],
  },
];

/* ─── useInView ─────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── 3D tilt hook ──────────────────────────────────────────── */
function use3DTilt(strength = 10) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: { x: 50, y: 50 } });

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({
        x: -dy * strength,
        y: dx * strength,
        shine: {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        },
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  }, []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

/* ─── Clickable stacked image gallery ──────────────────────── */
function MockScreenStack({ color, accent, images = [] }) {
  const [activeImg, setActiveImg] = useState(0);
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    if (images.length <= 1) return;
    setFading(true);
    setTimeout(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
      setFading(false);
    }, 250);
  };

  const offsets = [
    {
      x: "16px",
      y: "12px",
      rotate: "4deg",
      z: -40,
      opacity: 0.45,
      size: "72%",
    },
    { x: "8px", y: "6px", rotate: "2deg", z: -20, opacity: 0.7, size: "80%" },
  ];

  return (
    <div
      className="relative w-full h-52 flex items-center justify-center"
      style={{
        perspective: "600px",
        cursor: images.length > 1 ? "pointer" : "default",
      }}
      onClick={handleClick}
      title={images.length > 1 ? "Click to view next screenshot" : ""}
    >
      {/* Back stacked cards */}
      {offsets.map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: o.size,
            height: i === 0 ? "85%" : "88%",
            borderRadius: "14px",
            border: `1px solid ${color}${i === 0 ? "28" : "40"}`,
            background: `linear-gradient(135deg, ${color}${i === 0 ? "18" : "28"}, ${color}08)`,
            transform: `translateZ(${o.z}px) translateX(${o.x}) translateY(${o.y}) rotate(${o.rotate})`,
            opacity: o.opacity,
            overflow: "hidden",
            transition: "opacity 0.3s ease",
          }}
        >
          {images[activeImg] && (
            <img
              src={images[activeImg]}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.2,
                filter: "blur(3px)",
              }}
            />
          )}
        </div>
      ))}

      {/* Front card — main clickable image */}
      <div
        style={{
          position: "relative",
          width: "84%",
          height: "90%",
          borderRadius: "12px",
          border: `1px solid ${color}55`,
          overflow: "hidden",
          boxShadow: `0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px ${color}22`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {images[activeImg] ? (
          <img
            src={images[activeImg]}
            alt={`Screenshot ${activeImg + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: fading ? 0 : 1,
              transform: fading ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          />
        ) : (
          /* Fallback mockup when no images provided */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${color}35 0%, ${color}12 60%, transparent 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "8px",
                borderRadius: "4px",
                background: `${color}55`,
              }}
            />
            <div style={{ display: "flex", gap: "8px", width: "70%" }}>
              <div
                style={{
                  flex: 1,
                  height: "36px",
                  borderRadius: "6px",
                  background: `${color}33`,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: "36px",
                  borderRadius: "6px",
                  background: `${color}22`,
                }}
              />
            </div>
            <div
              style={{
                width: "70%",
                height: "6px",
                borderRadius: "3px",
                background: `${color}40`,
              }}
            />
            <div
              style={{
                width: "50%",
                height: "6px",
                borderRadius: "3px",
                background: `${color}28`,
                alignSelf: "flex-start",
                marginLeft: "15%",
              }}
            />
            <div
              style={{
                marginTop: "4px",
                width: "40%",
                height: "24px",
                borderRadius: "6px",
                background: `linear-gradient(90deg, ${color}88, ${accent}66)`,
                alignSelf: "flex-start",
                marginLeft: "15%",
              }}
            />
          </div>
        )}

        {/* Image counter badge */}
        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.14)",
              padding: "3px 8px",
              borderRadius: "999px",
              letterSpacing: "0.06em",
            }}
          >
            {activeImg + 1} / {images.length}
          </div>
        )}

        {/* Click-to-advance hint overlay (shows on hover) */}
        {images.length > 1 && (
          <div
            className="img-hint"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0)",
              transition: "background 0.3s ease",
              borderRadius: "12px",
            }}
          >
            <div
              className="img-hint-icon"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transform: "scale(0.8)",
                transition:
                  "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Project Card with 3D tilt ─────────────────────────────── */
function ProjectCard({ project, animating, direction }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt(10);

  return (
    <div
      style={{ perspective: "1200px", width: "100%" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={ref}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          borderRadius: "20px",
          border: `1px solid ${project.color}30`,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}18, inset 0 1px 0 rgba(255,255,255,0.07)`,
          position: "relative",
          overflow: "hidden",
          minHeight: "420px",
        }}
      >
        {/* Mouse shine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            pointerEvents: "none",
            borderRadius: "20px",
            transition: "background 0.1s ease",
          }}
        />

        {/* Top color bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${project.color}, ${project.accent}, transparent)`,
          }}
        />

        {/* Corner glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}18, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          className="p-8 grid grid-cols-2 gap-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* LEFT — info */}
          <div className="flex flex-col gap-5">
            {/* Number + title */}
            <div className="flex items-start gap-4">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "72px",
                  lineHeight: 1,
                  color: project.color,
                  opacity: 0.25,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                  marginTop: "-8px",
                }}
              >
                {project.number}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    margin: "6px 0 0 0",
                    lineHeight: 1.5,
                    maxWidth: "260px",
                  }}
                >
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${project.color}44, transparent)`,
              }}
            />

            {/* Bullet points */}
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {project.points.map((pt, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: project.color,
                      boxShadow: `0 0 6px ${project.color}`,
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.6,
                    }}
                  >
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tech tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "auto",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    color: project.accent,
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}33`,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — image gallery stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <MockScreenStack
              color={project.color}
              accent={project.accent}
              images={project.images || []}
            />
            {project.GitHub && (
              <a
                href={project.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: project.accent,
                  background: `${project.color}18`,
                  border: `1px solid ${project.color}44`,
                  padding: "6px 14px",
                  borderRadius: "999px",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${project.color}30`;
                  e.currentTarget.style.boxShadow = `0 0 12px ${project.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${project.color}18`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Nav tab ────────────────────────────────────────────────── */
function NavTab({ label, active, color, onClick, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active
          ? "#ffffff"
          : hovered
            ? "rgba(255,255,255,0.65)"
            : "rgba(255,255,255,0.35)",
        background: active
          ? `linear-gradient(135deg, ${color}28, ${color}10)`
          : hovered
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)",
        border: active
          ? `1px solid ${color}55`
          : hovered
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(255,255,255,0.08)",
        padding: "10px 20px",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.34,1.1,0.64,1)",
        boxShadow: active ? `0 0 20px ${color}22` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${index * 60}ms`,
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            width: "80%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            borderRadius: "1px",
          }}
        />
      )}
      {label}
    </button>
  );
}

/* ─── Main Section ───────────────────────────────────────────── */
export default function ProjectsSection() {
  const [sectionRef, sectionVisible] = useInView(0.05);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const goTo = (index) => {
    if (index === activeIndex || animating) return;
    setDirection(index > activeIndex ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setDisplayIndex(index);
      setActiveIndex(index);
      setAnimating(false);
    }, 320);
  };

  const prev = () =>
    goTo(activeIndex === 0 ? projects.length - 1 : activeIndex - 1);
  const next = () =>
    goTo(activeIndex === projects.length - 1 ? 0 : activeIndex + 1);

  const project = projects[displayIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-black text-white px-8 py-16 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, ${project.color}0C, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 80%, ${project.color}08, transparent 60%)
          `,
          transition: "background 0.8s ease",
        }}
      />

      {/* Decorative rings */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "-120px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: `1px solid ${project.color}12`,
          transition: "border-color 0.8s ease",
          boxShadow: `inset 0 0 80px ${project.color}08`,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: "-60px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: `1px solid ${project.color}18`,
          transition: "border-color 0.8s ease",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            margin: "0 0 40px 0",
          }}
        >
          Projects
          <div
            style={{
              marginTop: "12px",
              width: "280px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
              boxShadow: "0 0 12px rgba(255,255,255,0.18)",
            }}
          />
        </h2>

        {/* Nav row */}
        <div
          className="flex items-center gap-3 mb-8 flex-wrap"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {projects.map((p, i) => (
            <NavTab
              key={p.id}
              label={`Project ${p.number}`}
              active={activeIndex === i}
              color={p.color}
              onClick={() => goTo(i)}
              index={i}
              visible={sectionVisible}
            />
          ))}

          {/* Next arrow */}
          <button
            onClick={next}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              onClick={() => goTo(i)}
              style={{
                width: activeIndex === i ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  activeIndex === i ? p.color : "rgba(255,255,255,0.15)",
                boxShadow: activeIndex === i ? `0 0 8px ${p.color}88` : "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.34,1.2,0.64,1)",
              }}
            />
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            opacity: sectionVisible ? (animating ? 0 : 1) : 0,
            transform: animating
              ? direction === "next"
                ? "translateX(-40px) rotateY(8deg) scale(0.97)"
                : "translateX(40px) rotateY(-8deg) scale(0.97)"
              : "translateX(0) rotateY(0deg) scale(1)",
            transition:
              "opacity 0.32s ease, transform 0.32s cubic-bezier(0.4,0,0.2,1)",
            perspective: "1200px",
          }}
        >
          <ProjectCard
            project={project}
            animating={animating}
            direction={direction}
          />
        </div>

        {/* Bottom counter + progress bar */}
        <div
          className="flex items-center justify-between mt-6"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <div
            style={{
              width: "60px",
              height: "2px",
              borderRadius: "1px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
                background: `linear-gradient(90deg, ${project.color}, ${project.accent})`,
                borderRadius: "1px",
                transition:
                  "width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Hover hint CSS for image stack */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .img-hint:hover {
          background: rgba(0,0,0,0.15) !important;
        }
        .img-hint:hover .img-hint-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </section>
  );
}
