import { PRODUCTS } from "../lib/data";

export default function sitemap() {
  const baseUrl = 'https://aavaran-ethnic.com';

  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/cart',
    '/checkout',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/shipping',
    '/returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
