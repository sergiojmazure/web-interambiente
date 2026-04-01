import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: 'var(--space-md)', 
          paddingBottom: 'var(--space-md)' 
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logotipo-interambiente.png" 
              alt="Interambiente Logo" 
              style={{ height: '50px', objectFit: 'contain' }} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <Link to="/" style={navLinkStyle}>Inicio</Link>
            <Link to="/servicios" style={navLinkStyle}>Servicios</Link>
            <Link to="/clientes" style={navLinkStyle}>Portfolio</Link>
            <Link to="/novedades" style={navLinkStyle}>Novedades</Link>
            <a href="/#contacto" className="btn btn-primary" style={{ padding: '10px 24px' }}>Contacto</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '44px', 
              height: '44px', 
              background: 'none', 
              border: 'none',
              color: 'var(--color-text)',
              cursor: 'pointer'
            }}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="mobile-nav" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-bg)',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            borderTop: '1px solid var(--color-bg-alt)'
          }}>
            <Link to="/" style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link to="/servicios" style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>Servicios</Link>
            <Link to="/clientes" style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
            <Link to="/novedades" style={mobileNavLinkStyle} onClick={() => setIsMenuOpen(false)}>Novedades</Link>
            <a href="/#contacto" className="btn btn-primary" style={{ textAlign: 'center', margin: 'var(--space-md)' }} onClick={() => setIsMenuOpen(false)}>Contacto</a>
          </nav>
        )}
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="bg-dark" style={{ padding: 'var(--space-xl) 0', marginTop: 'auto' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
            <div>
              <img 
                src="/logotipo-interambiente.png" 
                alt="Interambiente" 
                style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} 
              />
              <p style={{ color: 'var(--color-bg-alt)', marginTop: 'var(--space-sm)' }}>Acompañando a las organizaciones en su transición hacia la sostenibilidad.</p>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>Enlaces</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: 'var(--space-sm)' }}>
                <li><Link to="/servicios" style={footerLinkStyle}>Servicios</Link></li>
                <li><Link to="/clientes" style={footerLinkStyle}>Portfolio</Link></li>
                <li><Link to="/novedades" style={footerLinkStyle}>Novedades</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>Contacto</h4>
              <p style={{ color: 'var(--color-bg-alt)', margin: 'var(--space-sm) 0 4px 0' }}>info@interambiente.com</p>
              <p style={{ color: 'var(--color-bg-alt)', margin: '0 0 4px 0' }}>WhatsApp: 0984 61 66 84 | 0995 32 84 91</p>
              <p style={{ color: 'var(--color-bg-alt)', margin: '0' }}>Av. de los Shyris y Suecia Edf. IQON, Quito.</p>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', 
            alignItems: 'center',
            color: 'var(--color-text-muted)', 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: 'var(--space-md)',
            gap: '16px'
          }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Interambiente. Todos los derechos reservados. | <Link to="/privacidad" style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>Política de Privacidad</Link></p>
            <p style={{ margin: 0 }}>
              Diseñado digitalmente por <a href="https://innovacion.ec" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Innovación IA</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const navLinkStyle = {
  fontWeight: '600',
  color: 'var(--color-text)',
  textDecoration: 'none',
  padding: '12px 16px', // Ensures > 44px height for touch
  display: 'inline-block'
};

const mobileNavLinkStyle = {
  ...navLinkStyle,
  padding: '16px',
  display: 'block',
  borderBottom: '1px solid var(--color-bg-alt)'
};

const footerLinkStyle = {
  color: 'var(--color-bg-alt)',
  display: 'inline-block',
  padding: '8px 0' // Ensures proper touch target size in lists
};
