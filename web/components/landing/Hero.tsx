"use client";

import Link from "next/link";
import { Apple, Play } from "lucide-react";

export function Hero() {

    return (
        <section className="relative z-10 min-h-screen pt-[120px] pb-[80px] overflow-hidden flex items-center">
            <div className="max-w-[1400px] w-full mx-auto px-6 md:px-[60px] flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
                <div className="flex-1 max-w-[580px] relative z-[2] shrink-0">
                <div
                    className="inline-flex items-center gap-2 bg-[rgba(46,204,143,0.1)] border border-[rgba(46,204,143,0.3)] rounded-full px-4 py-1.5 mb-7 slide-up opacity-0 [animation-delay:200ms]"
                >
                    <div className="w-1.5 h-1.5 bg-[#2ECC8F] rounded-full animate-pulse"></div>
                    <span className="text-[12px] text-[#2ECC8F] font-medium tracking-wide uppercase">India's First Coercion-Aware App</span>
                </div>

                <h1
                    className="font-bebas text-[56px] md:text-[86px] leading-[0.92] tracking-wide mb-7 text-[#E8EEF8] slide-up opacity-0 [animation-delay:400ms]"
                >
                    YOUR MONEY.<br />
                    <span className="text-[#2ECC8F]">YOUR</span><br />
                    <span className="text-[#2260EE]">CONTROL.</span>
                </h1>

                <p
                    className="text-[17px] text-[#8899BB] leading-[1.7] mb-11 font-light slide-up opacity-0 [animation-delay:600ms]"
                >
                    Banks detect <strong className="text-[#E8EEF8] font-medium">suspicious accounts.</strong> GarudPay detects <strong className="text-[#E8EEF8] font-medium">suspicious behavior.</strong> We act before the fraud occurs, not after.
                </p>

                <div
                    className="flex flex-wrap gap-3.5 mb-14 slide-up opacity-0 [animation-delay:800ms]"
                >
                    <Link
                        href="#download"
                        className="flex items-center gap-3 bg-[#E8EEF8] text-[#060A14] px-6 py-3.5 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(232,238,248,0.2)] transition-all cursor-none"
                    >
                        <Apple className="h-6 w-6" />
                        <div className="leading-[1.2]">
                            <span className="text-[10px] font-normal text-[#555] block">Download on the</span>
                            <strong className="text-[15px] font-semibold">App Store</strong>
                        </div>
                    </Link>
                    <Link
                        href="#download"
                        className="flex items-center gap-3 bg-[#141D33] text-[#E8EEF8] border border-[#1E2A45] px-6 py-3.5 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,79,204,0.2)] transition-all cursor-none"
                    >
                        <Play className="h-6 w-6" />
                        <div className="leading-[1.2]">
                            <span className="text-[10px] font-normal text-[#8899BB] block">Get it on</span>
                            <strong className="text-[15px] font-semibold">Google Play</strong>
                        </div>
                    </Link>
                </div>

                <div
                    className="flex justify-center md:justify-start gap-9 slide-up opacity-0 [animation-delay:1000ms]"
                >
                    <div className="border-l-2 border-[#1E2A45] pl-4">
                        <div className="font-mono text-[22px] font-medium text-[#E8EEF8]">₹7K Cr</div>
                        <div className="text-[11px] text-[#5A7099] mt-0.5">Annual fraud in India</div>
                    </div>
                    <div className="border-l-2 border-[#1E2A45] pl-4">
                        <div className="font-mono text-[22px] font-medium text-[#E8EEF8]">0 sec</div>
                        <div className="text-[11px] text-[#5A7099] mt-0.5">Detection delay</div>
                    </div>
                    <div className="border-l-2 border-[#1E2A45] pl-4">
                        <div className="font-mono text-[22px] font-medium text-[#E8EEF8]">12+</div>
                        <div className="text-[11px] text-[#5A7099] mt-0.5">Behavioral signals</div>
                    </div>
                </div>
            </div>

            {/* 3D Visual on Desktop */}
            <div className="flex-1 hidden md:flex justify-center items-center relative perspective-[1200px] slide-in opacity-0 [animation-delay:500ms]">
                <div className="glow-ring ring1"></div>
                <div className="glow-ring ring2"></div>
                <div className="glow-ring ring3"></div>

                {/* Floating Chips */}
                <div className="floating-chip chip1">
                    <span className="text-[#8899BB] block mb-0.5">Risk Score</span>
                    <span className="text-[#2ECC8F] font-medium">▼ LOW — 12</span>
                </div>
                <div className="floating-chip chip2">
                    <span className="text-[#8899BB] block mb-0.5">Vault Status</span>
                    <span className="text-[#EE9900] font-medium">🔒 ₹45,000 held</span>
                </div>
                <div className="floating-chip chip3">
                    <span className="text-[#8899BB] block mb-0.5">Signal Detected</span>
                    <span className="text-[#2260EE] font-medium">📋 Copy-paste +25</span>
                </div>

                {/* The 3D Phone */}
                <div className="phone-3d">
                    <div className="w-[300px] bg-gradient-to-br from-[#1A2440] via-[#0A0F1E] to-[#060A14] rounded-[44px] border-2 border-[#2A3A5A] px-3 pb-5 pt-4 relative shadow-[0_40px_80px_rgba(0,0,0,0.8),_0_0_60px_rgba(26,79,204,0.15),_inset_0_1px_0_rgba(255,255,255,0.08),_0_0_0_1px_rgba(255,255,255,0.04)] before:absolute before:inset-0 before:rounded-[44px] before:bg-gradient-to-br before:from-[rgba(255,255,255,0.06)] before:to-transparent before:pointer-events-none">
                        
                        {/* Notch */}
                        <div className="w-[90px] h-[24px] bg-[#060A14] rounded-b-[16px] mx-auto mb-2.5"></div>
                        
                        {/* Screen */}
                        <div className="bg-[#0A0F1E] rounded-[28px] overflow-hidden min-h-[540px] p-2.5">
                            
                            {/* Status Bar */}
                            <div className="flex justify-between px-2 pb-1.5 font-mono text-[10px] text-[#5A7099]">
                                <span>9:41</span>
                                <span>●●●</span>
                            </div>

                            {/* Brand */}
                            <div className="flex items-center gap-1.5 px-2 pb-2.5">
                                <div className="w-5 h-5 bg-[#1A4FCC] rounded-[7px] flex items-center justify-center text-[10px]">🛡</div>
                                <span className="font-mono text-[12px] tracking-[2px] font-medium text-[#E8EEF8]">GARUDPAY</span>
                            </div>

                            <div className="text-[11px] text-[#5A7099] px-2">Namaste,</div>
                            <div className="text-[16px] font-medium text-[#E8EEF8] px-2 pb-3">Aayushi 👋</div>

                            {/* Balance Card */}
                            <div className="mx-2 mb-3.5 bg-[#141D33] border border-[#1E2A45] rounded-2xl p-4">
                                <div className="text-[10px] text-[#5A7099] tracking-wide uppercase mb-1">Total Balance</div>
                                <div className="font-mono text-[26px] font-medium text-[#E8EEF8] mb-1">₹ 84,230<span className="text-[16px] text-[#5A7099]">.50</span></div>
                                <div className="flex items-center gap-1.5 text-[10px] text-[#2ECC8F]">
                                    <div className="w-1.5 h-1.5 bg-[#2ECC8F] rounded-full"></div>
                                    GarudPay protection active
                                </div>
                            </div>

                            {/* Actions grid */}
                            <div className="grid grid-cols-3 gap-2 mx-2 mb-3.5">
                                <div className="bg-[#141D33] border border-[#1E2A45] rounded-xl py-3 px-1.5 text-center">
                                    <div className="text-[16px] mb-1">↗</div>
                                    <div className="text-[9px] text-[#8899BB]">Send</div>
                                </div>
                                <div className="bg-[#141D33] border border-[#1E2A45] rounded-xl py-3 px-1.5 text-center">
                                    <div className="text-[16px] mb-1">↙</div>
                                    <div className="text-[9px] text-[#8899BB]">Request</div>
                                </div>
                                <div className="bg-[#141D33] border border-[#1E2A45] rounded-xl py-3 px-1.5 text-center">
                                    <div className="text-[16px] mb-1">⊞</div>
                                    <div className="text-[9px] text-[#8899BB]">UPI QR</div>
                                </div>
                            </div>

                            {/* Vault Alert */}
                            <div className="mx-2 bg-gradient-to-br from-[#1A1000] to-[#141D33] border border-[#CC7700] rounded-[14px] p-3.5 flex items-center gap-2.5">
                                <div className="w-9 h-9 bg-[rgba(238,153,0,0.1)] rounded-[10px] flex items-center justify-center text-[18px] shrink-0">🔒</div>
                                <div className="flex-1">
                                    <div className="text-[11px] font-medium text-[#EE9900] mb-0.5">Vault Protection Active</div>
                                    <div className="text-[9px] text-[#5A7099] leading-[1.4]">1 payment paused · ₹15,000 held safely · 23h remaining</div>
                                </div>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
