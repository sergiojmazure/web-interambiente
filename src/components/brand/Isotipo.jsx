/**
 * Isotipo Interambiente — tríada de pétalos (triskel).
 *
 * Geometría oficial del manual de marca 2026:
 *   pétalo base  M0,0 C -60,-58 -40,-142 0,-160 C 40,-142 60,-58 0,0 Z
 *   copias rotadas 120° y 240° alrededor del origen.
 *   0° economía (terracota) · 120° ambiente (olivo) · 240° sociedad (ocre)
 *
 * Reglas respetadas: sentido terracota → olivo → ocre en horario (fijo),
 * escalado siempre proporcional, sin sombras, degradados ni contornos,
 * los tres pétalos nunca se separan.
 *
 * variant: 'color'  → full color (solo sobre blanco o blanco hueso)
 *          'hueso'  → monocromo hueso (sobre verde oscuro o foto de bajo contraste)
 *          'mono'   → hereda currentColor (escala de grises / usos de una tinta)
 */
const PETAL = 'M0,0 C -60,-58 -40,-142 0,-160 C 40,-142 60,-58 0,0 Z';

const FULL_COLOR = ['#C1652E', '#8A9A5B', '#D9A441']; // 0° · 120° · 240°

export default function Isotipo({
  size = 40,
  variant = 'color',
  title,
  animated = false,
  className = '',
  style = {},
  ...rest
}) {
  const fills =
    variant === 'color'
      ? FULL_COLOR
      : variant === 'hueso'
        ? ['#F7F4F0', '#F7F4F0', '#F7F4F0']
        : ['currentColor', 'currentColor', 'currentColor'];

  // El blend multiply reproduce la leve superposición central del manual.
  // Solo aplica en full color: en monocromo no hay dos tintas que mezclar.
  const blend = variant === 'color' ? 'multiply' : 'normal';

  return (
    <svg
      viewBox="-141 -162 282 254"
      width={size}
      height={(size * 254) / 282}
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      <g style={{ isolation: 'isolate' }}>
        {[0, 120, 240].map((deg, i) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d={PETAL}
              fill={fills[i]}
              className={animated ? 'petal-in' : undefined}
              style={{ mixBlendMode: blend, animationDelay: animated ? `${i * 160}ms` : undefined }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export { PETAL, FULL_COLOR };
