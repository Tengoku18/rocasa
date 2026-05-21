import type { Metadata } from 'next';
import { Open_Sans, Roboto } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rocasa Conveyancing | Licensed Conveyancer & Engineering Consultant — Sydney NSW',
  description:
    'Sydney-based dual practice combining licensed conveyancing, JP services and engineering consultancy. Pre-purchase structural inspections, contract reviews and PEXA settlements across NSW.',
  keywords: [
    'Rocasa Conveyancing',
    'Sydney conveyancer',
    'NSW conveyancing',
    'engineering consultant',
    'JP services',
    'pre-purchase inspection',
    'contract of sale review',
    'PEXA settlement',
  ],
  authors: [{ name: 'Rocasa Conveyancing' }],
  openGraph: {
    title: 'Rocasa Conveyancing — Engineering meets Conveyancing',
    description:
      'Property transfers handled by a licensed conveyancer with an engineer’s eye. Sydney NSW.',
    type: 'website',
    locale: 'en_AU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${openSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
