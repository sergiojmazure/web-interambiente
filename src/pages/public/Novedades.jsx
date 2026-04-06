import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Newspaper, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShaderBackground } from '../../components/ui/HeroShader';
import SEO from '../../components/SEO';

export default function Novedades() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Paginación
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const fetchPosts = async (currentPage) => {
    if (currentPage === 0) setLoading(true);
    else setLoadingMore(true);

    try {
      const from = currentPage * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('intamb_posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (!error && data) {
        if (currentPage === 0) {
          setPosts(data);
        } else {
          setPosts(prev => [...prev, ...data]);
        }
        
        // Si la sumatoria de artículos cargados es mayor o igual a todos los que existen, apagamos "Cargar Más"
        if (from + data.length >= count) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    } catch (err) {
      console.warn("Error cargando novedades", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  return (
    <div>
      <SEO 
        title="Novedades y Noticias | Interambiente SA" 
        description="Explora los últimos análisis, tendencias y recuento de los esfuerzos estratégicos en materia ambiental a cargo de nuestros expertos." 
      />
      <ShaderBackground minHeight="auto">
        <section className="section" style={{ paddingBottom: 'var(--space-xl)', width: '100%' }}>
          <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ color: '#fff' }}>Noticias y <span style={{ color: '#6ee7b7' }}>Novedades</span></h1>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>Análisis, tendencias y comunicados relevantes sobre nuestra labor medioambiental.</p>
          </div>
        </section>
      </ShaderBackground>

      <section className="section">
        <div className="container" style={{ maxWidth: '1100px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Cargando novedades...</div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-muted)' }}>
              <Newspaper size={56} style={{ margin: '0 auto var(--space-md)', opacity: 0.3 }} />
              <p style={{ fontSize: '1.2rem' }}>Aún no hay novedades publicadas.</p>
            </div>
          ) : (
            <>
              {/* Grid de 9 en 9 */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: 'var(--space-xl)' 
              }}>
                {posts.map((post) => {
                  const dateStr = new Date(post.created_at);
                  const yy = dateStr.getFullYear().toString().slice(-2);
                  const mm = (dateStr.getMonth() + 1).toString().padStart(2, '0');
                  const dd = dateStr.getDate().toString().padStart(2, '0');
                  const dateUrl = `${yy}${mm}${dd}`;
                  const postUrl = post.slug ? `/novedades/${dateUrl}/${post.slug}` : `/novedades/${post.id}`;
                  
                  return (
                  <Link to={postUrl} key={post.id} className="news-card" style={{ textDecoration: 'none' }}>
                    <div className="glass-panel" style={{ 
                      overflow: 'hidden', 
                      display: 'flex', 
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}>
                      {post.image_url ? (
                        <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                          <img 
                            src={post.image_url} 
                            alt={post.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            className="news-image" 
                          />
                        </div>
                      ) : (
                        <div style={{ width: '100%', height: '220px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Newspaper size={40} color="#94a3b8" />
                        </div>
                      )}
                      <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.3rem', marginBottom: 'var(--space-md)', lineHeight: '1.4' }}>
                          {post.title}
                        </h3>
                        
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                          Leer artículo <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>

              {/* Botón Cargar Más */}
              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                  <button onClick={loadMore} disabled={loadingMore} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: '200px', justifyContent: 'center', padding: '14px 28px', fontSize: '1rem' }}>
                    {loadingMore ? (
                      <>
                        <Loader2 size={20} className="lucide-spin" /> Cargando historias...
                      </>
                    ) : (
                      'Cargar Más Publicaciones'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        .news-card:hover .glass-panel {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .news-card:hover .news-image {
          transform: scale(1.05);
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .lucide-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
