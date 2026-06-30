/* Constructor de URLs Unsplash (license-free) optimizadas: webp/avif automático. */
export function unsplash(id, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export function unsplashSrcSet(id) {
  return [800, 1200, 1600, 2000, 2600]
    .map((w) => `${unsplash(id, w)} ${w}w`)
    .join(', ');
}
