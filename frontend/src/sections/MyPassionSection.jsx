import mypassionimg from "../assets/mypassion_section.jpg";
import { useState, useEffect } from "react";

import passion1 from "../assets/Passion/passion_1.1.jpg";
import passion2 from "../assets/Passion/passion_1.2.jpg";
import passion3 from "../assets/Passion/passion_2.2.jpg";
import passion4 from "../assets/Passion/passion_3.1.jpg";
import passion5 from "../assets/Passion/passion_3.2.jpg";
import passion6 from "../assets/Passion/passion_4.1.jpg";
import passion7 from "../assets/Passion/passion_4.2.jpg";
import passion8 from "../assets/Passion/passion_5.1.jpg";
import passion9 from "../assets/Passion/passion_5.2.jpg";
import passion10 from "../assets/Passion/passion_6.1.jpg";
import passion11 from "../assets/Passion/passion_6.2.jpg";
import passion12 from "../assets/Passion/passion_7.jpg";
import passion13 from "../assets/Passion/passion_8.jpg";
import passion14 from "../assets/Passion/passion_9.jpg";
import passion15 from "../assets/Passion/passion_10.1.jpg";
import passion16 from "../assets/Passion/passion_10.2.jpg";
import passion17 from "../assets/Passion/passion_2.1.jpg";

const passions = [
  { id: 1, image: passion13, thumb: passion13, accent: "#ffffff" },
  { id: 2, image: passion2, thumb: passion1, accent: "#ffffff" },
  { id: 3, image: passion11, thumb: passion10, accent: "#ffffff" },
  { id: 4, image: passion17, thumb: passion3, accent: "#ffffff" },
  { id: 5, image: passion12, thumb: passion12, accent: "#ffffff" },
  { id: 6, image: passion7, thumb: passion6, accent: "#ffffff" },
  { id: 7, image: passion14, thumb: passion14, accent: "#ffffff" },
  { id: 8, image: passion5, thumb: passion4, accent: "#ffffff" },
  { id: 9, image: passion16, thumb: passion15, accent: "#ffffff" },
  { id: 10, image: passion9, thumb: passion8, accent: "#ffffff" },
];

function Modal({ passion, onClose }) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setVis(true)),
    );
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setVis(false);
    setTimeout(onClose, 600);
  };

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: vis ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0)",
        backdropFilter: vis ? "blur(18px)" : "blur(0px)",
        transition: "background 0.6s ease, backdrop-filter 0.6s ease",
      }}
    >
      {/* Close button */}
      <button
        onClick={close}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.75)",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s",
          zIndex: 10000,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(0,0,0,0.5)")
        }
      >
        ✕
      </button>

      {/* Image — natural size, capped to viewport */}
      <img
        src={passion.image}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "block",
          maxWidth: "min(95vw, 1200px)",
          maxHeight: "90vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: "10px",
          border: "0.5px solid rgba(255,255,255,0.08)",
          opacity: vis ? 1 : 0,
          transform: vis ? "scale(1)" : "scale(0.93)",
          transition:
            "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

function Card({ passion, index, isVisible, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(passion)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
        overflow: "hidden",
        width: "clamp(72px,8.2vw,105px)",
        height: "clamp(200px,26vw,320px)",
        borderRadius: "15px",
        border: hov
          ? `0.5px solid ${passion.accent}55`
          : "0.5px solid rgba(255,255,255,0.07)",
        background: "#040404",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(65px)",
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${index * 0.065}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 0.065}s, border 0.4s ease`,
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${passion.thumb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: hov ? 0.99 : 0.52,
          transform: hov ? "scale(1.09)" : "scale(1)",
          filter: hov ? "none" : "grayscale(55%)",
          transition:
            "opacity 0.75s ease, transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.75s ease",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hov
            ? "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.04) 100%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          transition: "background 0.55s ease",
          borderRadius: "15px",
        }}
      />

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: passion.accent,
          transform: `scaleX(${hov ? 1 : 0})`,
          transformOrigin: "center",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
      />

      {/* Top dot */}
      <div
        style={{
          position: "absolute",
          top: "13px",
          left: "50%",
          transform: `translateX(-50%) scale(${hov ? 1 : 0})`,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: passion.accent,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
        }}
      />

      {/* Play icon */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) scale(${hov ? 1 : 0.5})`,
          opacity: hov ? 0.55 : 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1px solid ${passion.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderLeft: `6px solid ${passion.accent}`,
            marginLeft: "2px",
          }}
        />
      </div>
    </div>
  );
}

export default function MyPassion() {
  const [isVisible, setIsVisible] = useState(false);
  const [hrVisible, setHrVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setTimeout(() => setHrVisible(true), 350);
    setTimeout(() => setIsVisible(true), 650);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');*{box-sizing:border-box}`}</style>
      <section
        id="mypassion"
        className="relative w-full bg-black"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "clamp(38px,6vh,75px)",
          paddingLeft: "clamp(14px,3vw,40px)",
          paddingRight: "clamp(14px,3vw,40px)",
          paddingBottom: 0,
          overflow: "hidden",
          fontFamily: "'Cormorant Garamond',serif",
        }}
      >
        {/* HR */}
        <div
          style={{
            width: hrVisible ? "min(840px,90vw)" : "0",
            height: "0.5px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "width 1.6s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "34px",
            flexShrink: 0,
          }}
        />

        {/* Title */}
        <div
          style={{
            marginBottom: "clamp(28px,5vh,52px)",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              letterSpacing: "0.58em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
              margin: "0 0 13px",
              opacity: hrVisible ? 1 : 0,
              transform: hrVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 1s ease 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            My Passion
            <div
              style={{
                marginTop: "16px",
                width: "480px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
                boxShadow: "0 0 12px rgba(255,255,255,0.18)",
              }}
            />
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "clamp(6px,0.85vw,12px)",
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1280px",
            flexShrink: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          {passions.map((p, i) => (
            <Card
              key={p.id}
              passion={p}
              index={i}
              isVisible={isVisible}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* Background image */}
        <img
          src={mypassionimg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-8%",
            left: "15%",
            width: "clamp(1480px, 320vw, 480px)",
            height: "clamp(580px, 32vw, 480px)",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
            filter: "brightness(1.11) contrast(0.99)",
            zIndex: 0,
          }}
        />
      </section>

      {selected && (
        <Modal passion={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
