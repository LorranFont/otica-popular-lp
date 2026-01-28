
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";


const geistSans = Geist({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-rubik-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ótica Popular",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}