import React, { Suspense } from "react";
import { useInteraction } from "../../hooks/useInteraction";
import Isotipo from "../brand/Isotipo";

/*
 * Sello Interambiente — diseño original aprobado con el cliente (6-abr-2026,
 * commit c005305): halo de luz WebGL, texto girando pegado al halo y el
 * símbolo en blanco en el centro.
 *
 * Cambios respecto al original, y solo estos:
 *  - El logo antiguo (PNG filtrado a blanco) pasa a ser el isotipo nuevo en su
 *    variante monocroma hueso, como pide el manual 2026 sobre fondo oscuro.
 *    Sin el resplandor (drop-shadow) del original: el manual prohíbe brillos
 *    sobre el símbolo; la luz la pone el halo.
 *  - Las luces del halo usan la paleta 2026 (decisión de Sergio, 22-sep-2026):
 *    los azules del original eran el color de las olas del logo antiguo y
 *    pasan a olivo. Misma animación y mismos parámetros.
 *  - La rotación del texto va empaquetada aquí dentro. Antes dependía de la
 *    clase .spin-anim del CSS de nuestra web, que no viaja en el widget, así
 *    que en las webs de los clientes el texto no giraba.
 */

const LazyPulsingBorder = React.lazy(() =>
  import('@paper-design/shaders-react').then(module => ({ default: module.PulsingBorder }))
);

// Luces del halo con la paleta 2026, en el mismo orden y ritmo que las originales:
// terracota, ocre, olivo, olivo claro, verde oscuro, terracota, ocre.
// Original (abril 2026): #BD5817 #D79410 #2E6B8A #3A8BB2 #624914 #BD5817 #D79410
const HALO_2026 = ["#C1652E", "#D9A441", "#8A9A5B", "#A7B57A", "#2C3A24", "#C1652E", "#D9A441"];

export function SelloCertificado({ isWidget = false, clientName = '', haloColors = HALO_2026 }) {
  const interacted = useInteraction();
  return (
    <a
      href="https://interambientesa.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Interambiente, certificado sostenible"
      style={isWidget ? { position: 'relative', display: 'inline-block', width: '80px', height: '80px', margin: 'auto', cursor: 'pointer', zIndex: 30, textDecoration: 'none', WebkitTapHighlightColor: 'transparent' } : { position: 'absolute', top: 'clamp(5.5rem, 13vh, 7.5rem)', right: '3rem', zIndex: 50, cursor: 'pointer', textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      <style>{`
        @keyframes ia-sello-giro { 100% { transform: rotate(360deg); } }
        .ia-sello-giro { animation: ia-sello-giro 25s linear infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .ia-sello-giro { animation: none; } }
      `}</style>
      <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Skeleton/Static Fallback Circle */}
        {!interacted && (
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid rgba(217, 164, 65, 0.4)',
            boxShadow: '0 0 15px rgba(217, 164, 65, 0.2)'
          }} />
        )}

        {/* Pulsing Border Circle - Lazy Loaded */}
        {interacted && (
          <Suspense fallback={null}>
            <LazyPulsingBorder
              colors={haloColors}
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
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: "scale(1.15)" }}>
          <svg
            className="ia-sello-giro"
            style={{ width: '100%', height: '100%', transformOrigin: 'center' }}
            viewBox="0 0 100 100"
          >
          <defs>
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <text style={{ fontSize: '9px', fill: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-heading), sans-serif', letterSpacing: '1px' }}>
            <textPath href="#circlePath" startOffset="0%" textLength="220">
               {" "}Interambiente Asesores • Certificado Sostenible{clientName ? ` • ${clientName}` : ""} •{" "}
            </textPath>
          </text>
          </svg>
        </div>

        {/* Isotipo Interambiente 2026, monocromo hueso, en el hueco del logo original */}
        <Isotipo
          size={28}
          frame="circle"
          variant="hueso"
          style={{ position: 'absolute', zIndex: 40, pointerEvents: 'none' }}
        />
      </div>
    </a>
  );
}
