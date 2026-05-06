import type { APIRoute } from 'astro';
import galleriesData from '@/data/galleries.json';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site || new URL('https://example.netlify.app')).origin;
  const today = new Date().toISOString().split('T')[0];

  const galleryUrls = galleriesData.galleries.map(
    (g) => `
  <url>
    <loc>${baseUrl}/${g.slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>${galleryUrls.join('')}
  <url>
    <loc>${baseUrl}/about/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
