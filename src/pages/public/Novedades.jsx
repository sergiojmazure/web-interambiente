import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Newspaper, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SEO from '../../components/SEO';

export default function Novedades() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setPosts((prev) => (currentPage === 0 ? data : [...prev, ...data]));
        setHasMore(from + data.length < count);
      }
    } catch (err) {
      console.warn('Error cargando novedades', err);
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
        description="Explora los últimos análisis, tendencias y comunicados en materia ambiental a cargo de nuestros expertos."
      />

      <PageHero
        imageId="1441974231531-c6227db76b6e"
        imageAlt="Sendero de bosque iluminado entre árboles"
        eyebrow="Novedades"
        title={<>Noticias y <em style={{ fontStyle: 'italic', color: '#EBA85E', fontWeight: 500 }}>análisis</em></>}
        subtitle="Análisis, tendencias y comunicados relevantes sobre nuestra labor medioambiental."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '1100px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-xl)' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: 'var(--color-bg-alt)' }} />
                  <div style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ height: '12px', width: '40%', background: 'var(--color-bg-alt)', borderRadius: '6px', marginBottom: '14px' }} />
                    <div style={{ height: '18px', width: '85%', background: 'var(--color-bg-alt)', borderRadius: '6px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Reveal className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-lg)', maxWidth: '560px', margin: '0 auto' }}>
              <span style={{ display: 'inline-flex', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-alt)', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                <Newspaper size={30} color="var(--color-primary)" />
              </span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Aún no hay novedades</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Pronto publicaremos análisis y comunicados. Vuelve en unos días.</p>
            </Reveal>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-xl)' }}>
                {posts.map((post, i) => {
                  const d = new Date(post.created_at);
                  const yy = d.getFullYear().toString().slice(-2);
                  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
                  const dd = d.getDate().toString().padStart(2, '0');
                  const dateUrl = `${yy}${mm}${dd}`;
                  const postUrl = post.slug ? `/novedades/${dateUrl}/${post.slug}` : `/novedades/${post.id}`;

                  return (
                    <Reveal key={post.id} delay={(i % 3) * 80} as="div">
                      <Link to={postUrl} className="news-card" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          {post.image_url ? (
                            <div style={{ width: '100%', height: '210px', overflow: 'hidden' }}>
                              <img src={post.image_url} alt={post.title} loading="lazy" className="news-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ) : (
                            <div style={{ width: '100%', height: '210px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Newspaper size={38} color="var(--color-primary-soft)" />
                            </div>
                          )}
                          <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: 600, fontFamily: 'var(--font-subtitle)', letterSpacing: '0.02em' }}>
                              {d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.25rem', marginBottom: 'var(--space-md)', lineHeight: 1.3 }}>{post.title}</h3>
                            <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.92rem', gap: '6px' }}>
                              Leer artículo <ArrowRight size={16} className="news-arrow" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>

              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                  <button onClick={loadMore} disabled={loadingMore} className="btn btn-outline" style={{ minWidth: '230px' }}>
                    {loadingMore ? (<><Loader2 size={20} className="lucide-spin" /> Cargando...</>) : 'Cargar más publicaciones'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        .news-card .card { transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), border-color 0.3s var(--ease-out); }
        .news-card:hover .card { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--color-primary-soft); }
        .news-card:hover .news-image { transform: scale(1.05); }
        .news-image { transition: transform 0.5s var(--ease-out); }
        .news-card:hover .news-arrow { transform: translateX(3px); transition: transform 0.22s; }
      `}</style>
    </div>
  );
}
