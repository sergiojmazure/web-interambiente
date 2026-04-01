import { ArrowRight, BarChart2, Leaf, ShieldCheck, Globe, Send, User, Mail, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShaderBackground } from '../../components/ui/HeroShader';
import { SelloCertificado } from '../../components/ui/SelloCertificado';
import SEO from '../../components/SEO';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#contacto') {
      const el = document.getElementById('contacto');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState('idle');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch("https://formsubmit.co/ajax/soastec@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Asunto: "Lead desde la Landing Page - Interambiente",
            Nombre: formData.nombre,
            Email: formData.email,
            Mensaje: formData.mensaje
        })
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div>
      <SEO />
      {/* Hero Section */}
      <ShaderBackground>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.85rem'
            }}
          >
            ✨ Nueva Solución de Consultoría ESG
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Estrategia Sostenible <br />
            <span style={{ color: '#6ee7b7', fontStyle: 'italic', fontWeight: 400 }}>para el Futuro</span>
          </h1>
          <p className="subtitle" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', maxWidth: '700px', margin: '0 auto var(--space-xl)', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6 }}>
            Interambiente acompañamos a las organizaciones en su transición hacia la sostenibilidad. Repensamos modelos de negocio de forma innovadora, interactiva y rentable.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/servicios" className="btn btn-primary" style={{ border: 'none', background: '#ffffff', color: '#064e3b' }}>
              Nuestros Servicios <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/contacto" className="btn btn-secondary" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent' }}>
              Agendar Consulta
            </Link>
          </div>
        </div>
        <SelloCertificado />
      </ShaderBackground>

      {/* Statistics Section from User Images */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', maxWidth: '900px', margin: '0 auto var(--space-xl)' }}>
            <h2 style={{ color: 'var(--color-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Esto ya no es reputación... esto es negocio.</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginTop: 'var(--space-md)' }}>El costo de no actuar frente a la pérdida de naturaleza puede alcanzar entre 10 y 25 trillones de dólares. Así es como la sostenibilidad genera valor hoy:</p>
          </div>
          
          <div className="stats-grid">
            <StatCard 
              icon={<BarChart2 size={36} color="var(--color-primary)" />}
              percentage="90%"
              text="de empresas del S&P 500 ya reportan datos ESG por transparencia."
            />
            <StatCard 
              icon={<Leaf size={36} color="var(--color-primary)" />}
              percentage="66%"
              text="de las empresas reportan ingresos directos de iniciativas sostenibles."
            />
            <StatCard 
              icon={<ShieldCheck size={36} color="var(--color-primary)" />}
              percentage="50%+"
              text="están reduciendo costos, mejorando su resiliencia y posición."
            />
            <StatCard 
              icon={<Globe size={36} color="var(--color-primary)" />}
              percentage="75%+"
              text="de ejecutivos reportan un claro progreso en metas de sostenibilidad."
            />
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="section bg-gradient">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-secondary)' }}>Impulsemos tu Creación de Valor</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              Déjanos un mensaje. Combinamos consultoría corporativa, educación y emprendedurismo para generar impacto real, medible y sostenible en tu organización.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: 'var(--space-xl)' }}>
            {status === 'success' ? (
              <div style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#166534', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(22, 163, 74, 0.2)' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>¡Mensaje Enviado!</h3>
                <p style={{ margin: 0 }}>Nuestros ingenieros se contactarán contigo muy pronto.</p>
                <button className="btn btn-outline" style={{ marginTop: '16px', background: 'transparent', borderColor: '#166534', color: '#166534' }} onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                  {/* Nombre */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="nombre" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={18} color="var(--color-primary)" /> Nombre Completo
                    </label>
                    <input 
                      type="text" 
                      id="nombre" 
                      required 
                      value={formData.nombre}
                      onChange={e => setFormData({...formData, nombre: e.target.value})}
                      placeholder="Ej. María Pérez"
                      style={inputStyle} 
                    />
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={18} color="var(--color-primary)" /> Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="maria@empresa.com"
                      style={inputStyle} 
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="mensaje" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={18} color="var(--color-primary)" /> ¿En qué podemos ayudarte?
                  </label>
                  <textarea 
                    id="mensaje" 
                    required 
                    rows="5"
                    value={formData.mensaje}
                    onChange={e => setFormData({...formData, mensaje: e.target.value})}
                    placeholder="Quisiera información sobre consultoría ESG..."
                    style={{...inputStyle, resize: 'vertical' }} 
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0, textAlign: 'right' }}>Ocurrió un error al enviar tu mensaje. Intenta nuevamente.</p>
                )}

                <div style={{ textAlign: 'right', marginTop: 'var(--space-md)' }}>
                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ minWidth: '200px', fontSize: '1.2rem', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Enviando...' : (
                      <><Send size={20} style={{ marginRight: '8px' }} /> Enviar Mensaje</>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, percentage, text }) {
  return (
    <div className="glass-panel" style={{ 
      padding: 'var(--space-xl) var(--space-lg)', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      transition: 'transform var(--transition-base)',
      cursor: 'default'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ marginBottom: 'var(--space-md)', background: 'var(--color-bg-alt)', padding: '16px', borderRadius: '50%' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '3.5rem', color: 'var(--color-accent)', margin: 0, lineHeight: 1 }}>{percentage}</h3>
      <p style={{ color: 'var(--color-text)', fontWeight: '600', marginTop: 'var(--space-sm)', fontSize: '1.1rem' }}>{text}</p>
    </div>
  );
}

const inputStyle = {
  padding: '12px 16px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid #ccc',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  outline: 'none',
  transition: 'border-color var(--transition-base), box-shadow var(--transition-base)',
};
