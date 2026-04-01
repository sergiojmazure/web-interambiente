import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Interambiente SA - Soluciones Ambientales Estratégicas y SaaS", 
  description = "Consultoría avanzada en cumplimiento normativo, tecnología predictiva y certificaciones de sostenibilidad digital para industrias de alto impacto.",
  image = "https://interambientesa.com/logo-interambiente.png", // Reemplazar con URL real genérica
  url = "https://interambientesa.com",
  type = "website"
}) {
  return (
    <Helmet>
      {/* Estándares Clásicos */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Etiquetas Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Interambiente SA" />

      {/* Etiquetas Twitter/X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
