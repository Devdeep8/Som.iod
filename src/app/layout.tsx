import type { Metadata } from "next";
import {Inter} from "next/font/google"
import "./globals.css";
import { Toaster } from '@/components/ui/toaster'
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";


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
  authModal: React.ReactNode

}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} antialiased`}
      >
        <Providers>
        <div className=" container mx-auto h-full">

        {children}
        </div>
        </Providers>
        <Toaster />

      </body>
    </html>
  );
}
