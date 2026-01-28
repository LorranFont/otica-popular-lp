"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rotasSemLayout = ["/login", "/registro"];
  const esconderLayout = rotasSemLayout.includes(pathname);

  return (
    <>
      {!esconderLayout && <Header />}
      <main>{children}</main>
    </>
  );
}