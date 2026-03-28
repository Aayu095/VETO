import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Vault } from "@/components/landing/Vault";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { CanvasBackground } from "@/components/landing/CanvasBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060A14] text-[#E8EEF8] relative">
      <CustomCursor />
      <CanvasBackground />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <Vault />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
