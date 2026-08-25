import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import LayoutWrapper from '../components/LayoutWrapper';
import { Toaster } from 'sonner';

export const metadata = {
  metadataBase: new URL('https://aavaran-ethnic.com'),
  title: {
    default: 'Aavaran | Premium Ethnic Wear',
    template: '%s | Aavaran',
  },
  description: 'Redefining modern ethnic wear for the contemporary Indian woman. Discover premium kurtis, co-ord sets, and hand-crafted designs.',
  keywords: ['Indian ethnic wear', 'premium kurtis', 'co-ord sets', 'women fashion', 'Aavaran'],
  openGraph: {
    title: 'Aavaran | Premium Ethnic Wear',
    description: 'Redefining modern ethnic wear for the contemporary Indian woman.',
    url: 'https://aavaran-ethnic.com',
    siteName: 'Aavaran',
    images: [
      {
        url: '/images/kurti_red.jpg',
        width: 800,
        height: 600,
        alt: 'Aavaran Premium Ethnic Wear',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aavaran | Premium Ethnic Wear',
    description: 'Redefining modern ethnic wear for the contemporary Indian woman.',
    images: ['/images/kurti_red.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%236B1E2A"/><text x="50" y="70" font-size="70" font-family="serif" fill="%23F5F0E6" text-anchor="middle">A</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          <Toaster position="top-center" />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
