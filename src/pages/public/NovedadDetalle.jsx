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
      if (!error && data) setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id, slug]);

  if (loading) {
    return <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Cargando artículo...</div>;
  }

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-xl)' }}>
        <h2 style={{ marginBottom: '16px' }}>Publicación no encontrada</h2>
        <Link to="/novedades" className="btn btn-primary"><ArrowLeft size={18} /> Volver a Novedades</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg-light)', minHeight: '100vh', paddingBottom: 'var(--space-2xl)' }}>
      <SEO
        title={`${post.title} | Interambiente`}
        description={post.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}
        image={post.image_url || undefined}
        type="article"
      />

      {/* Cabecera */}
      {post.image_url ? (
        <div style={{ width: '100%', height: '46vh', minHeight: '320px', position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
          <img src={post.image_url} alt={post.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,38,22,0.30) 0%, rgba(28,38,22,0.80) 100%)' }} />
          <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: 'var(--space-2xl)' }}>
            <div style={{ maxWidth: '900px' }}>
              <Link to="/novedades" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(245,240,230,0.85)', fontSize: '0.92rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                <ArrowLeft size={16} /> Novedades
              </Link>
              <h1 style={{ color: '#FCFAF5', fontSize: 'clamp(2rem, 5vw, 3.4rem)', textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>{post.title}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-dark" style={{ padding: 'calc(var(--space-2xl) + 60px) 0 var(--space-2xl)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <Link to="/novedades" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(245,240,230,0.85)', fontSize: '0.92rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
              <ArrowLeft size={16} /> Novedades
            </Link>
            <h1 style={{ color: '#FCFAF5', fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>{post.title}</h1>
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <div className="container" style={{ marginTop: post.image_url ? '-48px' : 'var(--space-xl)', position: 'relative', zIndex: 10 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 'clamp(24px, 5vw, 52px)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-line)', paddingBottom: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: '0.92rem', fontWeight: 500 }}>
            <Calendar size={17} color="var(--color-primary)" />
            {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: 1.8 }} />

          <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--color-line)', display: 'flex', justifyContent: 'center' }}>
            <Link to="/novedades" className="btn btn-ghost"><ArrowLeft size={18} /> Volver a todas las novedades</Link>
          </div>
        </article>
      </div>

      <style>{`
        .article-content h1, .article-content h2, .article-content h3 {
          color: var(--color-secondary);
          font-family: var(--font-display);
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          line-height: 1.2;
        }
        .article-content h2 { font-size: 1.7rem; }
        .article-content h3 { font-size: 1.4rem; }
        .article-content p { margin-bottom: 1.4em; }
        .article-content a { color: var(--color-primary-deep); text-decoration: underline; text-underline-offset: 2px; }
        .article-content blockquote {
          margin: 1.6em 0;
          font-style: italic;
          color: var(--color-secondary);
          background: var(--color-bg-light);
          padding: 20px 24px;
          border-radius: var(--radius-md);
        }
        .article-content img { max-width: 100%; border-radius: var(--radius-md); margin: 1.8em 0; box-shadow: var(--shadow-sm); }
        .article-content ul, .article-content ol { margin-bottom: 1.4em; padding-left: 1.6em; }
        .article-content li { margin-bottom: 0.5em; }
        .article-content strong { color: var(--color-secondary); }
      `}</style>
    </div>
  );
}
