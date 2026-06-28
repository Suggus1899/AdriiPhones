"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = !pathname?.startsWith("/admin") && !pathname?.startsWith("/login");

  return (
    <>
      {isPublicRoute && <Navbar />}
      {children}
      {isPublicRoute && <Footer />}
    </>
  );
}
