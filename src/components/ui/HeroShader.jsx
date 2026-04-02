import React, { useRef, Suspense } from "react";
import { useInteraction } from "../../hooks/useInteraction";

const LazyMeshGradient = React.lazy(() => 
  import('@paper-design/shaders-react').then(module => ({ default: module.MeshGradient }))
);

export function ShaderBackground({ children, minHeight = '85vh' }) {
  const containerRef = useRef(null);
  const interacted = useInteraction();

  return (
    <div ref={containerRef} style={{ minHeight, width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* Fallback Static Gradient */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #020617 0%, #BD5817 30%, #2E6B8A 70%, #020617 100%)' }} />

      {/* Lazy Loaded WebGL Shaders (Only after interaction) */}
      {interacted && (
        <Suspense fallback={null}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <LazyMeshGradient
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              colors={["#020617", "#BD5817", "#ffffff", "#2E6B8A", "#624914"]}
              speed={0.3}
              backgroundColor="#020617"
            />
            <LazyMeshGradient
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.6 }}
              colors={["#020617", "#ffffff", "#3A8BB2", "#D79410"]}
              speed={0.2}
              wireframe={true}
              backgroundColor="transparent"
            />
          </div>
        </Suspense>
      )}

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}


