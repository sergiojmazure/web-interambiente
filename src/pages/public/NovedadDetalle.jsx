import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';
import SEO from '../../components/SEO';

export default function NovedadDetalle() {
  const { id, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      
      let query = supabase.from('intamb_posts').select('*');
      if (slug) query = query.eq('slug', slug);
      else query = query.eq('id', id);
      
      const { data, error } = await query.single();
        
      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Cargando artículo...</div>;
  }

  if (!post) {
    return (
      <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}>Publicación no encontrada</h2>
        <Link to="/novedades" className="btn btn-primary">Volver a Noticias</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f4f4f5', minHeight: '100vh', paddingBottom: 'var(--space-2xl)' }}>
      <SEO 
        title={`${post.title} | Interambiente`} 
        description={post.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'} 
        image={post.image_url || undefined} 
      />
      {/* Cabecera Tipo Cartelera */}
      {post.image_url ? (
        <div style={{ 
          width: '100%', 
          height: '45vh', 
          minHeight: '300px',
          backgroundImage: `url(${post.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          {/* Overlay Oscuro Rápido */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: 'var(--space-xl)' }}>
             <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '900px', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
               {post.title}
             </h1>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--color-secondary)', padding: 'calc(var(--space-2xl) + 60px) 0 var(--space-xl)' }}>
           <div className="container">
             <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '900px' }}>
               {post.title}
             </h1>
           </div>
        </div>
      )}

      {/* Contenido / Cuerpo del Artículo */}
      <div className="container" style={{ marginTop: post.image_url ? '-40px' : '40px', position: 'relative', zIndex: 10 }}>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: 'clamp(24px, 5vw, 48px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', borderBottom: '1px solid #e2e8f0', paddingBottom: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', gap: '8px', fontWeight: 500 }}>
              <Calendar size={18} />
              {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div 
            className="article-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            style={{ 
              color: '#334155', 
              fontSize: '1.15rem', 
              lineHeight: '1.8' 
            }} 
          />

          <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
            <Link to="/novedades" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', color: '#475569' }}>
               <ArrowLeft size={18} /> Volver a todas las Noticias
            </Link>
          </div>
          
        </div>
      </div>

      <style>{`
        /* Tipografías y Separaciones pensadas para Lectura (Medium-style) */
        .article-content h1, .article-content h2, .article-content h3 {
          color: var(--color-secondary);
          margin-top: 2em;
          margin-bottom: 0.8em;
          line-height: 1.3;
        }
        .article-content h2 { fontSize: 1.7rem; }
        .article-content h3 { fontSize: 1.4rem; }
        
        .article-content p {
          margin-bottom: 1.5em;
        }
        
        .article-content a {
          color: var(--color-primary);
          text-decoration: underline;
        }

        .article-content blockquote {
          border-left: 4px solid var(--color-primary);
          padding-left: 20px;
          margin: 1.5em 0;
          font-style: italic;
          color: #475569;
          background: #f8fafc;
          padding: 20px;
          border-radius: 0 8px 8px 0;
        }

        .article-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 2em 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1.5em;
          padding-left: 2em;
        }
        .article-content li {
          margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  );
}
