import Isotipo from './Isotipo';

/**
 * Sistema de logo Interambiente (manual de marca 2026).
 *
 * orientation: 'horizontal' (isotipo + wordmark) · 'vertical' (isotipo sobre wordmark)
 * theme:       'light' (sobre blanco hueso) · 'dark' (sobre verde oscuro #2C3A24)
 *
 * El área de respeto equivale al radio de un pétalo; se aplica como padding
 * proporcional para que nada invada el conjunto.
 */
export default function Logo({
  orientation = 'horizontal',
  theme = 'light',
  size = 40,
  showTagline = true,
  showPillars = false,
  className = '',
  style = {},
}) {
  const dark = theme === 'dark';
  const wordColor = dark ? '#F7F4F0' : '#C1652E';
  const tagColor = dark ? '#D9A441' : '#C1652E';
  const pillarColor = dark ? 'rgba(247,244,240,0.62)' : 'rgba(44,44,44,0.62)';
  const vertical = orientation === 'vertical';

  const wordSize = vertical ? size * 0.62 : size * 0.72;
  const tagSize = Math.max(8.5, wordSize * 0.3);

  const wordmark = (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: `${wordSize}px`,
        lineHeight: 1.05,
        color: wordColor,
        letterSpacing: '-0.005em',
        whiteSpace: 'nowrap',
      }}
    >
      Interambiente
    </span>
  );

  const tagline = showTagline && (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 300,
        fontSize: `${tagSize}px`,
        letterSpacing: '0.28em',
        color: tagColor,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      Aliados en sostenibilidad
    </span>
  );

  const pillars = showPillars && (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        fontSize: `${Math.max(8, tagSize * 0.92)}px`,
        letterSpacing: '0.08em',
        color: pillarColor,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      Sociedad · Ambiente · Economía
    </span>
  );

  if (vertical) {
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: `${size * 0.28}px`, ...style }}
      >
        <Isotipo size={size} variant={dark ? 'hueso' : 'color'} title="Interambiente" />
        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: `${tagSize * 0.42}px` }}>
          {wordmark}
          {tagline}
          {pillars}
        </span>
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: `${size * 0.3}px`, ...style }}
    >
      <Isotipo size={size} variant={dark ? 'hueso' : 'color'} title="Interambiente" />
      <span style={{ display: 'inline-flex', flexDirection: 'column', gap: `${tagSize * 0.34}px` }}>
        {wordmark}
        {tagline}
        {pillars}
      </span>
    </span>
  );
}
