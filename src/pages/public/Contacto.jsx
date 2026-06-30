import { useState } from 'react';
import { Send, MapPin, Phone, Mail, HelpCircle, AlertCircle, Building, Clock, FileText, CheckCircle2 } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SEO from '../../components/SEO';

const FAQS = [
  { icon: FileText, q: '¿Qué es la Regularización Ambiental y por qué mi empresa la necesita?', a: 'Es el proceso legal mediante el cual una empresa obtiene los permisos necesarios (certificados, registros o licencias ambientales) para operar según la normativa vigente (SUIA y MAATE). Previene clausuras y garantiza que tus operaciones sean sostenibles.' },
  { icon: Building, q: '¿Qué industrias están obligadas a cumplir normativas ambientales?', a: 'Toda actividad del catálogo nacional de actividades económicas que genere impactos: construcción, manufactura, alimentos, minería, hidrocarburos, transporte, almacenamiento y turismo, entre otras.' },
  { icon: AlertCircle, q: '¿Cuáles son las sanciones por no regularizar mi proyecto?', a: 'El incumplimiento acarrea multas de hasta 200 salarios básicos unificados, suspensiones temporales e incluso el cierre definitivo de las instalaciones, con un fuerte perjuicio económico.' },
  { icon: Clock, q: '¿Cuánto tiempo toma obtener una Licencia Ambiental?', a: 'Depende de la complejidad del proyecto y de los tiempos gubernamentales. Un Registro puede tomar semanas; una Licencia compleja con participación ciudadana, de 3 a 8 meses. Nuestro equipo acelera estos plazos.' },
  { icon: CheckCircle2, q: '¿En qué consiste una Auditoría Ambiental de Cumplimiento (AAC)?', a: 'Es una revisión técnica obligatoria para proyectos con Licencia Ambiental (al año de expedición y luego cada dos). Evaluamos en terreno que tu empresa cumpla la normativa para evitar amonestaciones.' },
  { icon: HelpCircle, q: '¿Por qué elegir a Interambiente como consultores ambientales?', a: 'Con amplia experiencia liderando macro-proyectos, nuestro equipo multidisciplinar no solo consigue el permiso: diseña ingeniería real para minimizar riesgos y dar aval de sostenibilidad a tu empresa.' },
];

const INFO = [
  { icon: MapPin, label: 'Ubicación central', lines: ['Edificio IQON', 'Av. de los Shyris y Suecia', 'Quito, Ecuador'] },
  { icon: Phone, label: 'Líneas directas', lines: [{ href: 'tel:+593984180479', text: '+593 98 418 0479' }, { href: 'tel:+593988588532', text: '+593 98 858 8532' }] },
  { icon: Mail, label: 'Buzón corporativo', lines: [{ href: 'mailto:info@interambientesa.com', text: 'info@interambientesa.com' }] },
];

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7fd3c128-d3a1-41e3-a603-76ca148ef9d1',
          subject: 'Nuevo Lead desde Formulario PRINCIPAL - Interambiente',
          from_name: 'Web Interambiente',
          Nombre: formData.name,
          Email: formData.email,
          Telefono: formData.phone,
          Empresa: formData.company,
          Mensaje: formData.message,
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="Contacto y Consultoría Ambiental | Interambiente"
        description="Escríbenos para regularizar tu proyecto. Resolvemos tus dudas legales ambientales, licencias y auditorías con expertos."
      />

      <PageHero
        imageId="1518837695005-2083093ee35b"
        imageAlt="Superficie del mar en calma al atardecer"
        eyebrow="Contacto"
        title={<>Estamos aquí para <em style={{ fontStyle: 'italic', color: '#EBA85E', fontWeight: 500 }}>ayudarte</em></>}
        subtitle="Aseguremos que el cumplimiento técnico y legal de tu proyecto sea impecable de principio a fin."
      />

      {/* Formulario + info */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          {/* Form */}
          <Reveal className="card" style={{ padding: 'clamp(1.5rem, 4vw, var(--space-xl))' }}>
            <span className="eyebrow">Escríbenos</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', marginBottom: 'var(--space-lg)' }}>Cuéntanos sobre tu proyecto</h2>

            {status === 'success' ? (
              <div style={{ background: 'rgba(62, 90, 58, 0.08)', color: 'var(--color-forest)', padding: '28px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(62, 90, 58, 0.2)' }}>
                <CheckCircle2 size={44} style={{ margin: '0 auto 12px' }} />
                <h3 style={{ color: 'var(--color-forest)' }}>¡Mensaje enviado!</h3>
                <p style={{ color: 'var(--color-text)' }}>Nuestro equipo ha recibido tu solicitud y se contactará contigo muy pronto.</p>
                <button className="btn btn-outline" style={{ marginTop: '16px' }} onClick={() => setStatus('idle')}>Enviar otro</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                  <Field label="Nombre completo *"><input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} placeholder="María Pérez" /></Field>
                  <Field label="Teléfono / WhatsApp *"><input required type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} placeholder="+593 ..." /></Field>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                  <Field label="Correo electrónico *"><input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} placeholder="maria@empresa.com" /></Field>
                  <Field label="Empresa / Organización"><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} style={inputStyle} placeholder="Tu empresa" /></Field>
                </div>
                <Field label="¿En qué podemos ayudarte? *">
                  <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Cuéntanos sobre tu proyecto o consulta..." />
                </Field>
                {status === 'error' && <p style={{ color: '#C0392B', fontSize: '0.9rem', margin: 0 }}>Ocurrió un error de red. Intenta nuevamente.</p>}
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1, width: '100%' }}>
                  {status === 'loading' ? 'Enviando...' : (<>Enviar consulta <Send size={18} /></>)}
                </button>
              </form>
            )}
          </Reveal>

          {/* Info */}
          <Reveal delay={120} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', paddingTop: 'var(--space-md)' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', marginBottom: '10px' }}>Datos de la oficina</h2>
              <p className="text-muted" style={{ fontSize: '1.05rem' }}>Conversa directamente con nuestros ingenieros directores o agenda una cita.</p>
            </div>
            {INFO.map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-alt)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={24} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{item.label}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                    {item.lines.map((l, i) => (
                      <span key={i}>
                        {typeof l === 'string' ? l : <a href={l.href} style={{ color: 'var(--color-text-muted)' }}>{l.text}</a>}
                        {i < item.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-light">
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: 'var(--space-xl)', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Preguntas frecuentes</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)' }}>Resuelve tus dudas sobre normativa</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 80} className="card" style={{ padding: 'var(--space-lg)' }}>
                <span style={{ display: 'inline-flex', width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-alt)', color: 'var(--color-primary)', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                  <faq.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', lineHeight: 1.3 }}>{faq.q}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.97rem', lineHeight: 1.65 }}>{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .card input:focus, .card textarea:focus { border-color: var(--color-primary) !important; box-shadow: 0 0 0 3px rgba(168, 80, 30, 0.12) !important; }
      `}</style>
    </>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--radius-sm)',
  border: '1.5px solid var(--color-line)',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 220ms, box-shadow 220ms',
};
