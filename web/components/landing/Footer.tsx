"use client";

import Link from "next/link";
import { Apple, Play } from "lucide-react";

export function Footer() {
    return (
        <div className="bg-[#060A14] flex flex-col relative z-10 w-full overflow-hidden">
            {/* DOWNLOAD SECTION */}
            <section id="download" className="relative text-center py-24 px-6 border-y border-[#1E2A45] bg-[#0A0F1E] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(26,79,204,0.12)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                
                <div className="inline-flex justify-center items-center gap-2 bg-[rgba(26,79,204,0.1)] border border-[rgba(26,79,204,0.3)] rounded-full px-4 py-1.5 mb-5 relative z-10">
                    <span className="text-[11px] text-[#2260EE] font-medium tracking-wide uppercase">Download</span>
                </div>

                <h2 className="font-bebas text-[52px] md:text-[80px] leading-[0.92] tracking-wide mb-5 text-[#E8EEF8] relative z-10">
                    STAYING SAFE<br />IS NOW <span className="text-[#2ECC8F]">SIMPLE.</span>
                </h2>

                <p className="text-[17px] text-[#8899BB] leading-[1.7] max-w-[500px] mx-auto font-light mb-12 relative z-10 px-4">
                    A retired teacher in Pune lost ₹4.2 lakh. Her bank watched it happen and did nothing. If she had GarudPay, the funds would be in the Vault, secured, and returned.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14 relative z-10 px-6">
                    <Link
                        href="#download"
                        className="flex items-center justify-center gap-3 bg-[#E8EEF8] text-[#060A14] px-6 py-3.5 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(232,238,248,0.2)] transition-all cursor-none"
                    >
                        <Apple className="h-6 w-6" />
                        <div className="leading-[1.2] text-left">
                            <span className="text-[10px] font-normal text-[#555] block">Download on the</span>
                            <strong className="text-[15px] font-semibold">App Store</strong>
                        </div>
                    </Link>
                    <Link
                        href="#download"
                        className="flex items-center justify-center gap-3 bg-[#141D33] text-[#E8EEF8] border border-[#1E2A45] px-6 py-3.5 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,79,204,0.2)] transition-all cursor-none"
                    >
                        <Play className="h-6 w-6" />
                        <div className="leading-[1.2] text-left">
                            <span className="text-[10px] font-normal text-[#8899BB] block">Get it on</span>
                            <strong className="text-[15px] font-semibold">Google Play</strong>
                        </div>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative z-10">
                    <div className="text-center px-4">
                        <div className="font-mono text-[24px] font-medium text-[#2ECC8F] mb-1">Free</div>
                        <div className="text-[12px] text-[#5A7099]">Forever for basic protection</div>
                    </div>
                    <div className="text-center px-4 md:border-l md:border-[#1E2A45]">
                        <div className="font-mono text-[24px] font-medium text-[#E8EEF8] mb-1">UPI Ready</div>
                        <div className="text-[12px] text-[#5A7099]">Works with all banks</div>
                    </div>
                    <div className="text-center px-4 md:border-l md:border-[#1E2A45]">
                        <div className="font-mono text-[24px] font-medium text-[#2260EE] mb-1">No Wallet</div>
                        <div className="text-[12px] text-[#5A7099]">Just link your phone number</div>
                    </div>
                </div>
            </section>

            {/* ACTUAL FOOTER */}
            <footer className="bg-[#0F1628] py-8 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-5 relative z-10">
                <div className="flex items-center gap-3 text-center md:text-left">
                    <div className="w-7 h-7 bg-[#1A4FCC] rounded-[8px] flex items-center justify-center text-[14px]">🛡</div>
                    <span className="font-mono text-[14px] tracking-[2px] font-medium text-[#E8EEF8]">GARUDPAY</span>
                    <span className="text-[13px] text-[#5A7099] ml-2">© 2026</span>
                </div>
                
                <div className="text-[13px] text-[#5A7099] text-center md:text-left">
                    Your money. Your choice. Always.
                </div>
                
                <div className="flex gap-6 justify-center md:justify-end">
                    <Link href="#" className="text-[12px] text-[#5A7099] hover:text-[#8899BB] transition-colors">Privacy</Link>
                    <Link href="#" className="text-[12px] text-[#5A7099] hover:text-[#8899BB] transition-colors">Terms</Link>
                    <Link href="#" className="text-[12px] text-[#5A7099] hover:text-[#8899BB] transition-colors">Security</Link>
                    <Link href="#" className="text-[12px] text-[#5A7099] hover:text-[#8899BB] transition-colors">Contact</Link>
                </div>
            </footer>
        </div>
    );
}
