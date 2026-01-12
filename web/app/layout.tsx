import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "VETO Protocol | The Power to Say No",
  description: "Stop Authorized Push Payment Scams with Programmable Money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-slate-50 font-sans antialiased", inter.variable)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
