"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isDownloadPage = pathname === "/download";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-slate-200 py-4 shadow-sm"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container flex items-center justify-between px-6 md:px-12">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-slate-900 p-1.5 rounded-lg">
                        <ShieldAlert className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        VETO
                    </span>
                </div>

                {/* Links - Only show on home page */}
                {!isDownloadPage && (
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                        <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">
                            How It Works
                        </Link>
                        <Link href="#patterns" className="hover:text-slate-900 transition-colors">
                            Scam Patterns
                        </Link>
                        <Link href="#security" className="hover:text-slate-900 transition-colors">
                            Security
                        </Link>
                    </div>
                )}

                {/* Actions - Different for download page */}
                <div className="flex items-center gap-4">
                    {isDownloadPage ? (
                        <Link href="/">
                            <Button variant="ghost" className="font-medium text-slate-600 hover:text-slate-900">
                                Back to Home
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/download">
                            <Button className="font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                                Download App
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
