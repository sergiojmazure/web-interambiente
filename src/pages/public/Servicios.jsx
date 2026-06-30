import { CheckCircle2, ShieldCheck, FileText, Recycle, Droplet, ClipboardCheck, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SEO from '../../components/SEO';

const ESTUDIOS = [
  'Estudios de Impacto Ambiental',
  'Registros Ambientales',
  'Informes Ambientales de Cumplimiento Anual y Bianual',
  'Auditorías Ambientales de Cumplimiento',
  'Elaboración de Planes de Manejo Ambiental',
  'Registro de Generador de Desechos Peligrosos',
  'Declaraciones anuales de residuos peligrosos',
  'Planes y programas de minimización de residuos',
  'Procedimientos e instrucciones de gestión ambiental',
];

export default function Servicios() {
  return (
    <div>
      <SEO
        title="Nuestros Servicios | Interambiente"
        description="Acompañamos a las organizaciones con asesoría y gestión ambiental para el cumplimiento normativo y desarrollo sostenible."
      />

      <PageHero
        imageId="1437482078695-73f5ca6c96e2"
        imageAlt="Río de aguas limpias entre rocas en un bosque"
        eyebrow="Servicios"
        title={<>Soluciones ambientales <em style={{ fontStyle: 'italic', color: '#EBA85E', fontWeight: 500 }}>integrales</em></>}
        subtitle="Acompañamiento técnico y soluciones a medida para el cumplimiento normativo y la gestión de tus proyectos."
      />

      {/* 01 — Asesoría */}
      <ServiceBlock
        n="01"
        icon={ClipboardCheck}
        title="Asesoría y seguimiento ambiental"
        bg="var(--color-bg)"
      >
        <p>Brindamos el acompañamiento y la asesoría técnica necesaria para generar soluciones ambientales aplicables, de manera personalizada para cada requerimiento de tus proyectos y actividades: análisis, reconocimiento, identificación, coordinación, ejecución y seguimiento, con el fin de implementar una gestión ambiental adecuada para el cumplimiento de los requerimientos legales, administrativos y específicos.</p>
        <p>Mantenemos un proceso interactivo entre tu empresa y el equipo asesor, integrando las actividades diarias con un óptimo manejo ambiental y atendiendo oportunamente las necesidades presentes.</p>
        <p>La ejecución y el monitoreo continuo de las medidas del plan de manejo ambiental, en todas sus fases, permite proporcionar a las Autoridades Ambientales información veraz sobre la gestión realizada.</p>
      </ServiceBlock>

      {/* 02 — Regularización y fiscalización */}
      <ServiceBlock
        n="02"
        icon={ShieldCheck}
        title="Regularización y fiscalización ambiental"
        bg="var(--color-bg-light)"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-lg)' }}>
          <div>
            <h3 style={subHeadStyle}>Regularización</h3>
            <p>Ejecución integral de los procesos de regularización ambiental de proyectos, mediante la obtención de los permisos ambientales obligatorios ante la Autoridad Ambiental Nacional y las Autoridades Ambientales Competentes.</p>
          </div>
          <div>
            <h3 style={subHeadStyle}>Fiscalización</h3>
            <p>Evaluamos el cumplimiento legal y del plan de manejo ambiental derivado de los permisos, generando planes de acción que identifican la causa raíz de las desviaciones y proponen soluciones eficientes para corregir los hallazgos.</p>
          </div>
        </div>
      </ServiceBlock>

      {/* 03 — Estudios */}
      <ServiceBlock
        n="03"
        icon={FileText}
        title="Estudios, planes, programas y procedimientos"
        bg="var(--color-bg)"
      >
        <p style={{ marginBottom: 'var(--space-lg)' }}>Según los requerimientos de cada cliente, elaboramos y gestionamos:</p>
        <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', padding: 0 }}>
          {ESTUDIOS.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-line)' }}>
              <CheckCircle2 size={19} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </ServiceBlock>

      {/* 04 — Residuos y otros */}
      <ServiceBlock
        n="04"
        icon={Recycle}
        title="Gestión de residuos sólidos y otros servicios"
        bg="var(--color-bg-light)"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <SubItem icon={Droplet} title="Plantas de tratamiento de aguas residuales">
            Asesoría sobre el diseño, construcción e implementación de Plantas de Tratamiento de Aguas Residuales según los requerimientos técnicos aplicables.
          </SubItem>
          <SubItem icon={Leaf} title="Residuos sólidos orgánicos">
            Recolección en volúmenes industriales (hasta 2000 kg/día) para su aprovechamiento o disposición final a través de gestores autorizados.
          </SubItem>
          <SubItem icon={Recycle} title="Residuos sólidos reciclables">
            Compra y venta de material reciclable (vidrio, plástico, papel y cartón) para su entrega inmediata a centros de reciclaje.
          </SubItem>
        </div>
      </ServiceBlock>

      {/* CTA */}
      <section className="section bg-dark">
        <div className="container text-center">
          <Reveal style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)' }}>¿Necesitas regularizar tu proyecto?</h2>
            <p style={{ color: 'rgba(237, 231, 218, 0.78)', fontSize: '1.15rem', margin: 'var(--space-md) auto var(--space-lg)' }}>
              Conversa con nuestros ingenieros y diseñemos juntos la ruta de cumplimiento que tu operación necesita.
            </p>
            <Link to="/contacto" className="btn btn-primary">
              Solicitar asesoría <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ServiceBlock({ n, icon, title, bg, children }) {
  const Icon = icon;
  return (
    <section className="section" style={{ backgroundColor: bg }}>
      <div className="container">
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'var(--col)', gap: 'var(--space-xl)', alignItems: 'start' }} className="service-block-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'var(--space-md)' }}>
                <span style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-alt)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary-soft)', letterSpacing: '0.05em' }}>{n}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.12 }}>{title}</h2>
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '1.08rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {children}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        .service-block-grid { --col: 1fr; }
        @media (min-width: 900px) { .service-block-grid { --col: 5fr 7fr; } }
      `}</style>
    </section>
  );
}

function SubItem({ icon, title, children }) {
  const Icon = icon;
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-complementary)' }}>
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div>
        <h3 style={{ ...subHeadStyle, marginBottom: '4px' }}>{title}</h3>
        <p style={{ margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

const subHeadStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '1.2rem',
  color: 'var(--color-secondary)',
  marginBottom: 'var(--space-sm)',
};
