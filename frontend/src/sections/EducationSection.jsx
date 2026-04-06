import React, { useEffect, useMemo, useRef, useState } from "react";
import education from "../assets/Education_Section.jpg";

const educationData = [
  {
    id: 1,
    left: "BSc (Hons) Information Technology\n(Special)",
    right:
      "Sri Lanka Institute of Information Technology (SLIIT)\n2022 June - 2026 June",
  },
  {
    id: 2,
    left: "HND in Information Technology\n(Special)",
    right:
      "Sri Lanka Institute of Information Technology (SLIIT)\n2022 June - 2024 June",
  },
  {
    id: 3,
    left: "Computer Hardware Technician\n(NVQ Level 4)",
    right:
      "Department of Technical Education & Training - Sri Lanka\n2022 December",
  },
  {
    id: 4,
    left: "Aquinas Diploma in English\n(Intermediate)",
    right:
      "Joseph Vas Institute - Catholic Diocese of Kurunegala\n2022 January",
  },
  {
    id: 5,
    left: "GCE Advanced Level\nGCE Ordinary Level",
    right: "Sandalanka Central College - Kurunegala\n2020 October",
  },
];

export default function EducationSection() {
  const lineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [handleY, setHandleY] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);

  const itemPositions = useMemo(() => {
    const top = 20;
    const gap = 110;
    return educationData.map((_, index) => top + index * gap);
  }, []);

  useEffect(() => {
    setHandleY(itemPositions[0]);
  }, [itemPositions]);

  // Track index changes for exit animation
  useEffect(() => {
    if (prevActiveIndex !== activeIndex) {
      setPrevActiveIndex(activeIndex);
    }
  }, [activeIndex]);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Normalized 0→1 progress along the timeline
  const progress =
    itemPositions.length > 1
      ? (handleY - itemPositions[0]) /
        (itemPositions[itemPositions.length - 1] - itemPositions[0])
      : 0;

  const updateFromClientY = (clientY) => {
    if (!lineRef.current) return;
    const rect = lineRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const minY = itemPositions[0];
    const maxY = itemPositions[itemPositions.length - 1];
    const safeY = clamp(relativeY, minY, maxY);
    setHandleY(safeY);

    let nearestIndex = 0;
    let nearestDistance = Math.abs(safeY - itemPositions[0]);
    for (let i = 1; i < itemPositions.length; i++) {
      const distance = Math.abs(safeY - itemPositions[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    setActiveIndex(nearestIndex);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateFromClientY(e.clientY);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateFromClientY(e.touches[0].clientY);
  };

  useEffect(() => {
    const onMouseMove = (e) => { if (isDragging) updateFromClientY(e.clientY); };
    const onTouchMove = (e) => { if (isDragging) updateFromClientY(e.touches[0].clientY); };
    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, itemPositions]);

  // Parallax background position based on progress
  const bgPosY = 45 + progress * 10; // shifts from 45% to 55%
  const bgScale = isDragging ? 1.07 : 1.04 + progress * 0.03;

  // Filled line height
  const filledLineTop = itemPositions[0];
  const filledLineHeight = handleY - itemPositions[0];

  return (
    <section
      id="education"
      style={{
        background: "#000",
        backgroundImage: `
          radial-gradient(circle at ${50 + progress * 10}% ${40 + progress * 20}%, rgba(255,255,255,0.08), transparent 45%),
          linear-gradient(rgba(0,0,0,0.80), rgba(0,0,0,0.78)),
          url(${education})
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `center ${bgPosY}%`,
        backgroundSize: `${Math.round(bgScale * 48)}%`,
        color: "#fff",
        minHeight: "100vh",
        padding: "0px 0px 50px",
        fontFamily: "'Inter', sans-serif",
        transition: isDragging
          ? "background-position 0.12s ease, background-size 0.25s ease"
          : "background-position 0.55s cubic-bezier(0.25,0.46,0.45,0.94), background-size 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
        overflow: "hidden",
      }}
    >
      {/* Vignette overlay that shifts with progress */}
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          background: `radial-gradient(ellipse 80% 70% at ${50 + progress * 15}% ${30 + progress * 40}%, transparent 30%, rgba(0,0,0,0.55) 100%)`,
          transition: isDragging
            ? "background 0.1s ease"
            : "background 0.5s ease",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "48px",
            fontWeight: 400,
            letterSpacing: "0.03em",
            margin: "0 0 90px 80px",
            textTransform: "uppercase",
            // Subtle shimmer on heading tied to progress
            textShadow: `0 0 ${20 + progress * 30}px rgba(255,255,255,${0.08 + progress * 0.12})`,
            transition: "text-shadow 0.4s ease",
          }}
        >
          Education

          <div
            style={{
              marginTop: "8px",
              width: "270px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
              boxShadow: "0 0 12px rgba(255,255,255,0.18)",
            }}
          />
        </h2>
        

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 80px 1fr",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT SIDE ── */}
          <div style={{ position: "relative", minHeight: "700px" }}>
            {educationData.map((item, index) => {
              const active = activeIndex === index;
              // Slide-in from right when becoming active
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    top: `${itemPositions[index]}px`,
                    right: "0",
                    width: "100%",
                    transform: `translateY(-50%) translateX(${active ? 0 : 6}px)`,
                    textAlign: "right",
                    paddingRight: "20px",
                    transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), color 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.35s ease, font-size 0.3s ease",
                    opacity: active ? 1 : 0.22,
                    color: active ? "#ffffff" : "rgba(255,255,255,0.4)",
                    textShadow: active
                      ? "0 0 24px rgba(255,255,255,0.22), 0 2px 8px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      whiteSpace: "pre-line",
                      fontSize: active ? "16px" : "14px",
                      lineHeight: 1.25,
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {item.left}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ── CENTER LINE + HANDLE ── */}
          <div
            ref={lineRef}
            style={{
              position: "relative",
              height: "700px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Top dot */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: `${itemPositions[0]}px`,
                transform: "translate(-50%, -50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                transition: "box-shadow 0.4s ease",
                zIndex: 2,
              }}
            />

            {/* Unfilled (dim) track */}
            <div
              style={{
                position: "absolute",
                top: `${itemPositions[0]}px`,
                bottom: `${700 - itemPositions[itemPositions.length - 1]}px`,
                width: "2px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.15)",
              }}
            />

            {/* Filled (bright) track — grows with handle */}
            <div
              style={{
                position: "absolute",
                top: `${filledLineTop}px`,
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: `${filledLineHeight}px`,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.55))",
                boxShadow: `0 0 ${6 + progress * 10}px rgba(255,255,255,${0.3 + progress * 0.3})`,
                transition: isDragging
                  ? "height 0.05s linear, box-shadow 0.15s ease"
                  : "height 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease",
                zIndex: 1,
              }}
            />

            {/* Ripple ring on active snap (CSS keyframe via inline style) */}
            <div
              key={activeIndex} // remounts on index change → re-triggers animation
              style={{
                position: "absolute",
                left: "50%",
                top: `${handleY}px`,
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.5)",
                animation: "rippleOut 0.6s cubic-bezier(0.4,0,0.2,1) forwards",
                pointerEvents: "none",
                zIndex: 4,
                transition: isDragging ? "none" : "top 0.25s ease",
              }}
            />

            {/* Bottom dot */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: `${itemPositions[itemPositions.length - 1]}px`,
                transform: "translate(-50%, -50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                zIndex: 2,
              }}
            />

            {/* Draggable handle */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                position: "absolute",
                left: "50%",
                top: `${handleY}px`,
                transform: `translate(-50%, -50%) scaleY(${isDragging ? 1.15 : 1})`,
                width: "20px",
                height: "50px",
                borderRadius: "14px",
                background: isDragging
                  ? "linear-gradient(160deg, #ffffff 0%, #d8d8d8 100%)"
                  : "linear-gradient(160deg, #f5f5f5 0%, #c8c8c8 100%)",
                boxShadow: isDragging
                  ? `0 0 28px rgba(255,255,255,0.55), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)`
                  : `0 0 14px rgba(255,255,255,0.22), inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.2)`,
                cursor: isDragging ? "grabbing" : "grab",
                transition: isDragging
                  ? "box-shadow 0.15s ease, transform 0.15s ease"
                  : "top 0.25s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                zIndex: 5,
              }}
            >
              {/* Grip lines inside handle */}
              {[0, 6, 12].map((offset) => (
                <div
                  key={offset}
                  style={{
                    position: "absolute",
                    top: `${16 + offset}px`,
                    left: "4px",
                    right: "4px",
                    height: "1px",
                    background: "rgba(0,0,0,0.18)",
                    borderRadius: "1px",
                  }}
                />
              ))}

              {/* Bottom pin */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  height: "12px",
                  background: isDragging ? "rgba(255,255,255,0.9)" : "#fff",
                  transition: "background 0.3s ease",
                  boxShadow: isDragging ? "0 0 6px rgba(255,255,255,0.6)" : "none",
                }}
              />
            </div>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div style={{ position: "relative", minHeight: "700px" }}>
            {educationData.map((item, index) => {
              const active = activeIndex === index;
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    top: `${itemPositions[index]}px`,
                    left: "0",
                    width: "100%",
                    transform: `translateY(-50%) translateX(${active ? 0 : -6}px)`,
                    paddingLeft: "20px",
                    transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), color 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.35s ease, font-size 0.3s ease",
                    opacity: active ? 1 : 0.22,
                    color: active ? "#ffffff" : "rgba(255,255,255,0.4)",
                    textShadow: active
                      ? "0 0 24px rgba(255,255,255,0.22), 0 2px 8px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      whiteSpace: "pre-line",
                      fontSize: active ? "16px" : "14px",
                      lineHeight: 1.3,
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {item.right}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rippleOut {
          0%   { opacity: 0.7; transform: translate(-50%, -50%) scale(0.6); }
          60%  { opacity: 0.3; transform: translate(-50%, -50%) scale(1.4); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(1.9); }
        }

        @media (max-width: 900px) {
          #education .education-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}