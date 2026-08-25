import { ArrowRight, ArrowUpRight, ClipboardCheck, ShieldCheck, FileText, Recycle, Send, User, Mail, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import Isotipo from '../../components/brand/Isotipo';
import SEO from '../../components/SEO';

const CLIENTS = ['Automotores y Anexos', 'Corporación Maresa', 'Hanaska'];

/* Los tres pilares del isotipo, en el orden fijo del manual:
   0° economía (terracota) · 120° ambiente (olivo) · 240° sociedad (ocre) */
const PILARES = [
  { color: '#C1652E', name: 'Economía', text: 'El cumplimiento deja de ser un costo y se vuelve continuidad operativa, acceso a mercados y confianza de inversión.' },
  { color: '#8A9A5B', name: 'Ambiente', text: 'Gestión técnica del impacto real: medición, control y mejora continua en cada fase del proyecto.' },
  { color: '#D9A441', name: 'Sociedad', text: 'Relación cuidada con comunidades, autoridades y equipos internos, con evidencia verificable.' },
];

const EVIDENCIA = [
  { value: '90%', text: 'del S&P 500 ya reporta datos ESG' },
  { value: '66%', text: 'obtiene ingresos de iniciativas sostenibles' },
  { value: '50%+', text: 'reduce costos y mejora su resiliencia' },
];

const SERVICES = [
  { icon: ClipboardCheck, title: 'Asesoría y seguimiento ambiental', text: 'Acompañamiento técnico en cada fase del plan de manejo ambiental.' },
  { icon: ShieldCheck, title: 'Regularización y fiscalización', text: 'Permisos ante la Autoridad Ambiental y evaluación de cumplimiento legal.' },
  { icon: FileText, title: 'Estudios, planes y procedimientos', text: 'Estudios de impacto, auditorías, registros e informes de cumplimiento.' },
  { icon: Recycle, title: 'Gestión de residuos sólidos', text: 'Residuos comunes, orgánicos y reciclables con gestores autorizados.' },
];

const TEAM = [
  { img: '/imagenes/diego.webp', name: 'Diego Procel', role: 'Gerente General', bio: 'Estratega ambiental corporativo, experto en alinear modelos de negocio con la normativa de regularización local e internacional.' },
  { img: '/imagenes/angie.webp', name: 'Angie Recalde', role: 'Gerente de Proyectos', bio: 'Especialista en sostenibilidad y cumplimiento legal ambiental, liderando proyectos corporativos con el más alto estándar.' },
];

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState('idle');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7fd3c128-d3a1-41e3-a603-76ca148ef9d1',
          subject: 'Nuevo Lead desde la Landing Page - Interambiente',
          from_name: 'Web Interambiente',
          Nombre: formData.nombre,
          Email: formData.email,
          Mensaje: formData.mensaje,
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <SEO />

      {/* ---------- Héroe ---------- */}
      <PageHero
        variant="home"
        align="left"
        priority
        sello
        imageId="1469474968028-56623f02e42e"
        imageAlt="Cordillera andina iluminada al amanecer"
        eyebrow="Aliados en sostenibilidad"
        title={
          <>
            Cumplimiento ambiental que se convierte en{' '}
            <span style={{ color: 'var(--color-accent)' }}>ventaja competitiva</span>
          </>
        }
        subtitle="Asesoría y gestión ambiental para organizaciones públicas y privadas en todo el Ecuador."
        actions={
          <>
            <Link to="/contacto" className="btn btn-primary">
              Agendar diagnóstico <ArrowRight size={18} />
            </Link>
            <Link to="/servicios" className="btn btn-on-dark">Ver servicios</Link>
          </>
        }
      />

      {/* ---------- Confianza ---------- */}
      <section className="section-tight bg-cream">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '260px' }}>
              Organizaciones que confían en nuestro equipo
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              {CLIENTS.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- La tríada: el concepto del isotipo ---------- */}
      <section className="section">
        <div className="container">
          <div className="triada-grid">
            <Reveal style={{ display: 'flex', justifyContent: 'center' }}>
              <Isotipo size={300} animated style={{ maxWidth: '100%' }} title="Los tres pilares de la sostenibilidad" />
            </Reveal>

            <div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginBottom: 'var(--space-md)' }}>
                La sostenibilidad ocurre en la intersección
              </h2>
              <p className="lead" style={{ marginBottom: 'var(--space-lg)' }}>
                Nuestro símbolo son tres pétalos unidos en un punto. Ese punto es donde trabajamos:
                no en la yuxtaposición de conceptos, sino donde sociedad, ambiente y economía se cruzan de verdad.
              </p>

              <dl style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', margin: 0 }}>
                {PILARES.map((p) => (
                  <div key={p.name} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: '10px', height: '10px', borderRadius: '50%', background: p.color, marginTop: '9px' }} />
                    <div>
                      <dt style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.12rem', color: 'var(--color-secondary)' }}>{p.name}</dt>
                      <dd style={{ margin: '2px 0 0', color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{p.text}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Declaración de marca + evidencia ---------- */}
      <section className="section bg-dark">
        <div className="container">
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 4.4vw, 3.1rem)',
                lineHeight: 1.18,
                color: '#F7F4F0',
                maxWidth: '17ch',
              }}
            >
              Transformamos el cumplimiento normativo en{' '}
              <span style={{ color: 'var(--color-accent)' }}>legado sostenible</span>.
            </p>
          </blockquote>

          <div className="evidencia">
            {EVIDENCIA.map((e) => (
              <div key={e.value}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.9rem', color: 'var(--color-accent)', lineHeight: 1 }}>{e.value}</span>
                <p style={{ color: 'rgba(237, 231, 218, 0.72)', fontSize: '0.95rem', marginTop: '6px', lineHeight: 1.5 }}>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Servicios ---------- */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)' }}>Soluciones ambientales integrales</h2>
              <p className="lead" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                Cubrimos todo el ciclo: del diagnóstico y la regularización al seguimiento, la fiscalización y la gestión de residuos.
              </p>
              <Link to="/servicios" className="btn btn-outline">
                Ver todos los servicios <ArrowRight size={18} />
              </Link>
              <div style={{ marginTop: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16 / 10' }}>
                <img
                  src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=900&q=80&auto=format&fit=crop"
                  alt="Río de aguas limpias entre rocas"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SERVICES.map((s, i) => (
                <Link
                  key={i}
                  to="/servicios"
                  className="service-row"
                  style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: 'var(--space-lg) 0', borderBottom: '1px solid var(--color-line)', textDecoration: 'none' }}
                >
                  <span style={{ flexShrink: 0, width: '46px', height: '46px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-deep)' }}>
                    <s.icon size={21} strokeWidth={1.75} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--color-secondary)' }}>{s.title}</span>
                      <ArrowUpRight size={18} className="service-arrow" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                    </span>
                    <span style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: '4px', fontSize: '0.97rem' }}>{s.text}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quiénes somos ---------- */}
      <section id="quienes-somos" className="section">
        <div className="container">
          <div style={{ maxWidth: '68ch', marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)' }}>
              Aliados estratégicos, no simples consultores
            </h2>
            <p className="lead" style={{ marginTop: 'var(--space-md)' }}>
              Interambiente S.A.S. es una empresa ecuatoriana de asesoría y gestión ambiental con presencia nacional.
              Integramos el cumplimiento normativo con una visión de largo plazo orientada a la sostenibilidad,
              los ODS y la economía circular.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
            {TEAM.map((m) => (
              <div key={m.name} style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start' }}>
                <img
                  src={m.img}
                  alt={m.name}
                  width="112"
                  height="112"
                  loading="lazy"
                  style={{ flexShrink: 0, width: '112px', height: '112px', borderRadius: 'var(--radius-lg)', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{m.name}</h3>
                  <p style={{ color: 'var(--color-primary-deep)', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>{m.role}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.97rem', lineHeight: 1.6 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contacto ---------- */}
      <section id="contacto" className="section bg-light">
        <div className="container container-narrow">
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)' }}>Hablemos de tu proyecto</h2>
            <p className="lead" style={{ marginTop: 'var(--space-sm)' }}>
              Cuéntanos qué necesitas y nuestro equipo técnico te responde con una ruta concreta de cumplimiento.
            </p>
          </div>

          <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, var(--space-xl))' }}>
            {status === 'success' ? (
              <div style={{ background: 'rgba(95, 110, 58, 0.10)', padding: '28px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(95, 110, 58, 0.24)' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>Mensaje enviado</h3>
                <p style={{ margin: 0, color: 'var(--color-text)' }}>Nuestro equipo se pondrá en contacto contigo muy pronto.</p>
                <button className="btn btn-outline" style={{ marginTop: '18px' }} onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                  <div style={fieldStyle}>
                    <label htmlFor="nombre" style={labelStyle}><User size={16} color="var(--color-primary-deep)" /> Nombre completo</label>
                    <input type="text" id="nombre" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej. María Pérez" style={inputStyle} />
                  </div>
                  <div style={fieldStyle}>
                    <label htmlFor="email" style={labelStyle}><Mail size={16} color="var(--color-primary-deep)" /> Correo electrónico</label>
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="maria@empresa.com" style={inputStyle} />
                  </div>
                </div>
                <div style={fieldStyle}>
                  <label htmlFor="mensaje" style={labelStyle}><MessageSquare size={16} color="var(--color-primary-deep)" /> ¿En qué podemos ayudarte?</label>
                  <textarea id="mensaje" required rows="5" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} placeholder="Quisiera información sobre asesoría y gestión ambiental..." style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#A3301C', fontSize: '0.92rem', margin: 0 }}>No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo.</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ minWidth: '210px', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Enviando...' : (<>Enviar mensaje <Send size={18} /></>)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .triada-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); align-items: center; }
        @media (min-width: 900px) { .triada-grid { grid-template-columns: 5fr 7fr; gap: var(--space-2xl); } }

        .evidencia {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
          margin-top: var(--space-2xl);
          padding-top: var(--space-lg);
          border-top: 1px solid rgba(247, 244, 240, 0.16);
        }
        @media (min-width: 720px) { .evidencia { grid-template-columns: repeat(3, 1fr); gap: var(--space-xl); } }

        .service-row { transition: transform 280ms var(--ease-out); }
        .service-row:hover { transform: translateX(8px); }
        .service-row .service-arrow { transition: transform 220ms, color 220ms; }
        .service-row:hover .service-arrow { color: var(--color-primary-deep); transform: translate(2px, -2px); }

        input:focus, textarea:focus {
          border-color: var(--color-primary-deep) !important;
          box-shadow: 0 0 0 3px rgba(158, 78, 28, 0.14) !important;
        }
      `}</style>
    </div>
  );
}

const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-display)' };
const inputStyle = {
  padding: '13px 16px',
  borderRadius: 'var(--radius-sm)',
  border: '1.5px solid var(--color-line-strong)',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 220ms, box-shadow 220ms',
};
