import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SEO from '../../components/SEO';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('intamb_portfolio')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setProjects(data);
      } catch (err) {
        console.warn('Aún no se configura la tabla.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <SEO
        title="Portafolio de Proyectos y Clientes | Interambiente SA"
        description="Organizaciones que han confiado su arquitectura sostenible y cumplimiento ambiental a nuestro equipo de técnicos."
      />

      <PageHero
        imageId="1470071459604-3b5ec3a7fe05"
        imageAlt="Cordillera verde recorrida por un camino"
        eyebrow="Portafolio"
        title={<>Proyectos que dejan <span style={{ color: 'var(--color-accent)' }}>huella</span></>}
        subtitle="Casos de éxito y proyectos integrales de sostenibilidad de las organizaciones que confían en nosotros."
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: 'var(--color-bg-alt)' }} />
                  <div style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ height: '20px', width: '60%', background: 'var(--color-bg-alt)', borderRadius: '6px', marginBottom: '12px' }} />
                    <div style={{ height: '14px', width: '90%', background: 'var(--color-bg-alt)', borderRadius: '6px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <Reveal className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-lg)', maxWidth: '560px', margin: '0 auto' }}>
              <span style={{ display: 'inline-flex', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-alt)', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                <Briefcase size={30} color="var(--color-primary)" />
              </span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Portafolio en construcción</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                Estamos preparando los casos de éxito. Mientras tanto, conversemos sobre tu proyecto.
              </p>
              <Link to="/contacto" className="btn btn-primary">Hablar con un experto <ArrowRight size={18} /></Link>
            </Reveal>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 90} className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {project.image_url && (
                    <div style={{ height: '220px', background: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', borderBottom: '1px solid var(--color-line)' }}>
                      <img src={project.image_url} alt={project.title} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  )}
                  <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.35rem', marginBottom: 'var(--space-sm)' }}>{project.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6 }}>{project.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
