import { defineConfig } from 'astro/config';

// IMPORTANT: when you set up a custom domain on Netlify, replace the `site` URL below
// with your real domain (e.g. https://janedoe-photography.com). This affects sitemap
// URLs and the canonical link tag.
export default defineConfig({
  site: 'https://example.netlify.app',
  output: 'static',
  // Use trailing slashes so URLs like /portraits/ resolve to /portraits/index.html.
  trailingSlash: 'always',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Allow large source images (high-res photos).
        limitInputPixels: false,
      },
    },
  },
  build: {
    assets: '_assets',
  },
});
