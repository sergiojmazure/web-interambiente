import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ portfolio: 0, novedades: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: portfolioCount } = await supabase.from('intamb_portfolio').select('*', { count: 'exact', head: true });
        const { count: postsCount } = await supabase.from('intamb_posts').select('*', { count: 'exact', head: true });

        setStats({
          portfolio: portfolioCount || 0,
          novedades: postsCount || 0
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'var(--color-secondary)', fontSize: '2rem', marginBottom: 'var(--space-md)' }}>Resumen del Administrador</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>Bienvenido al sistema de gestión de contenidos de Interambiente.</p>

      {loading ? (
        <p>Calculando estadísticas...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)', background: '#fff' }}>
            <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '12px' }}>
              <Briefcase size={32} color="var(--color-accent)" />
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--color-secondary)' }}>{stats.portfolio}</p>
              <p style={{ color: 'var(--color-text-muted)' }}>Proyectos en Portafolio</p>
              <Link to="/admin/portfolio" style={{ fontSize: '0.9rem', marginTop: '8px', display: 'inline-block' }}>Administrar &rarr;</Link>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)', background: '#fff' }}>
            <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '12px' }}>
              <FileText size={32} color="var(--color-complementary)" />
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--color-secondary)' }}>{stats.novedades}</p>
              <p style={{ color: 'var(--color-text-muted)' }}>Publicaciones y Novedades</p>
              <Link to="/admin/novedades" style={{ fontSize: '0.9rem', marginTop: '8px', display: 'inline-block' }}>Administrar &rarr;</Link>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-xl)', background: '#fff', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid #e5e7eb' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary)', marginBottom: 'var(--space-md)' }}>
          <AlertCircle size={20} color="var(--color-accent)"/> Notas Rápidas
        </h3>
        <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <li>Para subir imágenes, usa URLs públicas o el gestor de archivos.</li>
          <li>Las novedades se muestran automáticamente en la web con fecha de creación.</li>
          <li>Asegúrate de respetar dimensiones proporcionales (ej: 16:9) al cargar nuevos proyectos.</li>
        </ul>
      </div>
    </div>
  );
}
