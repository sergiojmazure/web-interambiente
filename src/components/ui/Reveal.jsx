import { useEffect, useRef, useState } from 'react';

/**
 * Revela el contenido al entrar en viewport (IntersectionObserver, sin
 * dependencias). El CSS (.reveal / .is-visible) ya respeta
 * prefers-reduced-motion, así que esto degrada a estático automáticamente.
 *
 * Uso: <Reveal as="section" delay={120}>…</Reveal>
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
