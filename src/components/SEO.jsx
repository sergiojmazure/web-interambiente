import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Interambiente | Aliados en sostenibilidad", 
  description = "Asesoría y gestión ambiental en Ecuador. Convertimos el cumplimiento normativo en ventaja competitiva: regularización, fiscalización, estudios de impacto y gestión de residuos.",
  image = "https://interambientesa.com/og-interambiente.png",
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
      <meta property="og:site_name" content="Interambiente S.A.S." />
      <meta property="og:locale" content="es_EC" />

      {/* Etiquetas Twitter/X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
