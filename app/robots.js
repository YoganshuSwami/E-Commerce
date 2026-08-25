export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile', '/orders'], // Do not index private user pages
    },
    sitemap: 'https://aavaran-ethnic.com/sitemap.xml',
  }
}
