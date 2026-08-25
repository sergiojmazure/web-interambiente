import { useState } from 'react';
import { SelloCertificado } from './SelloCertificado';
import { unsplash, unsplashSrcSet } from '../../lib/img';

/**
 * Héroe editorial reutilizable: fotografía real + overlay de marca.
 * El contenedor lleva un degradado de marca como fondo, así que si la
 * imagen fallara, el héroe sigue siendo legible (fallback elegante).
 *
 * variant: 'home' (alto) | 'page' (compacto)
 * align:   'left' | 'center'
 */
export default function PageHero({
  imageId,
  imageAlt = '',
  eyebrow,
  title,
  subtitle,
  actions,
  variant = 'page',
  align = 'left',
  sello = false,
  priority = false,
  focal = 'center',
}) {
  const [imgOk, setImgOk] = useState(true);
  const isHome = variant === 'home';
  const centered = align === 'center';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isHome ? 'min(92vh, 880px)' : 'clamp(360px, 56vh, 560px)',
        display: 'flex',
        alignItems: isHome ? 'flex-end' : 'center',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #2C3A24 0%, #4A5B38 55%, #C1652E 130%)',
        isolation: 'isolate',
      }}
    >
      {/* Fotografía */}
      {imageId && imgOk && (
        <img
          src={unsplash(imageId, 1600)}
          srcSet={unsplashSrcSet(imageId)}
          sizes="100vw"
          alt={imageAlt}
          fetchpriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setImgOk(false)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: focal,
            zIndex: -2,
          }}
        />
      )}

      {/* Overlay de marca (contraste + tinte, deja respirar la foto) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: centered
            ? 'linear-gradient(180deg, rgba(28,38,22,0.42) 0%, rgba(28,38,22,0.70) 100%)'
            : 'linear-gradient(95deg, rgba(28,38,22,0.86) 0%, rgba(28,38,22,0.50) 46%, rgba(28,38,22,0.10) 78%, rgba(28,38,22,0.30) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(0deg, rgba(28,38,22,0.58) 0%, transparent 42%)',
        }}
      />

      <div
        className="container"
        style={{
          paddingTop: isHome ? 'clamp(7rem, 16vh, 11rem)' : '3.5rem',
          paddingBottom: isHome ? 'clamp(3.5rem, 8vh, 6rem)' : '3.5rem',
          textAlign: centered ? 'center' : 'left',
        }}
      >
        <div
          style={{
            maxWidth: centered ? '880px' : isHome ? '900px' : '760px',
            margin: centered ? '0 auto' : 0,
          }}
        >
          {eyebrow && (
            <span
              className="eyebrow"
              style={{
                color: 'var(--color-accent)',
                justifyContent: centered ? 'center' : 'flex-start',
              }}
            >
              {eyebrow}
            </span>
          )}

          <h1
            style={{
              color: '#FCFAF5',
              fontSize: isHome
                ? 'clamp(2.15rem, 4.6vw, 3.5rem)'
                : 'clamp(1.9rem, 3.9vw, 2.9rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.015em',
              marginBottom: subtitle ? '1.25rem' : 0,
              textShadow: '0 2px 30px rgba(0,0,0,0.28)',
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: isHome ? 'clamp(1.05rem, 1.6vw, 1.22rem)' : '1.1rem',
                lineHeight: 1.55,
                color: 'rgba(245, 240, 230, 0.88)',
                maxWidth: '46ch',
                margin: centered ? '0 auto' : 0,
                marginBottom: actions ? '2rem' : 0,
              }}
            >
              {subtitle}
            </p>
          )}

          {actions && (
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                justifyContent: centered ? 'center' : 'flex-start',
              }}
            >
              {actions}
            </div>
          )}
        </div>
      </div>

      {sello && <SelloCertificado />}
    </section>
  );
}
