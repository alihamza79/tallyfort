import "@/styles/globals.css";

import Footer from "@/components/common/Footer";
import { MainHeader } from "@/components/header";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { satoshi, timmana } from "./font";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background  font-satoshi antialiased",
          satoshi.variable,
          timmana.variable
        )}
      >
        <MainHeader />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
