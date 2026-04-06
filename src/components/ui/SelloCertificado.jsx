import React, { Suspense } from "react";
import { useInteraction } from "../../hooks/useInteraction";

const LazyPulsingBorder = React.lazy(() => 
  import('@paper-design/shaders-react').then(module => ({ default: module.PulsingBorder }))
);

export function SelloCertificado({ isWidget = false, clientName = '' }) {
  const interacted = useInteraction();
  return (
    <a 
      href="https://web-interambiente.vercel.app" 
      target="_blank" 
      rel="noopener noreferrer"
      style={isWidget ? { position: 'relative', display: 'inline-block', width: '80px', height: '80px', margin: 'auto', cursor: 'pointer', zIndex: 30, textDecoration: 'none', WebkitTapHighlightColor: 'transparent' } : { position: 'absolute', bottom: '2rem', right: '3rem', zIndex: 50, cursor: 'pointer', textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Skeleton/Static Fallback Circle */}
        {!interacted && (
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid rgba(215, 148, 16, 0.4)',
            boxShadow: '0 0 15px rgba(215, 148, 16, 0.2)'
          }} />
        )}

        {/* Pulsing Border Circle - Lazy Loaded */}
        {interacted && (
          <Suspense fallback={null}>
            <LazyPulsingBorder
              colors={["#BD5817", "#D79410", "#2E6B8A", "#3A8BB2", "#624914", "#BD5817", "#D79410"]}
              colorBack="#00000000"
              speed={1.5}
              roundness={1}
              thickness={0.1}
              softness={0.2}
              intensity={5}
              spotsPerColor={5}
              spotSize={0.1}
              pulse={0.1}
              smoke={0.5}
              smokeSize={4}
              scale={0.65}
              rotation={0}
              frame={9161408.25}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                position: "absolute"
              }}
            />
          </Suspense>
        )}

        {/* Rotating Text Around the Pulsing Border */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: "scale(1.8)" }}>
          <svg
            className="spin-anim"
            style={{ width: '100%', height: '100%', transformOrigin: 'center' }}
            viewBox="0 0 100 100"
          >
          <defs>
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <text style={{ fontSize: '9px', fill: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-heading), sans-serif', letterSpacing: '1px' }}>
            <textPath href="#circlePath" startOffset="0%" textLength={clientName ? "280" : "210"}>
               {"\u00A0"}Interambiente Asesores • Certificado Sostenible{clientName ? ` • ${clientName}` : ""} •{"\u00A0"}
            </textPath>
          </text>
          </svg>
        </div>

        {/* Logo Central Interambiente */}
        {/* Aplicamos filtros para volverlo blanco/monocromo y que empate con la estética limpia del halo */}
        <img 
          src={isWidget ? "https://web-interambiente.vercel.app/logotipo-interambiente.png" : "/logotipo-interambiente.png"} 
          alt="Logo Interambiente" 
          style={{
            position: 'absolute',
            width: '28px',
            height: 'auto',
            zIndex: 40,
            filter: 'grayscale(100%) brightness(200%) drop-shadow(0px 0px 4px rgba(255,255,255,0.4))',
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />
      </div>
    </a>
  );
}
