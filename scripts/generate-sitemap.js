import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno (simulando Vite config)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const DOMAIN = 'https://interambientesa.com';

async function generateSitemap() {
  console.log(`\n================================`);
  console.log(`🚀 Iniciando Bot Generador de Sitemap XML`);
  console.log(`================================`);

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Añadir Rutas Estáticas Core
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/servicios', priority: '0.8', changefreq: 'monthly' },
    { url: '/clientes', priority: '0.8', changefreq: 'weekly' },
    { url: '/novedades', priority: '0.9', changefreq: 'daily' },
    { url: '/contacto', priority: '0.7', changefreq: 'yearly' },
  ];

  staticRoutes.forEach(route => {
    sitemapContent += `
  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Generar rutas dinámicas desde Supabase
  if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Advertencia: No se encontraron credenciales VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en '.env'. Omitiendo Posts en el sitemap.");
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log(`Buscando artículos publicados...`);
      const { data: posts, error } = await supabase
        .from('intamb_posts')
        .select('id, created_at');

      if (error) throw error;
      console.log(`✅ ${posts.length} Artículos encontrados e indexados.`);

      posts.forEach(post => {
        // Formatear fecha al estándar ISO para XML
        const modDate = new Date(post.created_at).toISOString().split('T')[0];
        sitemapContent += `
  <url>
    <loc>${DOMAIN}/novedades/${post.id}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

    } catch (err) {
      console.error("❌ Fallo crítico al conversar con Supabase:", err.message);
    }
  }

  sitemapContent += `\n</urlset>`;

  // Guardar archivo directamente en el Output 'public/'
  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, sitemapContent);

  console.log(`\n🎉 EXITOOO: Sitemap guardado magistralmente en ${publicPath}`);
  console.log(`================================\n`);
}

generateSitemap();
