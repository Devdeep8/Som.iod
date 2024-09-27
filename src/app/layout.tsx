import type { Metadata } from "next";
import {Inter} from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";



export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Daily Day Planer",
  description: "Devdeep presonal ready to work app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
