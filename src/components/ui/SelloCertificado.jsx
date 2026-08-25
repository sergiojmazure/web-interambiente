import Isotipo from '../brand/Isotipo';

/**
 * Sello "Aliados en sostenibilidad".
 *
 * Respeta los don'ts del manual: el isotipo va en su variante monocroma
 * hueso sobre verde oscuro, sin sombras, degradados, contornos ni brillos,
 * y con área de respeto libre alrededor. El anillo de texto es un elemento
 * independiente, nunca se superpone al símbolo.
 */
export function SelloCertificado({ isWidget = false, clientName = '' }) {
  const SIZE = 92;

  return (
    <a
      href="https://interambientesa.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Interambiente — Aliados en sostenibilidad"
      style={
        isWidget
          ? { position: 'relative', display: 'inline-block', width: `${SIZE}px`, height: `${SIZE}px`, margin: 'auto', cursor: 'pointer', zIndex: 30, textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }
          : { position: 'absolute', top: 'clamp(5.5rem, 13vh, 7.5rem)', right: 'clamp(1.25rem, 4vw, 3rem)', zIndex: 20, cursor: 'pointer', textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }
      }
    >
      <div style={{ position: 'relative', width: `${SIZE}px`, height: `${SIZE}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Disco de marca en verde oscuro: fondo sólido, sin efectos */}
        <div
          style={{
            position: 'absolute',
            width: '66px',
            height: '66px',
            borderRadius: '50%',
            background: '#2C3A24',
            border: '1px solid rgba(247, 244, 240, 0.22)',
          }}
        />

        {/* Isotipo monocromo hueso, con su área de respeto libre */}
        <Isotipo size={30} variant="hueso" style={{ position: 'relative', zIndex: 2 }} />

        {/* Anillo de texto, fuera del área del símbolo */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <svg className="spin-anim" style={{ width: '100%', height: '100%', transformOrigin: 'center' }} viewBox="0 0 100 100">
            <defs>
              <path id="sello-circle" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
            </defs>
            <text
              style={{
                fontSize: '7.6px',
                fill: '#F7F4F0',
                fontFamily: 'var(--font-display), sans-serif',
                fontWeight: 600,
                letterSpacing: '2.2px',
                textTransform: 'uppercase',
              }}
            >
              <textPath href="#sello-circle" startOffset="0%" textLength="248">
                {' '}Interambiente · Aliados en sostenibilidad{clientName ? ` · ${clientName}` : ''} ·{' '}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </a>
  );
}
