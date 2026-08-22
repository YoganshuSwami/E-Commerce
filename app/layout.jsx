import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import LayoutWrapper from '../components/LayoutWrapper';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Aavaran | Premium Ethnic Wear',
  description: 'Redefining modern ethnic wear for the contemporary Indian woman.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✨</text></svg>',
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
