import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/#quienes-somos', label: 'Quiénes somos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/clientes', label: 'Portafolio' },
  { to: '/novedades', label: 'Novedades' },
];

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    if (!location.hash) window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.86)' : 'rgba(253, 251, 247, 0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-line)' : 'transparent'}`,
          transition: 'background-color 300ms, border-color 300ms',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '74px',
          }}
        >
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} aria-label="Interambiente — inicio">
            <img
              src="/logotipo-interambiente.webp"
              alt="Interambiente"
              width="200"
              height="187"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Nav escritorio */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  ...navLinkStyle,
                  color: isActive && !item.to.includes('#') ? 'var(--color-primary)' : 'var(--color-secondary)',
                })}
                className="nav-underline"
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contacto" className="btn btn-primary" style={{ marginLeft: '10px', padding: '11px 22px', fontSize: '0.98rem' }}>
              Contacto
            </Link>
          </nav>

          {/* Botón móvil */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', color: 'var(--color-secondary)', cursor: 'pointer' }}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav móvil */}
        {isMenuOpen && (
          <nav
            className="mobile-nav"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-bg)',
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxShadow: 'var(--shadow-md)',
              borderTop: '1px solid var(--color-line)',
            }}
          >
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link to="/contacto" className="btn btn-primary" style={{ textAlign: 'center', marginTop: 'var(--space-sm)' }} onClick={() => setIsMenuOpen(false)}>
              Contacto
            </Link>
          </nav>
        )}
      </header>

      <main style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        <Outlet />
      </main>

      <footer className="bg-dark" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-lg)', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <div style={{ maxWidth: '320px' }}>
              <img
                src="/logotipo-interambiente.webp"
                alt="Interambiente"
                width="200"
                height="187"
                loading="lazy"
                style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
              />
              <p style={{ color: 'rgba(237, 231, 218, 0.72)', marginTop: 'var(--space-md)', fontSize: '1rem', lineHeight: 1.6 }}>
                Acompañamos a las organizaciones en su cumplimiento ambiental y su transición hacia la sostenibilidad.
              </p>
            </div>

            <div>
              <h4 style={footerHeadStyle}>Navegación</h4>
              <ul style={footerListStyle}>
                <li><Link to="/servicios" style={footerLinkStyle}>Servicios</Link></li>
                <li><Link to="/clientes" style={footerLinkStyle}>Portafolio</Link></li>
                <li><Link to="/novedades" style={footerLinkStyle}>Novedades</Link></li>
                <li><Link to="/contacto" style={footerLinkStyle}>Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={footerHeadStyle}>Servicios</h4>
              <ul style={footerListStyle}>
                <li><Link to="/servicios" style={footerLinkStyle}>Regularización ambiental</Link></li>
                <li><Link to="/servicios" style={footerLinkStyle}>Fiscalización y auditoría</Link></li>
                <li><Link to="/servicios" style={footerLinkStyle}>Estudios de impacto</Link></li>
                <li><Link to="/servicios" style={footerLinkStyle}>Gestión de residuos</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={footerHeadStyle}>Contacto</h4>
              <ul style={{ ...footerListStyle, gap: '12px' }}>
                <li style={footerContactRow}>
                  <Mail size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-primary-soft)' }} />
                  <a href="mailto:info@interambientesa.com" style={footerLinkStyle}>info@interambientesa.com</a>
                </li>
                <li style={footerContactRow}>
                  <Phone size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-primary-soft)' }} />
                  <span style={{ color: 'rgba(237, 231, 218, 0.72)' }}>+593 98 418 0479<br />+593 98 858 8532</span>
                </li>
                <li style={footerContactRow}>
                  <MapPin size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-primary-soft)' }} />
                  <span style={{ color: 'rgba(237, 231, 218, 0.72)' }}>Edif. IQON, Av. de los Shyris y Suecia. Quito, Ecuador.</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(237, 231, 218, 0.5)',
              borderTop: '1px solid rgba(245, 240, 230, 0.12)',
              paddingTop: 'var(--space-lg)',
              fontSize: '0.9rem',
            }}
          >
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Interambiente S.A.S. ·{' '}
              <Link to="/privacidad" style={{ color: 'rgba(237, 231, 218, 0.7)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Política de Privacidad</Link>
            </p>
            <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              Diseñado por{' '}
              <a href="https://innovacion.ec" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-soft)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                Innovación IA <ArrowUpRight size={13} />
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: "";
          position: absolute;
          left: 16px; right: 16px; bottom: 8px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 280ms var(--ease-out);
        }
        .nav-underline:hover::after { transform: scaleX(1); }
        footer a:hover { color: #fff !important; }
      `}</style>
    </div>
  );
}

const navLinkStyle = {
  fontFamily: 'var(--font-subtitle)',
  fontWeight: 600,
  fontSize: '0.98rem',
  textDecoration: 'none',
  padding: '12px 16px',
  display: 'inline-block',
  transition: 'color 220ms',
};

const mobileNavLinkStyle = {
  fontFamily: 'var(--font-subtitle)',
  fontWeight: 600,
  fontSize: '1.05rem',
  color: 'var(--color-secondary)',
  textDecoration: 'none',
  padding: '15px 12px',
  display: 'block',
  borderBottom: '1px solid var(--color-line)',
};

const footerHeadStyle = {
  color: '#F5F0E6',
  fontSize: '1rem',
  fontFamily: 'var(--font-subtitle)',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginBottom: 'var(--space-md)',
};

const footerListStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  margin: 0,
  padding: 0,
};

const footerLinkStyle = {
  color: 'rgba(237, 231, 218, 0.72)',
  textDecoration: 'none',
  transition: 'color 220ms',
  fontSize: '0.98rem',
};

const footerContactRow = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  fontSize: '0.95rem',
  lineHeight: 1.5,
};
