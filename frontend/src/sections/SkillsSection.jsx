import { useState, useEffect, useRef } from "react";
import { FaHtml5, FaJs, FaJava, FaReact, FaNodeJs, FaGithub, FaCss3Alt } from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  // SiFirebase,
  SiEclipseide,
  SiIntellijidea,
  SiAndroidstudio,
  SiPostman,
  SiFigma,
  SiDiagramsdotnet,
  SiFlutter,
  SiSpringboot, 
  SiCloudinary, 
  SiSwagger, 
} from "react-icons/si";

import { MdOutlineCode } from "react-icons/md";

const technicalSkills = [
  {
    id: "programming",
    label: "Programming Languages",
    color: "#FF6B35",
    icons: [
      { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Flutter", icon: <SiFlutter />, color: "#02569B" },
      { name: "React", icon: <FaReact />, color: "#61DAFB" },
      { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
      { name: "Java", icon: <FaJava />, color: "#ED8B00" },
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#00D4AA",
    icons: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      // { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    ],
  },
  {
    id: "ide",
    label: "IDE | Softwares",
    color: "#7C6FF7",
    icons: [
      { name: "VS Code", icon: <MdOutlineCode />, color: "#007ACC" },
      { name: "Eclipse", icon: <SiEclipseide />, color: "#A67CFF" },
      { name: "IntelliJ", icon: <SiIntellijidea />, color: "#FF318C" },
      { name: "Android Studio", icon: <SiAndroidstudio />, color: "#3DDC84" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#FFB830",
    icons: [
      { name: "GitHub", icon: <FaGithub />, color: "#ffffff" },
      { name: "draw.io", icon: <SiDiagramsdotnet />, color: "#F08705" },
      { name: "Figma", icon: <SiFigma />, color: "#A259FF" },
      { name: "Cloudinary", icon: <SiCloudinary />, color: "#3448C5" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
      { name: "Swagger", icon: <SiSwagger />, color: "#85EA2D" },
    ],
  },
];

const otherSkills = [
  "Communication",
  "Team Collaboration",
  "Problem-Solving",
  "Adaptability",
  "Time Management",
  "Critical Thinking",
  "Continuous Learning",
  "Ownership & Accountability",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function IconBadge({ icon, delay = 0, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      title={icon.name}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(14px) scale(0.7)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
      className="relative flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          transform: hovered
            ? "translateY(-4px) scale(1.15)"
            : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 8px 20px ${icon.color}66`
            : "0 2px 8px rgba(0,0,0,0.3)",
          transition:
            "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        }}
        className="w-11 h-11 rounded-xl flex items-center justify-center cursor-default"
      >
        
        <span
          style={{
            fontSize: "22px",
            color: icon.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon.icon}
        </span>
      </div>
      <div
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(4px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
        className="absolute -top-9 left-1/2 bg-white/10 backdrop-blur-md border border-white/20
          text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-20"
      >
        {icon.name}
      </div>
    </div>
  );
}

function SkillRow({ skill, index, expanded }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 100;

  return (
    <div
      style={{
        opacity: expanded ? 1 : 0,
        transform: expanded
          ? "translateX(0) scaleX(1)"
          : "translateX(-30px) scaleX(0.97)",
        transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.5s cubic-bezier(0.34,1.1,0.64,1) ${delay}ms`,
        pointerEvents: expanded ? "auto" : "none",
      }}
      className="flex items-stretch gap-0"
    >
      {/* Dot */}
      <div className="flex flex-col items-center w-6 flex-shrink-0">
        <div
          style={{
            background: skill.color,
            boxShadow: expanded ? `0 0 10px ${skill.color}88` : "none",
            transform: expanded ? "scale(1)" : "scale(0)",
            transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay + 100}ms, box-shadow 0.4s ease`,
          }}
          className="w-2.5 h-2.5 rounded-full mt-7 flex-shrink-0 z-10"
        />
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderColor: hovered ? skill.color + "66" : "rgba(255,255,255,0.07)",
          boxShadow: hovered ? `0 0 40px ${skill.color}22` : "none",
          background: hovered
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)",
          transition:
            "border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
        }}
        className="flex-1 border rounded-2xl px-6 py-5 flex items-center gap-5 cursor-default ml-4"
      >
        <div className="flex-shrink-0 w-44">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
              transition: "color 0.3s ease",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {skill.label}
          </span>
        </div>
        <div
          style={{
            background: hovered ? skill.color : "rgba(255,255,255,0.12)",
            transition: "background 0.4s ease",
          }}
          className="w-px self-stretch flex-shrink-0"
        />
        <div className="flex items-center gap-3 flex-wrap">
          {skill.icons.map((icon, i) => (
            <IconBadge
              key={icon.name}
              icon={icon}
              delay={expanded ? delay + 180 + i * 55 : 0}
              visible={expanded}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OtherSkillPill({ label, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.92)",
        transition: `opacity 0.5s ease ${index * 70 + 200}ms, transform 0.5s cubic-bezier(0.34,1.2,0.64,1) ${index * 70 + 200}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          border: hovered
            ? "1px solid rgba(255,255,255,0.4)"
            : "1px solid rgba(255,255,255,0.14)",
          background: hovered
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.04)",
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s ease",
        }}
        className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default"
      >
        {label}
      </div>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SkillsSection() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [otherRef, otherVisible] = useInView(0.2);
  const [techExpanded, setTechExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
  if (contentRef.current) {
    setContentHeight(contentRef.current.scrollHeight);
  }
}, [techExpanded]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen bg-black text-white px-8 py-16 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #ffffff, transparent 30%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, #7C6FF720, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Expanding glow when open */}
      <div
        className="pointer-events-none absolute top-24 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, #FF6B3512, transparent 70%)",
          filter: "blur(80px)",
          opacity: techExpanded ? 1 : 0,
          transform: techExpanded ? "scale(1.4)" : "scale(0.7)",
          transition:
            "opacity 0.9s ease, transform 0.9s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(-24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            letterSpacing: "0.06em",
          }}
          className="text-5xl font-light uppercase mb-12"
        >
          Skills
          <div
            style={{
              marginTop: "16px",
              width: "160px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
              boxShadow: "0 0 12px rgba(255,255,255,0.18)",
            }}
          />
        </h2>

        {/* ── TECHNICAL SKILLS ── */}
        <div
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          {/* Clickable header */}
          <button
            onClick={() => setTechExpanded((v) => !v)}
            className="w-full flex items-center gap-3 mb-4 cursor-pointer group"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.18em",
                color: techExpanded
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.4)",
                fontSize: "11px",
                margin: 0,
                transition: "color 0.4s ease",
              }}
              className="uppercase flex-shrink-0"
            >
              Technical Skills
            </p>

            {/* Growing line */}
            <div
              style={{
                height: "1px",
                flex: 1,
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.2), transparent)",
                transformOrigin: "left",
                transform: techExpanded ? "scaleX(1)" : "scaleX(0.3)",
                opacity: techExpanded ? 1 : 0.4,
                transition:
                  "transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
              }}
            />

            {/* Pill badge */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: techExpanded
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.25)",
                border: techExpanded
                  ? "1px solid rgba(255,255,255,0.2)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: techExpanded
                  ? "rgba(255,255,255,0.06)"
                  : "transparent",
                transition: "all 0.4s ease",
                padding: "3px 10px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
              }}
            >
              {techExpanded
                ? "collapse"
                : `${technicalSkills.length} categories`}
            </div>

            <div
              style={{
                color: techExpanded
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.25)",
                transition: "color 0.4s ease",
              }}
            >
              <Chevron open={techExpanded} />
            </div>
          </button>

          {/* Collapsed summary bar */}
          <div
            style={{
              maxHeight: techExpanded ? "0px" : "80px",
              opacity: techExpanded ? 0 : 1,
              overflow: "hidden",
              pointerEvents: techExpanded ? "none" : "auto",
              transition: techExpanded
                ? "max-height 0.4s ease, opacity 0.2s ease"
                : "max-height 0.5s ease 0.1s, opacity 0.4s ease 0.15s",
            }}
          >
            <button
              onClick={() => setTechExpanded(true)}
              className="w-full cursor-pointer mb-1"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <div
                className="flex items-center gap-4 px-5 py-3.5 rounded-2xl border"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="flex items-center gap-2">
                  {technicalSkills.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        background: s.color,
                        boxShadow: `0 0 7px ${s.color}55`,
                      }}
                      className="w-2 h-2 rounded-full"
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "13px",
                  }}
                >
                  {technicalSkills.reduce((a, s) => a + s.icons.length, 0)}{" "}
                  technologies across {technicalSkills.length} categories
                </span>
                <div
                  className="ml-auto"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  <Chevron open={false} />
                </div>
              </div>
            </button>
          </div>

          {/* Expanded content */}
          <div
            style={{
              maxHeight: techExpanded ? `${contentHeight + 32}px` : "0px",
              opacity: techExpanded ? 1 : 0,
              overflow: "visible",
              transition: techExpanded
                ? "max-height 0.75s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease 0.1s"
                : "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
            }}
          >
            <div ref={contentRef} className="pt-1 pb-4">
              <div className="flex gap-0">
                {/* Rail */}
                <div className="flex flex-col items-center w-6 flex-shrink-0">
                  <div
                    style={{
                      height: techExpanded ? "100%" : "0%",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.04))",
                      transition: "height 1s cubic-bezier(0.4,0,0.2,1) 0.15s",
                    }}
                    className="w-px flex-1"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  {technicalSkills.map((skill, i) => (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      index={i}
                      expanded={techExpanded}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── OTHER SKILLS (unchanged) ── */}
        <div ref={otherRef} className="mt-14">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              opacity: otherVisible ? 1 : 0,
              transform: otherVisible ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
            className="uppercase mb-8"
          >
            Other Skills
          </p>
          <div className="flex flex-wrap gap-3">
            {otherSkills.map((label, i) => (
              <OtherSkillPill
                key={label}
                label={label}
                index={i}
                visible={otherVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}
