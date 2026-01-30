"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const routesWithoutLayout = ["/login", "/register"];
  const shouldHideLayout = routesWithoutLayout.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main>{children}</main>
      {!shouldHideLayout && <WhatsAppButton />}
    </>
  );
}
