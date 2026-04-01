import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Trash2, Edit, UploadCloud, Loader2 } from 'lucide-react';

export default function AdminPosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States para el formulario
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Drag & Drop Upload States
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('intamb_posts').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openFormForAdd = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImageUrl('');
    setIsFormOpen(true);
  };

  const openFormForEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.image_url);
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      // MODO EDICIÓN
      const { error } = await supabase.from('intamb_posts').update({
        title, content, image_url: imageUrl
      }).eq('id', editingId);
      
      if (!error) cerrarFormulario();
      else alert("Error al editar: " + error.message);
    } else {
      // MODO CREACIÓN
      const { error } = await supabase.from('intamb_posts').insert({
        title, content, image_url: imageUrl
      });
      
      if (!error) cerrarFormulario();
      else alert("Error al guardar: " + error.message);
    }
  };

  const cerrarFormulario = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setTitle(''); setContent(''); setImageUrl('');
    fetchItems();
  };

  const handleDelete = async (id) => {
    if(!window.confirm("¿Seguro que deseas eliminar permanentemente esta novedad?")) return;
    await supabase.from('intamb_posts').delete().eq('id', id);
    fetchItems();
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validación de imagen simple
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Solo se admiten formatos gráficos (.jpg, .png, .webp)');
      return;
    }

    setIsUploading(true);
    try {
      // Generar nombre seguro (sin espacios ni acentos, conservando extensión)
      const fileExt = file.name.split('.').pop();
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '').replace(`.${fileExt}`, '');
      const uniqueName = `novedades/${Date.now()}_${safeName}.${fileExt}`;

      // Subir archivo al bucket intamb_uploads
      const { error: uploadError } = await supabase.storage
        .from('intamb_uploads')
        .upload(uniqueName, file);

      if (uploadError) throw uploadError;

      // Obtener la URL publica completa
      const { data } = supabase.storage
        .from('intamb_uploads')
        .getPublicUrl(uniqueName);

      setImageUrl(data.publicUrl);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al subir el archivo a los servidores.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 style={{ color: 'var(--color-secondary)', fontSize: '2rem' }}>Noticias y Novedades</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Maneja tu panel público de artículos.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openFormForAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} /> Nueva Publicación
          </button>
        )}
      </div>

      {isFormOpen && (
        <div style={{ background: '#fff', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid #e5e7eb', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-primary)' }}>
            {editingId ? '✏️ Editando Publicación Activa' : 'Nueva Publicación'}
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Título</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="ej: Nueva Norma ESG 2026..." />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Contenido (Soporta HTML)</label>
              <textarea required rows="6" value={content} onChange={e => setContent(e.target.value)} style={inputStyle} placeholder="<p>En este artículo analizamos...</p>"></textarea>
              <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>Puedes usar formato HTML básico (p, b, i, br, a href).</small>
            </div>

            {/* ZONA DRAG & DROP E IMAGEN */}
            <div style={{ padding: '24px', borderRadius: '8px', border: isDragging ? '2px dashed var(--color-primary)' : '2px dashed #cbd5e1', background: isDragging ? '#eff6ff' : '#f8fafc', transition: 'all 0.2s', position: 'relative' }}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files[0]); }}
            >
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '16px', color: '#334155' }}>Fotografía o Póster del Artículo</label>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
                  {isUploading ? (
                    <Loader2 size={36} className="lucide-spin" color="var(--color-primary)" style={{ animation: 'spin 2s linear infinite' }} />
                  ) : (
                    <UploadCloud size={36} color={isDragging ? 'var(--color-primary)' : '#94a3b8'} />
                  )}
                  <p style={{ margin: '8px 0 0 0', fontWeight: '500', color: '#475569' }}>
                    {isUploading ? 'Subiendo imagen...' : 'Arrastra una fotografía aquí (.jpg, .png, .webp)'}
                  </p>
                </div>
                
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp"
                  onChange={e => handleFileUpload(e.target.files[0])}
                  disabled={isUploading}
                  style={{ display: 'block', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#64748b' }}>O si prefieres, puedes introducir manualmente su enlace URL exterior:</p>
                <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={inputStyle} placeholder="https://..." />
                
                {imageUrl && (
                  <div style={{ marginTop: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 600 }}>Vista Previa:</p>
                    <img src={imageUrl} alt="Preview" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #ccc' }} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
              <button type="button" onClick={cerrarFormulario} className="btn" style={{ background: 'transparent', border: '1px solid #ccc', color: '#666' }}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={isUploading}>
                {editingId ? 'Guardar Cambios' : 'Publicar Novedad'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Cargando lista...</p> : (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '16px' }}>Publicación</th>
                <th style={{ padding: '16px' }}>Fecha</th>
                <th style={{ padding: '16px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No hay novedades registradas.</td></tr>}
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>{item.title}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#64748b' }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button onClick={() => openFormForEdit(item)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', padding: '8px', marginRight: '8px' }} title="Editar">
                      <Edit size={20} />
                    </button>
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

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .lucide-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' };
