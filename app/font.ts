import { Timmana } from "next/font/google";
import localFont from "next/font/local";

export const timmana = Timmana({
  subsets: ["latin"],
  variable: "--font-timmaana",
  weight: ["400"],
});
export const satoshi = localFont({
  src: [
    {
      path: "./font/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/Satoshi-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});
