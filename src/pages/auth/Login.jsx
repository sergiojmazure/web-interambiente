import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Auth login normal de supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas: " + error.message);
    } else if (data.user) {
      navigate('/admin');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--color-bg-light)' }}>
      <div className="glass-panel" style={{ padding: 'var(--space-xl)', maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <img src="/logotipo-interambiente.webp" alt="Logo" width="200" height="187" style={{ height: '40px', width: 'auto', marginBottom: 'var(--space-sm)' }} />
          <h2 style={{ color: 'var(--color-secondary)' }}>Acceso CMS</h2>
        </div>
        
        {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: 'var(--space-md)' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Contraseña</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
            <LogIn size={20} style={{ marginRight: '8px' }} />
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
