import { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Briefcase, FileText, LogOut, Home, ShieldCheck } from 'lucide-react';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando administrador...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f4f5' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--color-bg)', borderRight: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid #e4e4e7' }}>
          <img src="/logotipo-interambiente.webp" alt="Logo" width="200" height="187" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Panel de Control</p>
        </div>
        
        <nav style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link to="/admin" className="admin-link">
            <LayoutDashboard size={20} /> Resumen
          </Link>
          <Link to="/admin/portfolio" className="admin-link">
            <Briefcase size={20} /> Portafolio
          </Link>
          <Link to="/admin/novedades" className="admin-link">
            <FileText size={20} /> Novedades
          </Link>
          <Link to="/admin/sellos" className="admin-link">
            <ShieldCheck size={20} /> Supabase Sellos
          </Link>
        </nav>

        <div style={{ padding: 'var(--space-md)', borderTop: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link to="/" target="_blank" className="admin-link">
            <Home size={20} /> Ver Sitio Web
          </Link>
          <button onClick={handleLogout} className="admin-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', color: '#ef4444' }}>
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 'var(--space-xl)', overflowY: 'auto' }}>
        <Outlet />
      </main>

      <style>{`
        .admin-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          color: var(--color-text);
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.2s;
          font-weight: 500;
        }
        .admin-link:hover {
          background: #f4f4f5;
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
}
