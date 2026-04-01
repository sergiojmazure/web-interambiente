import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ShaderBackground({ children }) {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '85vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* SVG Filters */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MeshGradient
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          colors={["#020617", "#BD5817", "#ffffff", "#2E6B8A", "#624914"]}
          speed={0.3}
          backgroundColor="#020617"
        />
        <MeshGradient
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.6 }}
          colors={["#020617", "#ffffff", "#3A8BB2", "#D79410"]}
          speed={0.2}
          wireframe={true}
          backgroundColor="transparent"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}


