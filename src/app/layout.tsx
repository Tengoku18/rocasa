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
  title: 'Rocasa Conveyancing | Licensed Conveyancer & JP — Sydney NSW',
  description:
    'Sydney-based licensed conveyancing and JP services. Contract reviews, property settlements via PEXA, off-the-plan and business conveyancing across NSW.',
  keywords: [
    'Rocasa Conveyancing',
    'Sydney conveyancer',
    'NSW conveyancing',
    'licensed conveyancer',
    'JP services',
    'contract of sale review',
    'PEXA settlement',
    'off the plan conveyancing',
    'business conveyancing',
  ],
  authors: [{ name: 'Rocasa Conveyancing' }],
  openGraph: {
    title: 'Rocasa Conveyancing — Sydney Licensed Conveyancer & JP',
    description:
      'Property transfers handled with care. Licensed conveyancer and JP, based in Sydney NSW.',
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
