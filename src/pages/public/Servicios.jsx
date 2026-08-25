import { Check, ShieldCheck, FileText, Recycle, Droplet, ClipboardCheck, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/ui/PageHero';
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
        title="Servicios de asesoría y gestión ambiental | Interambiente"
        description="Regularización, fiscalización, estudios de impacto, planes de manejo y gestión de residuos para el cumplimiento de la normativa ambiental en Ecuador."
      />

      <PageHero
        imageId="1437482078695-73f5ca6c96e2"
        imageAlt="Río de aguas limpias entre rocas en un bosque"
        eyebrow="Servicios"
        title={<>Soluciones ambientales <span style={{ color: 'var(--color-accent)' }}>integrales</span></>}
        subtitle="Acompañamiento técnico en cada etapa del ciclo ambiental, desde el diagnóstico hasta la mejora continua."
      />

      <ServiceBlock
        icon={ClipboardCheck}
        accent={{ tint: "#C1652E", ink: "#9E4E1C" }}
        title="Asesoría y seguimiento ambiental"
        bg="var(--color-bg)"
      >
        <p>Brindamos el acompañamiento y la asesoría técnica necesaria para generar soluciones ambientales aplicables, de manera personalizada para cada requerimiento de tus proyectos y actividades: análisis, reconocimiento, identificación, coordinación, ejecución y seguimiento, con el fin de implementar una gestión ambiental adecuada para el cumplimiento de los requerimientos legales, administrativos y específicos.</p>
        <p>Mantenemos un proceso interactivo entre tu empresa y el equipo asesor, integrando las actividades diarias con un óptimo manejo ambiental y atendiendo oportunamente las necesidades presentes.</p>
        <p>La ejecución y el monitoreo continuo de las medidas del plan de manejo ambiental, en todas sus fases, permite proporcionar a las Autoridades Ambientales información veraz sobre la gestión realizada.</p>
      </ServiceBlock>

      <ServiceBlock
        icon={ShieldCheck}
        accent={{ tint: "#8A9A5B", ink: "#5F6E3A" }}
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

      <ServiceBlock
        icon={FileText}
        accent={{ tint: "#D9A441", ink: "#8A6412" }}
        title="Estudios, planes, programas y procedimientos"
        bg="var(--color-bg)"
      >
        <p style={{ marginBottom: 'var(--space-lg)' }}>Según los requerimientos de cada cliente, elaboramos y gestionamos:</p>
        <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '2px 28px', padding: 0 }}>
          {ESTUDIOS.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px', padding: '11px 0', borderBottom: '1px solid var(--color-line)' }}>
              <Check size={17} color="var(--color-olivo-deep)" strokeWidth={2.4} style={{ flexShrink: 0, marginTop: '5px' }} />
              <span style={{ fontSize: '1rem', color: 'var(--color-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </ServiceBlock>

      <ServiceBlock
        icon={Recycle}
        accent={{ tint: "#C1652E", ink: "#9E4E1C" }}
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

      <section className="section bg-dark">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
          <div style={{ maxWidth: '30ch' }}>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)' }}>¿Necesitas regularizar tu proyecto?</h2>
            <p style={{ color: 'rgba(237, 231, 218, 0.74)', fontSize: '1.08rem', marginTop: 'var(--space-sm)' }}>
              Conversemos y diseñamos la ruta de cumplimiento que tu operación necesita.
            </p>
          </div>
          <Link to="/contacto" className="btn btn-primary">
            Agendar diagnóstico <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceBlock({ icon, accent, title, bg, children }) {
  const Icon = icon;
  return (
    <section className="section" style={{ backgroundColor: bg }}>
      <div className="container">
        <div className="service-block-grid">
          <div>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '54px', height: '54px', borderRadius: 'var(--radius-md)',
                background: `${accent.tint}1F`, color: accent.ink, marginBottom: 'var(--space-md)',
              }}
            >
              <Icon size={26} strokeWidth={1.75} />
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)' }}>{title}</h2>
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {children}
          </div>
        </div>
      </div>
      <style>{`
        .service-block-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-lg); align-items: start; }
        @media (min-width: 900px) { .service-block-grid { grid-template-columns: 5fr 7fr; gap: var(--space-2xl); } }
      `}</style>
    </section>
  );
}

function SubItem({ icon, title, children }) {
  const Icon = icon;
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-olivo-deep)' }}>
        <Icon size={21} strokeWidth={1.75} />
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
  fontSize: '1.18rem',
  color: 'var(--color-secondary)',
  marginBottom: 'var(--space-sm)',
};
