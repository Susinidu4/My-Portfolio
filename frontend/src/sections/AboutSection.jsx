import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";

/* ── Animated counter ── */
function Counter({ to, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Stat card ── */
function StatCard({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className="relative w-[150px] overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      {/* shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
      />
      <p className="relative text-3xl font-light text-white tracking-tight" style={{ fontFamily: "'Libre Bodoni', serif" }}>
        <Counter to={value} suffix={suffix} delay={delay + 0.3} />
      </p>
      <p className="relative mt-1 text-xs tracking-[0.22em] text-white/35 uppercase">{label}</p>
    </motion.div>
  );
}

/* ── Paragraph reveal ── */
function RevealPara({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.p
      ref={ref}
      className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-white/65"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.p>
  );
}

/* ── Horizontal marquee skill strip ── */
const SKILLS = ["React", "Node.js", "MongoDB", "Spring Boot", "Flutter", "TypeScript", "Next.js", "Express", "PostgreSQL", "Tailwind CSS"];

function SkillStrip() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <div className="relative overflow-hidden mt-10 py-3 border-y border-white/6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-3 text-[11px] tracking-[0.25em] text-white/30 uppercase">
            <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
            {s}
          </span>
        ))}
      </motion.div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-24 min-h-screen"
    >
      {/* Parallax background texture */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
      >
        <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[100px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[80px]" />
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">

        {/* Main card */}
        <motion.div
          className="relative overflow-hidden rounded-[40px]"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.07) 0%, transparent 55%), linear-gradient(160deg, #111111 0%, #060606 100%)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)",
          }}
          whileHover={{
            boxShadow: "0 50px_120px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(255,255,255,0.14), 0 0 40px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          {/* Inner shimmer line */}
          <div className="pointer-events-none absolute inset-0 rounded-[40px]"
            style={{ boxShadow: "inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -2px 8px rgba(0,0,0,0.8)" }}
          />
          {/* Top-left highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[40px]"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%)", opacity: 0.4 }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-10 sm:p-14 lg:p-16 pb-0">

            {/* LEFT column */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">

                {/* Heading */}
                <div ref={headingRef} className="overflow-hidden">
                  <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[0.9] tracking-tight"
                    style={{ fontFamily: "'Libre Bodoni', serif" }}
                    initial={{ y: 80, opacity: 0 }}
                    animate={headingInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    MY<br />
                    <motion.span
                      initial={{ y: 80, opacity: 0 }}
                      animate={headingInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      BIOGRAPHY
                    </motion.span>
                  </motion.h2>
                </div>

                {/* Divider */}
                <motion.div
                  className="mt-6 h-[1px] bg-gradient-to-r from-white/30 to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={headingInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Resume button */}
                <motion.a
                  href="/Susinidu_Sachinthana_Resume.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm tracking-[0.15em] text-white uppercase backdrop-blur-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                    boxShadow: "0 12px_32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 6px rgba(0,0,0,0.5)",
                    fontFamily: "'Libre Bodoni', serif",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={headingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 20px_40px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.3)" }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  Resume
                  <motion.span
                    className="flex items-center"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiDownload className="opacity-80" />
                  </motion.span>
                </motion.a>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <StatCard value={6} suffix="+" label="Month exp." delay={0.5} />
                  <StatCard value={10} suffix="+" label="Projects" delay={0.6} />
                </div>
              </div>
            </div>

            {/* RIGHT column */}
            <div className="lg:col-span-7 flex flex-col pb-14 sm:pb-16 lg:pb-8">

              {/* Vertical line accent */}
              <motion.div
                className="hidden lg:block absolute left-[41.2%] top-14 bottom-14 w-[0.5px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="space-y-6 lg:pl-10">
                {/* First para — brighter */}
                <motion.p
                  className="text-[16px] sm:text-[17px] leading-7 sm:leading-8 text-white/85"
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  I'm an Information Technology undergraduate at{" "}
                  <span className="text-white border-b border-white/20 pb-[1px]">
                    Sri Lanka Institute of Information Technology (SLIIT){" "}  
                  </span>
                  and aspiring Software Engineer, along with 6 months internship experience at{" "} 
                  <span className="text-white border-b border-white/20 pb-[1px]">
                  Sri Lanka Telecom PLC{" "}
                  </span>
                  which I contributed to enterprise-level systems.
                </motion.p>

                <RevealPara delay={0.2}>
                  I believe that great software is not only functional but also intuitive, seamless, 
                  and meaningful to its users. Every project I build reflects my commitment to quality, 
                  performance, and continuous improvement.
                </RevealPara>

                <RevealPara delay={0.3}>
                  I am continuously exploring new technologies and pushing my limits to grow as a Software Engineer, 
                  with the goal of delivering solutions that create real value and lasting impact.
                </RevealPara>

                {/* Skill strip */}
                <SkillStrip />

                {/* CTA link */}
                <motion.div
                  className="flex items-center gap-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.a
                    href="#projects"
                    className="group flex items-center gap-2 text-[11px] tracking-[0.3em] text-white/35 uppercase hover:text-white/70 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    View Projects
                    <FiArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}