import { CheckCircle, ShieldCheck, FileText, Recycle, Droplet, ClipboardList, Leaf } from 'lucide-react';
import { ShaderBackground } from '../../components/ui/HeroShader';
import SEO from '../../components/SEO';

export default function Servicios() {
  return (
    <div>
      <SEO 
        title="Nuestros Servicios | Interambiente" 
        description="Acompañamos a las organizaciones con asesoría y gestión ambiental para el cumplimiento normativo y desarrollo sostenible." 
      />
      <ShaderBackground minHeight="auto">
        <section className="section" style={{ paddingBottom: 'var(--space-xl)', width: '100%' }}>
          <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ color: '#fff' }}>Nuestros <span style={{ color: '#6ee7b7' }}>Servicios</span></h1>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>Acompañamiento técnico y soluciones ambientales personalizadas para el cumplimiento de normativas y la gestión adecuada de proyectos corporativos.</p>
          </div>
        </section>
      </ShaderBackground>

      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          
          {/* Asesoría y Seguimiento Ambiental */}
          <ServiceSection 
            icon={<ClipboardList size={40} color="var(--color-primary)" />}
            title="Asesoría y Seguimiento Ambiental"
            content={(
              <>
                <p style={{ marginBottom: 'var(--space-sm)' }}>El servicio que se ofrece a nuestros clientes consiste en brindar el acompañamiento y asesoría técnica necesaria para generar soluciones ambientales aplicables, de una manera personalizada para cada requerimiento que presenta los diversos proyectos y actividades, mediante el análisis, reconocimiento, identificación, coordinación, ejecución y seguimiento, con la finalidad de implementar una gestión ambiental adecuada para el cumplimiento de los diversos requerimientos legales, administrativos y específicos.</p>
                <p style={{ marginBottom: 'var(--space-sm)' }}>A través de este servicio, se mantendrá un proceso interactivo entre la empresa y el equipo asesor, integrando las actividades diarias conjuntamente con un óptimo manejo ambiental, atendiendo oportunamente las necesidades presentes.</p>
                <p>La ejecución y monitoreo continuo de las medidas contempladas dentro del plan de manejo ambiental en todas sus fases, permite proporcionar a las Autoridades Ambientales y a otros actores información veraz referente a la gestión ambiental realizada.</p>
              </>
            )}
          />

          {/* Regularización y Fiscalización Ambiental */}
          <ServiceSection 
            icon={<ShieldCheck size={40} color="var(--color-accent)" />}
            title="Regularización y Fiscalización Ambiental"
            content={(
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)', fontSize: '1.2rem' }}>Regularización</h4>
                  <p>Ofrecemos a nuestros clientes la ejecución integral de procesos de regularización ambiental de proyectos, a través de la obtención de permisos ambientales obligatorios, ante la Autoridad Ambiental Nacional y las Autoridades Ambientales Competentes.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)', fontSize: '1.2rem' }}>Fiscalización Ambiental</h4>
                  <p>En el servicio de Fiscalización Ambiental se evalúa el cumplimiento legal y el cumplimiento al plan de manejo ambiental derivado de los permisos ambientales de la empresa, con el propósito de generar planes de acción que identifican la causa raíz de las desviaciones, proponiendo soluciones eficientes para corregir los hallazgos.</p>
                </div>
              </div>
            )}
          />

          {/* Estudios, Planes, Programas y Procedimientos */}
          <ServiceSection 
            icon={<FileText size={40} color="var(--color-complementary)" />}
            title="Estudios, Planes, Programas y Procedimientos"
            content={(
              <>
                <p style={{ marginBottom: 'var(--space-md)' }}>Según los requerimientos de cada uno de nuestros clientes, ofrecemos:</p>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  {[
                    "Estudios de Impacto Ambiental",
                    "Registros Ambientales",
                    "Informes Ambientales de Cumplimiento Anual y Bianual",
                    "Auditorías Ambientales de Cumplimiento",
                    "Elaboración de Planes de Manejo Ambiental",
                    "Registro de Generador de Desechos Peligrosos",
                    "Declaraciones anuales de residuos peligrosos",
                    "Planes y programas de minimización de residuos",
                    "Procedimientos e instrucciones de gestión ambiental"
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: 'var(--color-bg-light)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <CheckCircle size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--color-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          />

          {/* Gestión de Residuos Sólidos y Otros Servicios */}
          <ServiceSection 
            icon={<Recycle size={40} color="var(--color-primary)" />}
            title="Gestión de Residuos Sólidos y Otros Servicios"
            content={(
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.2rem' }}>
                    <Droplet size={24} /> Diseño y construcción de Plantas de Tratamiento de Aguas Residuales.
                  </h4>
                  <p>Ofrecemos la asesoría sobre el diseño, construcción e implementación de Plantas de Tratamiento de Aguas Residuales según los requerimientos técnicos aplicables para nuestros clientes.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.2rem' }}>
                    <Leaf size={24} /> Gestión de Residuos sólidos orgánicos
                  </h4>
                  <p>Recolección de residuos sólidos orgánicos en volúmenes industriales (hasta 2000 kg/día), para su aprovechamiento y/o disposición final a través de gestores autorizados.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.2rem' }}>
                    <Recycle size={24} /> Gestión de Residuos sólidos reciclables
                  </h4>
                  <p>Compra y venta de material reciclable como vidrio, plástico, papel y cartón para su entrega inmediata a centros de reciclaje para su procesamiento.</p>
                </div>
              </div>
            )}
          />

        </div>
      </section>
    </div>
  );
}

function ServiceSection({ icon, title, content }) {
  return (
    <div className="glass-panel" style={{ 
      padding: 'var(--space-xl)', 
      display: 'flex', 
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      borderLeft: '4px solid var(--color-primary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ padding: '16px', background: 'var(--color-bg-alt)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', color: 'var(--color-secondary)', margin: 0, lineHeight: 1.2 }}>{title}</h2>
      </div>
      <div style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
        {content}
      </div>
    </div>
  );
}
