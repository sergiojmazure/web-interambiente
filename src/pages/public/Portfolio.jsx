import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase } from 'lucide-react';
import { ShaderBackground } from '../../components/ui/HeroShader';
import SEO from '../../components/SEO';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      // Intentamos cargar la tabla nueva, y validamos la data sin colgar la view
      try {
        const { data, error } = await supabase
          .from('intamb_portfolio')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Aún no se configura la tabla.", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <SEO 
        title="Portfolio de Clientes y Certificaciones | Interambiente SA" 
        description="Organizaciones que han confiado su arquitectura sostenible y cumplimiento ambiental a nuestro equipo de técnicos."
      />
      <ShaderBackground minHeight="auto">
        <section className="section" style={{ paddingBottom: 'var(--space-xl)', width: '100%' }}>
          <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ color: '#fff' }}>Nuestro <span style={{ color: '#6ee7b7' }}>Impacto</span></h1>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>Casos de éxito y portafolio de proyectos integrales de sostenibilidad.</p>
          </div>
        </section>
      </ShaderBackground>

      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Cargando proyectos...</div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-muted)' }}>
              <Briefcase size={56} style={{ margin: '0 auto var(--space-md)', opacity: 0.3 }} />
              <p style={{ fontSize: '1.2rem' }}>Aún no hay proyectos publicados en el portafolio.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
              {projects.map((project) => (
                <div key={project.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                    />
                  )}
                  <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem' }}>{project.title}</h3>
                    <p style={{ color: 'var(--color-text)', marginTop: 'var(--space-sm)' }}>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
