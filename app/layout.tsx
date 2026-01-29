import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-rubik-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Ótica Popular - Sua visão é nossa missão",
    template: "%s | Ótica Popular",
  },
  description:
    "Ótica Popular Parnaíba - Óculos de grau, sol e lentes de contato com as melhores marcas. Exame de vista gratuito em Parnaíba-PI.",
  keywords: [
    "ótica",
    "óculos",
    "lentes",
    "parnaíba",
    "piauí",
    "exame de vista",
    "óculos de grau",
    "óculos de sol",
  ],
  authors: [{ name: "Ótica Popular" }],
  creator: "Ótica Popular",
  publisher: "Ótica Popular",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ótica Popular Parnaíba - Sua visão é nossa missão",
    description:
      "Óculos de grau, sol e lentes de contato com as melhores marcas. Exame de vista gratuito em Parnaíba-PI.",
    url: "/",
    siteName: "Ótica Popular",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo_otica.png",
        width: 1200,
        height: 630,
        alt: "Ótica Popular Parnaíba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ótica Popular Parnaíba",
    description: "Sua visão é nossa missão - Óculos e lentes em Parnaíba-PI",
    images: ["/logo_otica.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
