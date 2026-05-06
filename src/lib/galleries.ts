import galleriesData from '@/data/galleries.json';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryInfo {
  slug: string;
  title: string;
  description?: string;
  images: GalleryImage[];
}

const imageExtensions = /\.(jpg|jpeg|png|webp|svg|avif|gif)$/i;

/**
 * Read all images from a gallery folder under src/content/galleries/<slug>/.
 * Files are sorted by filename, so prefix images with numbers (01-, 02-, ...) to control order.
 */
function getGalleryImages(slug: string): GalleryImage[] {
  const allImages = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/galleries/**/*.{jpg,jpeg,png,webp,svg,avif,gif}',
    { eager: true }
  );

  const galleryPrefix = `/src/content/galleries/${slug}/`;
  const entries: { filePath: string; image: GalleryImage }[] = [];

  for (const [path, mod] of Object.entries(allImages)) {
    if (path.startsWith(galleryPrefix)) {
      const filename = path.split('/').pop() || '';
      if (imageExtensions.test(filename)) {
        entries.push({
          filePath: path,
          image: {
            src: typeof mod.default === 'string' ? mod.default : mod.default.src,
            // Auto-generate alt text from filename: "01-sunset-over-water.jpg" -> "01 sunset over water"
            alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          },
        });
      }
    }
  }

  entries.sort((a, b) => {
    const nameA = a.filePath.split('/').pop() || '';
    const nameB = b.filePath.split('/').pop() || '';
    return nameA.localeCompare(nameB, undefined, { numeric: true });
  });

  return entries.map((e) => e.image);
}

export function getAllGalleries(): GalleryInfo[] {
  return galleriesData.galleries.map((gallery) => ({
    slug: gallery.slug,
    title: gallery.title,
    description: gallery.description,
    images: getGalleryImages(gallery.slug),
  }));
}

export function getGallery(slug: string): GalleryInfo | undefined {
  return getAllGalleries().find((g) => g.slug === slug);
}

export function getSiteConfig() {
  return galleriesData.site;
}
