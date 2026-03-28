import type { Metadata } from "next";
import { Sora, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/components/Providers";
import { cn } from "@/lib/utils";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "GarudPay | India's First Coercion-Aware App",
  description: "Detects suspicious behavior before the fraud occurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-[#060A14] text-[#E8EEF8] font-sans antialiased", sora.variable, bebas.variable, dmMono.variable)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
