import { CheckCircle, Zap, BookOpen, Leaf } from 'lucide-react';
import { ShaderBackground } from '../../components/ui/HeroShader';
import SEO from '../../components/SEO';

export default function Servicios() {
  return (
    <div>
      <SEO 
        title="Servicios Estratégicos | Interambiente" 
        description="Acompañamos a las organizaciones en su transición hacia la sostenibilidad global." 
      />
      <ShaderBackground minHeight="auto">
        <section className="section" style={{ paddingBottom: 'var(--space-xl)', width: '100%' }}>
          <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ color: '#fff' }}>Nuestros <span style={{ color: '#6ee7b7' }}>Servicios</span></h1>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>Acompañamos a las organizaciones en su transición hacia la sostenibilidad con un enfoque integral y medible.</p>
          </div>
        </section>
      </ShaderBackground>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
            
            <ServiceCard 
              icon={<Leaf size={40} color="var(--color-primary)" />}
              title="Consultoría ESG"
              description="Ayudamos a construir estrategias de sostenibilidad ambiental, social y de gobernanza que maximicen el impacto positivo, cumpliendo normativas internacionales."
              benefits={[
                "Reportes de sostenibilidad",
                "Gestión de huella de carbono",
                "Mapeo de materialidad ESG"
              ]}
            />

            <ServiceCard 
              icon={<Zap size={40} color="var(--color-accent)" />}
              title="Innovación Corporativa"
              description="Repensamos los modelos de negocio tradicionales hacia sistemas circulares, identificando nuevas fuentes de ingresos basados en impacto sostenible."
              benefits={[
                "Modelos de economía circular",
                "Ecodiseño de productos",
                "Eficiencia en cadena de valor"
              ]}
            />

            <ServiceCard 
              icon={<BookOpen size={40} color="var(--color-complementary)" />}
              title="Capacitación y Cultura"
              description="Transformamos el mindset de la organización mediante programas formativos y acompañamiento continuo que arraigan la sostenibilidad en el ADN corporativo."
              benefits={[
                "Workshops para ejecutivos",
                "Sensibilización de equipos base",
                "Desarrollo de liderazgo sostenible"
              ]}
            />

          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, benefits }) {
  return (
    <div className="glass-panel" style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s' }}
       onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
       onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ marginBottom: 'var(--space-md)' }}>{icon}</div>
      <h3 style={{ color: 'var(--color-secondary)' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', flex: 1, marginBottom: 'var(--space-lg)' }}>{description}</p>
      
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {benefits.map((benefit, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
