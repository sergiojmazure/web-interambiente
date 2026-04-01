import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck, Plus, Trash2, PowerOff, Power } from 'lucide-react';

export default function AdminSellos() {
  const [sellos, setSellos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    fetchSellos();
  }, []);

  const fetchSellos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sello_clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching sellos", error);
    else setSellos(data || []);
    setLoading(false);
  };

  const handleAddSello = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('sello_clientes')
      .insert([{ name: newName, folder: newFolder, is_active: true }]);
    
    if (error) {
      alert("Error guardando el cliente");
    } else {
      setNewName('');
      setNewFolder('');
      setIsAdding(false);
      fetchSellos();
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const { error } = await supabase
      .from('sello_clientes')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    if (!error) fetchSellos();
  };

  const deleteSello = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este cliente? El widget desaparecerá de su web permanentemente.")) {
      const { error } = await supabase
        .from('sello_clientes')
        .delete()
        .eq('id', id);
      if (!error) fetchSellos();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={32} color="var(--color-primary)" />
          Gestión de Sellos Dinámicos
        </h1>
        <button onClick={() => setIsAdding(!isAdding)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSello} style={{ background: 'white', padding: 'var(--space-md)', borderRadius: '12px', border: '1px solid #e4e4e7', marginBottom: 'var(--space-xl)', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Razón Social / Entidad (Se graba en el halo giratorio)</label>
            <input required type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ej. Innovación IA" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Alias / Carpeta Referencia (Opcional, sólo interno)</label>
            <input type="text" value={newFolder} onChange={e => setNewFolder(e.target.value)} placeholder="Ej. innovacionia" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" className="btn btn-primary">Registrar Cliente</button>
        </form>
      )}

      {loading ? (
        <p>Cargando clientes de sellos...</p>
      ) : sellos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)', background: '#fff', borderRadius: '12px', border: '1px solid #e4e4e7' }}>
          <p>No tienes clientes con Sellos Dinámicos activos.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sellos.map(s => (
            <div key={s.id} style={{ background: 'white', padding: 'var(--space-md)', borderRadius: '12px', border: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 8px 0' }}>
                  {s.name}
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '100px', background: s.is_active ? '#dcfce7' : '#fee2e2', color: s.is_active ? '#166534' : '#991b1b', fontWeight: 700 }}>
                    {s.is_active ? '✅ Activo' : '⏸️ Suspendido'}
                  </span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Referencia: {s.folder || 'N/A'}</p>
                
                <div style={{ marginTop: '16px', background: '#f4f4f5', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid #e4e4e7' }}>
                  <strong style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Código de Inserción para este Cliente:</strong>
                  <code style={{ display: 'block', whiteSpace: 'pre-wrap', color: '#db2777' }}>
{`<div id="sello-interambiente" data-client-id="${s.id}"></div>
<script src="https://web-interambiente.vercel.app/widgets/sello.js" defer></script>`}
                  </code>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => toggleStatus(s.id, s.is_active)} 
                  title={s.is_active ? "Suspender Sello" : "Reactivar Sello"}
                  style={{ background: s.is_active ? '#fef08a' : '#dcfce7', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: '#333' }}
                >
                  {s.is_active ? <PowerOff size={20} /> : <Power size={20} />}
                </button>
                <button 
                  onClick={() => deleteSello(s.id)} 
                  title="Eliminar Sello permanentemente"
                  style={{ background: '#fee2e2', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: '#ef4444' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
