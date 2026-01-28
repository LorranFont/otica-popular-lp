
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Header from "@/components/Header";


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

  // Definimos as rotas onde NÃO queremos o Header e Footer
  const rotasSemFooter = ["/login", "/registro"];


  return (
    <html lang="pt-br">
      <body>
          <LayoutWrapper>{children}</LayoutWrapper>
    
      </body>
    </html>
  );
}