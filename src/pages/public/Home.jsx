import { ArrowRight, ArrowUpRight, ClipboardCheck, ShieldCheck, FileText, Recycle, Send, User, Mail, MessageSquare, TrendingUp, Leaf, Scale, Globe2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SEO from '../../components/SEO';

const CLIENTS = ['Automotores y Anexos', 'Corporación Maresa', 'Hanaska'];

const STATS = [
  { icon: TrendingUp, value: '90%', text: 'del S&P 500 ya reporta datos ESG por transparencia.' },
  { icon: Leaf, value: '66%', text: 'de las empresas obtiene ingresos directos de iniciativas sostenibles.' },
  { icon: ShieldCheck, value: '50%+', text: 'reduce costos y mejora su resiliencia y posición.' },
  { icon: Globe2, value: '75%+', text: 'de ejecutivos reporta progreso claro en metas de sostenibilidad.' },
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
        focal="center"
        eyebrow="Consultoría ambiental · Ecuador"
        title={
          <>
            Estrategia ambiental,<br />operación{' '}
            <em style={{ fontStyle: 'italic', color: '#EBA85E', fontWeight: 500 }}>sostenible</em>.
          </>
        }
        subtitle="Asesoría técnica y regularización para que tu empresa cumpla la normativa ambiental del Ecuador y genere valor real."
        actions={
          <>
            <Link to="/servicios" className="btn btn-primary">
              Ver servicios <ArrowRight size={18} />
            </Link>
            <Link to="/contacto" className="btn btn-secondary" style={{ color: '#FCFAF5', borderColor: 'rgba(252,250,245,0.45)' }}>
              Hablar con un experto
            </Link>
          </>
        }
      />

      {/* ---------- Confianza / clientes ---------- */}
      <section className="section-tight bg-cream">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-subtitle)', fontWeight: 600, fontSize: '0.92rem', letterSpacing: '0.04em', color: 'var(--color-text-muted)', maxWidth: '220px' }}>
              Organizaciones que confían en nuestro equipo
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
              {CLIENTS.map((c) => (
                <div key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 18px', background: 'var(--color-bg)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-full)' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {c.replace(/^Corporación /, '').charAt(0)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Valor / estadísticas ---------- */}
      <section className="section">
        <div className="container">
          <Reveal style={{ maxWidth: '780px', marginBottom: 'var(--space-xl)' }}>
            <span className="eyebrow">El caso de negocio</span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)' }}>
              Esto ya no es reputación. <span style={{ color: 'var(--color-primary)' }}>Es negocio.</span>
            </h2>
            <p className="lead" style={{ marginTop: 'var(--space-md)' }}>
              El costo de no actuar frente a la pérdida de naturaleza puede alcanzar entre 10 y 25 billones de dólares. Así genera valor la sostenibilidad hoy:
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', borderTop: '1px solid var(--color-line)' }}>
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 90} style={{ padding: 'var(--space-lg) var(--space-lg) var(--space-lg) 0', borderBottom: '1px solid var(--color-line)' }}>
                <s.icon size={26} color="var(--color-forest)" strokeWidth={1.75} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', lineHeight: 1, color: 'var(--color-accent)', marginTop: '14px', letterSpacing: '-0.03em' }}>
                  {s.value}
                </div>
                <p style={{ marginTop: '10px', color: 'var(--color-text)', fontWeight: 500, fontSize: '1rem', maxWidth: '24ch' }}>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Servicios (preview) ---------- */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
            <Reveal>
              <span className="eyebrow">Qué hacemos</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Soluciones ambientales integrales</h2>
              <p className="lead" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                Cubrimos todo el ciclo: del diagnóstico y la regularización al seguimiento, la fiscalización y la gestión de residuos.
              </p>
              <Link to="/servicios" className="btn btn-outline">
                Ver todos los servicios <ArrowRight size={18} />
              </Link>
              <div style={{ marginTop: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16 / 10', boxShadow: 'var(--shadow-md)' }}>
                <img
                  src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=900&q=80&auto=format&fit=crop"
                  alt="Río de aguas limpias entre rocas"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Reveal>

            <Reveal delay={120} style={{ display: 'flex', flexDirection: 'column' }}>
              {SERVICES.map((s, i) => (
                <Link
                  key={i}
                  to="/servicios"
                  className="service-row"
                  style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: 'var(--space-lg) 0', borderBottom: '1px solid var(--color-line)', textDecoration: 'none' }}
                >
                  <span style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <s.icon size={22} strokeWidth={1.75} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.2rem', color: 'var(--color-secondary)', letterSpacing: '-0.01em' }}>{s.title}</span>
                      <ArrowUpRight size={18} className="service-arrow" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                    </span>
                    <span style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: '4px', fontSize: '0.98rem' }}>{s.text}</span>
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Quiénes somos / equipo ---------- */}
      <section id="quienes-somos" className="section">
        <div className="container">
          <Reveal style={{ maxWidth: '720px', marginBottom: 'var(--space-xl)' }}>
            <span className="eyebrow">Quiénes somos</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              El equipo detrás del <span style={{ color: 'var(--color-primary)' }}>impacto</span>
            </h2>
            <p className="lead" style={{ marginTop: 'var(--space-md)' }}>
              Profesionales apasionados por el desarrollo sostenible. Combinamos experiencia técnica y visión estratégica para impulsar la transformación que tu empresa necesita.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 120} className="card card-hover" style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
                <div style={{ flexShrink: 0, width: '116px', height: '116px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-line)' }}>
                  <img src={m.img} alt={m.name} width="116" height="116" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.45rem', marginBottom: '2px' }}>{m.name}</h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-subtitle)', marginBottom: '10px' }}>{m.role}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6 }}>{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contacto ---------- */}
      <section id="contacto" className="section bg-gradient">
        <div className="container container-narrow">
          <Reveal style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Hablemos</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Impulsemos tu creación de valor</h2>
            <p className="lead" style={{ marginTop: 'var(--space-sm)', marginLeft: 'auto', marginRight: 'auto' }}>
              Déjanos un mensaje. Generamos impacto real, medible y sostenible en tu organización.
            </p>
          </Reveal>

          <Reveal className="card" style={{ padding: 'clamp(1.5rem, 4vw, var(--space-xl))' }}>
            {status === 'success' ? (
              <div style={{ background: 'rgba(62, 90, 58, 0.08)', color: 'var(--color-forest)', padding: '28px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(62, 90, 58, 0.2)' }}>
                <h3 style={{ margin: '0 0 8px 0', color: 'var(--color-forest)' }}>¡Mensaje enviado!</h3>
                <p style={{ margin: 0, color: 'var(--color-text)' }}>Nuestro equipo se pondrá en contacto contigo muy pronto.</p>
                <button className="btn btn-outline" style={{ marginTop: '18px' }} onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                  <div style={fieldStyle}>
                    <label htmlFor="nombre" style={labelStyle}><User size={16} color="var(--color-primary)" /> Nombre completo</label>
                    <input type="text" id="nombre" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej. María Pérez" style={inputStyle} />
                  </div>
                  <div style={fieldStyle}>
                    <label htmlFor="email" style={labelStyle}><Mail size={16} color="var(--color-primary)" /> Correo electrónico</label>
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="maria@empresa.com" style={inputStyle} />
                  </div>
                </div>
                <div style={fieldStyle}>
                  <label htmlFor="mensaje" style={labelStyle}><MessageSquare size={16} color="var(--color-primary)" /> ¿En qué podemos ayudarte?</label>
                  <textarea id="mensaje" required rows="5" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} placeholder="Quisiera información sobre asesoría y gestión ambiental..." style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#C0392B', fontSize: '0.92rem', margin: 0 }}>Ocurrió un error al enviar tu mensaje. Intenta nuevamente.</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ minWidth: '210px', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Enviando...' : (<>Enviar mensaje <Send size={18} /></>)}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <style>{`
        .service-row { transition: padding-left 280ms var(--ease-out); }
        .service-row:hover { padding-left: 10px; }
        .service-row:hover .service-arrow { color: var(--color-primary); transform: translate(2px, -2px); transition: transform 220ms, color 220ms; }
        .service-row .service-arrow { transition: transform 220ms, color 220ms; }
        input:focus, textarea:focus { border-color: var(--color-primary) !important; box-shadow: 0 0 0 3px rgba(168, 80, 30, 0.12) !important; }
      `}</style>
    </div>
  );
}

const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--color-secondary)' };
const inputStyle = {
  padding: '13px 16px',
  borderRadius: 'var(--radius-sm)',
  border: '1.5px solid var(--color-line)',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 220ms, box-shadow 220ms',
};
