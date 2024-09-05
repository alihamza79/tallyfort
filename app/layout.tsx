'use client'
import "@/styles/globals.css";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import Footer from "@/components/common/Footer";
import { MainHeader } from "@/components/header";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { satoshi, timmana } from "./font";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Conditionally hide the footer on the "/dashboard" page
  const showFooter = pathname !== "/dashboard";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-satoshi antialiased",
          satoshi.variable,
          timmana.variable
        )}
      >
        <MainHeader />
        {children}
        {showFooter && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
