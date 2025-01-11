import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Poppins, Raleway } from 'next/font/google'; 



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const ttRoundsCondensed = Raleway({
  subsets: ['latin'],
  variable: '--font-tt-rounds-condensed', 
  weight: ['400', '700'], 
});
const poppins = {
  subsets: ['latin'],
  variable: '--font-poppins', 
  weight: ['400', '700'],
};

export const metadata: Metadata = {
  title: "Guest Connect",
  description: "connects organizers/event managers with industry experts",
  icons: {
    icon: '/images/logo.svg'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-[#FBF6E2]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
