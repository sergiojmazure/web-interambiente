/**
 * Sello "Certificado Sostenible" — firma giratoria de Interambiente.
 * Versión sin WebGL: anillo de marca con conic-gradient + texto giratorio
 * en SVG. Ligero y sin dependencias de shaders.
 */
export function SelloCertificado({ isWidget = false, clientName = '' }) {
  const SIZE = 88;

  return (
    <a
      href="https://interambientesa.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Interambiente — Certificado Sostenible"
      style={
        isWidget
          ? { position: 'relative', display: 'inline-block', width: `${SIZE}px`, height: `${SIZE}px`, margin: 'auto', cursor: 'pointer', zIndex: 30, textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }
          : { position: 'absolute', top: 'clamp(5.5rem, 13vh, 7.5rem)', right: 'clamp(1.25rem, 4vw, 3rem)', zIndex: 20, cursor: 'pointer', textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }
      }
    >
      <div style={{ position: 'relative', width: `${SIZE}px`, height: `${SIZE}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Anillo de marca (conic) */}
        <div
          style={{
            position: 'absolute',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'conic-gradient(from 90deg, #A8501E, #C8841C, #3E5A3A, #2E6B8A, #4F90AE, #A8501E)',
            padding: '2px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.28)',
          }}
        >
          {/* Disco interior frosted para legibilidad del logo sobre cualquier foto */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'rgba(20, 28, 18, 0.62)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
        </div>

        {/* Texto giratorio */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'scale(1.16)' }}>
          <svg className="spin-anim" style={{ width: '100%', height: '100%', transformOrigin: 'center' }} viewBox="0 0 100 100">
            <defs>
              <path id="sello-circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <text style={{ fontSize: '8.5px', fill: 'rgba(255,255,255,0.92)', fontFamily: 'var(--font-subtitle), sans-serif', fontWeight: 600, letterSpacing: '1.5px' }}>
              <textPath href="#sello-circle" startOffset="0%" textLength="218">
                {' '}INTERAMBIENTE · CERTIFICADO SOSTENIBLE{clientName ? ` · ${clientName}` : ''} ·{' '}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Logo central */}
        <img
          src={isWidget ? 'https://web-interambiente.vercel.app/logotipo-interambiente.png' : '/logotipo-interambiente.png'}
          alt="Logo Interambiente"
          width="30"
          height="28"
          style={{
            position: 'absolute',
            width: '30px',
            height: 'auto',
            zIndex: 2,
            filter: 'grayscale(100%) brightness(220%) drop-shadow(0 0 5px rgba(255,255,255,0.45))',
            opacity: 0.95,
            pointerEvents: 'none',
          }}
        />
      </div>
    </a>
  );
}
