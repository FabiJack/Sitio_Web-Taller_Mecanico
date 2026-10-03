import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { Footer, Header } from '@/components/chrome';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Archivo({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800', '900'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Taller Rayo McQueen — Electrónica, cajas de cambio y suspensión', template: '%s · Taller Rayo McQueen' },
  description:
    'Taller mecánico en Santiago especializado en electrónica automotriz, cajas de cambio y suspensión y dirección. Agenda online y seguimiento de tu auto en tiempo real.',
};

export const viewport: Viewport = { themeColor: '#0d0f15' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
