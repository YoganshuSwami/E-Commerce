import { PRODUCTS } from "../../../lib/data";

export function generateMetadata({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: product.name,
    description: `Shop the premium ${product.name} at Aavaran. Explore our exclusive collection of modern Indian ethnic wear.`,
    openGraph: {
      title: `${product.name} | Aavaran`,
      description: `Shop the premium ${product.name} at Aavaran.`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1067,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [product.images[0]],
    }
  };
}

export default function ProductLayout({ children, params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  
  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.name,
              "image": product.images,
              "description": `Shop the premium ${product.name} at Aavaran. Explore our exclusive collection of modern Indian ethnic wear.`,
              "sku": `AAV-${product.id}`,
              "offers": {
                "@type": "Offer",
                "url": `https://aavaran-ethnic.com/products/${product.slug}`,
                "priceCurrency": "INR",
                "price": product.price,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
              }
            })
          }}
        />
      )}
      {children}
    </>
  );
}
