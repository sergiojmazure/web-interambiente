import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Isotipo from '../components/brand/Isotipo';

const NAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/#quienes-somos', label: 'Quiénes somos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/clientes', label: 'Portafolio' },
  { to: '/novedades', label: 'Novedades' },
];

/* Wordmark de marca: Nunito Medium. Sobre verde oscuro va en blanco hueso. */
function Wordmark({ size = 21 }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: `${size}px`,
        color: '#F7F4F0',
        letterSpacing: '-0.005em',
        lineHeight: 1,
      }}
    >
      Interambiente
    </span>
  );
}

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    if (!location.hash) window.scrollTo(0, 0);
  }, [location]);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Barra de navegación en verde oscuro, según la aplicación digital del manual */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(44, 58, 36, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(247, 244, 240, 0.10)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px' }}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
            aria-label="Interambiente, ir al inicio"
          >
            <Isotipo size={34} variant="hueso" />
            <Wordmark />
          </Link>

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="nav-link"
                style={({ isActive }) => ({
                  ...navLinkStyle,
                  color: isActive && !item.to.includes('#') ? '#F7F4F0' : 'rgba(247, 244, 240, 0.76)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contacto" className="btn nav-cta">Contacto</Link>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '46px', height: '46px',
              background: 'rgba(247, 244, 240, 0.10)',
              border: '1px solid rgba(247, 244, 240, 0.18)',
              borderRadius: 'var(--radius-md)',
              color: '#F7F4F0', cursor: 'pointer',
            }}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              backgroundColor: '#2C3A24',
              padding: 'var(--space-md)',
              display: 'flex', flexDirection: 'column', gap: '2px',
              borderTop: '1px solid rgba(247, 244, 240, 0.10)',
              boxShadow: '0 18px 40px rgba(20, 28, 16, 0.34)',
            }}
          >
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="btn btn-primary"
              style={{ marginTop: 'var(--space-sm)', justifyContent: 'center' }}
              onClick={() => setIsMenuOpen(false)}
            >
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <div style={{ maxWidth: '330px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                <Isotipo size={38} variant="hueso" title="Interambiente" />
                <Wordmark size={23} />
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 300,
                  fontSize: '0.63rem', letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: 'var(--color-accent)', marginTop: '12px', whiteSpace: 'nowrap',
                }}
              >
                Aliados en sostenibilidad
              </p>
              <p style={{ color: 'rgba(237, 231, 218, 0.70)', marginTop: 'var(--space-md)', fontSize: '0.97rem', lineHeight: 1.65 }}>
                Acompañamos a organizaciones públicas y privadas en el cumplimiento de la legislación ambiental y en la construcción de un modelo de negocio sostenible.
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
                  <Mail size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }} />
                  <a href="mailto:info@interambientesa.com" style={footerLinkStyle}>info@interambientesa.com</a>
                </li>
                <li style={footerContactRow}>
                  <Phone size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }} />
                  <span style={{ color: 'rgba(237, 231, 218, 0.70)' }}>+593 98 418 0479<br />+593 98 858 8532</span>
                </li>
                <li style={footerContactRow}>
                  <MapPin size={16} style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }} />
                  <span style={{ color: 'rgba(237, 231, 218, 0.70)' }}>Edif. IQON, Av. de los Shyris y Suecia. Quito, Ecuador.</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
              gap: '12px',
              color: 'rgba(237, 231, 218, 0.52)',
              borderTop: '1px solid rgba(247, 244, 240, 0.12)',
              paddingTop: 'var(--space-lg)',
              fontSize: '0.88rem',
            }}
          >
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Interambiente S.A.S. ·{' '}
              <Link to="/privacidad" style={{ color: 'rgba(237, 231, 218, 0.72)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Política de Privacidad</Link>
            </p>
            <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              Diseñado por{' '}
              <a href="https://innovacion.ec" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                Innovación IA <ArrowUpRight size={13} />
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .nav-link { position: relative; transition: color 220ms; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 14px; right: 14px; bottom: 9px;
          height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 280ms var(--ease-out);
        }
        .nav-link:hover { color: #F7F4F0 !important; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-cta {
          margin-left: 12px;
          padding: 10px 22px;
          font-size: 0.96rem;
          background-color: var(--color-primary);
          color: #fff;
          box-shadow: none;
        }
        .nav-cta:hover { background-color: #D27640; color: #fff; transform: translateY(-1px); }
        footer a:hover { color: #F7F4F0 !important; }
      `}</style>
    </div>
  );
}

const navLinkStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '0.96rem',
  textDecoration: 'none',
  padding: '12px 14px',
  display: 'inline-block',
};

const mobileNavLinkStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '1.05rem',
  color: '#F7F4F0',
  textDecoration: 'none',
  padding: '15px 12px',
  display: 'block',
  borderBottom: '1px solid rgba(247, 244, 240, 0.10)',
};

const footerHeadStyle = {
  color: '#F7F4F0',
  fontSize: '0.78rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  letterSpacing: '0.16em',
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
  color: 'rgba(237, 231, 218, 0.70)',
  textDecoration: 'none',
  transition: 'color 220ms',
  fontSize: '0.97rem',
};

const footerContactRow = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  fontSize: '0.94rem',
  lineHeight: 1.5,
};
