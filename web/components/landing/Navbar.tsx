"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
    const pathname = usePathname();
    const isAppPage = pathname?.startsWith('/app');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md px-6 md:px-[60px] py-[20px] flex items-center justify-between ${scrolled ? 'bg-[#060A14]/90 border-b border-[#1E2A45]' : 'bg-gradient-to-b from-[rgba(6,10,20,0.95)] to-transparent'}`}>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-[36px] h-[36px] bg-[#1A4FCC] rounded-[10px] flex items-center justify-center text-[18px]">🛡</div>
                <span className="font-mono text-[18px] tracking-[3px] font-medium text-[#E8EEF8]">GARUDPAY</span>
            </Link>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-[40px]">
                {!isAppPage && (
                    <>
                        <Link href="#how-it-works" className="text-[13px] font-medium tracking-[0.5px] text-[#8899BB] hover:text-[#E8EEF8] transition-colors">How It Works</Link>
                        <Link href="#vault" className="text-[13px] font-medium tracking-[0.5px] text-[#8899BB] hover:text-[#E8EEF8] transition-colors">Smart Vault</Link>
                        <Link href="#features" className="text-[13px] font-medium tracking-[0.5px] text-[#8899BB] hover:text-[#E8EEF8] transition-colors">Technology</Link>
                    </>
                )}
            </div>

            {/* Launch App Button */}
            <div className="flex items-center gap-4">
                {!isAppPage && (
                    <Link href="/app">
                        <Button 
                            className="bg-[#1A4FCC] hover:bg-[#2260EE] text-white px-[22px] py-[10px] rounded-[10px] text-[13px] font-semibold transition-colors border-none"
                        >
                            Download App
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
