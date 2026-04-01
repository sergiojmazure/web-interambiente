import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Trash2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('intamb_portfolio').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('intamb_portfolio').insert({
      title, description, image_url: imageUrl
    });
    
    if (!error) {
      setTitle(''); setDescription(''); setImageUrl('');
      setIsAdding(false);
      fetchItems();
    } else {
      alert("Error al guardar el proyecto: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;
    await supabase.from('intamb_portfolio').delete().eq('id', id);
    fetchItems();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 style={{ color: 'var(--color-secondary)', fontSize: '2rem' }}>Portafolio</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Gestiona los proyectos que se exhiben al público.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} /> Nuevo Proyecto
          </button>
        )}
      </div>

      {isAdding && (
        <div style={{ background: '#fff', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid #e5e7eb', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-primary)' }}>Crear Nuevo Proyecto</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Título del Proyecto</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="ej: Estrategia Circular Pyme" />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Breve Descripción</label>
              <textarea required rows="3" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} placeholder="Descripción de los hallazgos y valor..."></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}><ImageIcon size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> URL de la Imagen de Portada</label>
              <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={inputStyle} placeholder="https://ejemplo.com/imagen.jpg" />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
              <button type="button" onClick={() => setIsAdding(false)} className="btn" style={{ background: 'transparent', border: '1px solid #ccc', color: '#666' }}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar Proyecto</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Cargando lista...</p> : (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '16px' }}>Proyecto</th>
                <th style={{ padding: '16px' }}>Imagen (URL)</th>
                <th style={{ padding: '16px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No hay proyectos registrados.</td></tr>}
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>{item.description.substring(0,60)}...</div>
                  </td>
                  <td style={{ padding: '16px', color: '#64748b' }}><LinkIcon size={14} style={{ marginRight: '4px' }}/> {item.image_url.substring(0,30)}...</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '8px' }} title="Eliminar">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' };
