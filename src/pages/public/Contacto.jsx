import { useState } from 'react';
import { Send, MapPin, Phone, Mail, HelpCircle, AlertCircle, Building, Clock, FileText, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const faqs = [
    {
      q: '¿Qué es la Regularización Ambiental y por qué mi empresa la necesita?',
      a: 'La regularización es el proceso legal mediante el cual una empresa obtiene los permisos necesarios (certificados, registros o licencias ambientales) para operar según la normativa vigente (SUIA y MAATE). Previene clausuras y garantiza que tus operaciones sean sostenibles.',
      icon: <FileText className="text-primary mb-3" size={28} />
    },
    {
      q: '¿Qué tipo de industrias están obligadas a cumplir normativas ambientales?',
      a: 'Toda actividad descrita en el catálogo nacional de actividades económicas que genere impactos. Esto incluye sectores de construcción, manufactura, alimentos, minería, hidrocarburos, y servicios de transporte, almacenamiento y turismo.',
      icon: <Building className="text-primary mb-3" size={28} />
    },
    {
      q: '¿Cuáles son las sanciones por no regularizar mi proyecto?',
      a: 'El incumplimiento ambiental acarrea multas económicas severas de hasta 200 salarios básicos unificados, suspensiones de operación temporales e incluso el cierre definitivo de las instalaciones, perjudicando económicamente a la empresa.',
      icon: <AlertCircle className="text-primary mb-3" size={28} />
    },
    {
      q: '¿Cuánto tiempo aproximado toma obtener una Licencia Ambiental?',
      a: 'Depende fuertemente de la complejidad del proyecto y de la rapidez gubernamental. Un Registro puede tomar semanas y una Licencia Ambiental compleja con participación ciudadana de 3 a 8 meses. Nuestros técnicos aceleran estos plazos drásticamente.',
      icon: <Clock className="text-primary mb-3" size={28} />
    },
    {
      q: '¿En qué consiste una Auditoría Ambiental de Cumplimiento (AAC)?',
      a: 'Es una revisión técnica obligatoria para proyectos que ya tienen Licencia Ambiental (generalmente al año de expedición y luego cada dos). Nosotros evaluamos en terreno que tu empresa cumpla la normativa prometida para evitar amonestaciones oficiales.',
      icon: <CheckCircle className="text-primary mb-3" size={28} />
    },
    {
      q: '¿Por qué elegir a Interambiente como mis consultores ambientales?',
      a: 'Con décadas de experiencia liderando macro-proyectos, tenemos un equipo multidisciplinar que no solo consigue un simple papel burocrático, sino que diseña ingeniería real para minimizar riesgos, certificar a su empresa y darle aval de sustentabilidad.',
      icon: <HelpCircle className="text-primary mb-3" size={28} />
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Usamos FormSubmit.co con AJAX: Simple, elegante y no requiere backend ni contraseñas.
    // OJO: El primer envío te mandará un correo a soastec@gmail.com pidiéndote confirmar (Activar).
    try {
      const response = await fetch("https://formsubmit.co/ajax/soastec@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Asunto: "Nuevo Contacto desde la Web Interambiente",
            Nombre: formData.name,
            Email: formData.email,
            Telefono: formData.phone,
            Empresa: formData.company,
            Mensaje: formData.message
        })
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

      {/* Hero */}
      <section className="bg-gradient section" style={{ paddingBottom: 'var(--space-xxl)' }}>
        <div className="container text-center">
          <h1 style={{ color: 'var(--color-secondary)' }}>Estamos aquí para <span style={{ color: 'var(--color-primary)' }}>Ayudarte</span></h1>
          <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>Déjanos asegurarnos de que el cumplimiento técnico y legal de tu proyecto sea impecable de principio a fin.</p>
        </div>
      </section>

      {/* FAQ SEO Section */}
      <section className="section bg-light" style={{ marginTop: '-4rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 className="heading-secondary">Preguntas Frecuentes (FAQ)</h2>
            <p className="text-muted">Despeja tus dudas maestras sobre normativas antes de hablarnos.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ padding: 'var(--space-lg)' }}>
                {faq.icon}
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--color-secondary)' }}>{faq.q}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
          
          {/* Form */}
          <div style={{ background: '#fff', padding: 'var(--space-xl)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h2 className="heading-secondary" style={{ marginBottom: '24px' }}>Escríbenos Ahora</h2>
            
            {status === 'success' ? (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle size={48} style={{ margin: '0 auto 16px auto' }} />
                <h3>¡Mensaje Enviado!</h3>
                <p>Nuestros ingenieros han recibido tu solicitud y se contactarán contigo muy pronto.</p>
                <button className="btn btn-outline" style={{ marginTop: '16px' }} onClick={() => setStatus('idle')}>Enviar otro</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Nombre Completo *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Teléfono / WhatsApp *</label>
                    <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Correo Electrónico *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Empresa / Organización</label>
                    <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>¿En qué podemos ayudarte? *</label>
                  <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9', resize: 'vertical' }}></textarea>
                </div>

                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>Ocurrió un error de red al procesar tu solicitud. Intenta nuevamente.</p>
                )}

                <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                  {status === 'loading' ? 'Enviando...' : (
                    <>
                      Enviar Consulta <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
            <div>
              <h2 className="heading-secondary" style={{ marginBottom: '10px' }}>Datos de la Oficina</h2>
              <p className="text-muted" style={{ marginBottom: '30px' }}>Conversa directamente con nuestros ingenieros directores o agenda una cita.</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '16px', color: '#BD5817' }}>
                <MapPin size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--color-secondary)' }}>Ubicación Central</h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>Edificio IQON<br/>Av. de los Shyris y Suecia<br/>Quito, Ecuador</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: '#e0e7ff', padding: '16px', borderRadius: '16px', color: '#4f46e5' }}>
                <Phone size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--color-secondary)' }}>Líneas Directas</h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <a href="tel:+593984180479" style={{ color: 'inherit', textDecoration: 'none' }}>+593 98 418 0479</a><br/>
                  <a href="tel:+593988588532" style={{ color: 'inherit', textDecoration: 'none' }}>+593 98 858 8532</a>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: '#dcfce7', padding: '16px', borderRadius: '16px', color: '#166534' }}>
                <Mail size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--color-secondary)' }}>Buzón Corporativo</h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <a href="mailto:a.recalde@interambientesa.com" style={{ color: 'inherit', textDecoration: 'none' }}>a.recalde@interambientesa.com</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
