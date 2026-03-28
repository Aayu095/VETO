"use client";

import { useScrollAnimation } from "@/lib/animations";

export function HowItWorks() {
    const titleAnim = useScrollAnimation(0.2);
    const textAnim = useScrollAnimation(0.4);
    const step1Anim = useScrollAnimation(0.2);
    const step2Anim = useScrollAnimation(0.3);
    const step3Anim = useScrollAnimation(0.4);
    const step4Anim = useScrollAnimation(0.5);
    const vizAnim = useScrollAnimation(0.6);

    const steps = [
        {
            num: "01",
            title: "Signals Are Collected Silently",
            desc: "When you initiate a payment — 12 behavioral signals are collected in the background. Copy-paste, recent calls, typing speed, and confirm screen dwell time. There is no UI interference. You won't even notice.",
            anim: step1Anim
        },
        {
            num: "02",
            title: "BCD Engine Calculates the Risk Score",
            desc: "The Behavioral Coercion Detection engine synthesizes these signals to generate a real-time risk score. A single signal never triggers the vault — it requires multiple strong coercion indicators.",
            anim: step2Anim
        },
        {
            num: "03",
            title: "Normal or Vault — 3 Tiers",
            desc: "Score 0-39: completely normal payment. Score 40-69: a gentle friction warning. Score 70+: The Vault activates — funds are held, buying you the exact time you need to think clearly. Auto-returns in 24 hours.",
            anim: step3Anim
        },
        {
            num: "04",
            title: "Smart Contract Escrow — Trustless",
            desc: "Money held in the Vault cannot be touched by anyone — not us, not the bank, not the government. It is controlled entirely by a transparent smart contract. Your money remains strictly under your control.",
            anim: step4Anim
        }
    ];

    return (
        <section id="how-it-works" className="relative z-10 py-[100px] px-6 md:px-[60px] bg-[#060A14]">
            <div className="grid md:grid-cols-2 gap-[80px] items-center">
                
                {/* Left side text */}
                <div>
                    <div
                        ref={titleAnim.ref}
                        className={`inline-flex items-center gap-2 bg-[rgba(26,79,204,0.1)] border border-[rgba(26,79,204,0.3)] rounded-full px-4 py-1.5 mb-5 reveal ${titleAnim.isVisible ? 'visible' : ''}`}
                    >
                        <span className="text-[11px] text-[#2260EE] font-medium tracking-wide uppercase">How It Works</span>
                    </div>

                    <h2
                        className={`font-bebas text-[44px] md:text-[58px] leading-[0.95] tracking-wide mb-4 text-[#E8EEF8] reveal ${titleAnim.isVisible ? 'visible' : ''}`}
                    >
                        FRAUD HAPPENS FIRST.<br />
                        <span className="text-[#2260EE]">PAYMENT SECOND.</span>
                    </h2>

                    <div className="w-[60px] h-0.5 bg-gradient-to-r from-[#1A4FCC] to-transparent mb-5"></div>

                    <p
                        ref={textAnim.ref}
                        className={`text-[16px] text-[#8899BB] leading-[1.7] max-w-[520px] font-light reveal ${textAnim.isVisible ? 'visible' : ''}`}
                    >
                        GarudPay doesn't just check the destination account. It evaluates <em>the psychological state</em> in which you are making the payment. 12 behavioral signals analyzed in real-time.
                    </p>

                    <div className="mt-12 flex flex-col">
                        {steps.map((step, idx) => (
                            <div 
                                key={idx}
                                ref={step.anim.ref}
                                className={`step ${step.anim.isVisible ? 'visible' : ''} flex gap-6 py-7 border-b border-[#1E2A45] last:border-b-0 group`}
                            >
                                <div className="font-bebas text-5xl text-[#1E2A45] leading-none min-w-[40px] transition-colors group-hover:text-[#1A4FCC]">
                                    {step.num}
                                </div>
                                <div>
                                    <div className="text-[18px] font-semibold text-[#E8EEF8] mb-2">{step.title}</div>
                                    <div className="text-[14px] text-[#8899BB] leading-[1.7] font-light">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side visualization */}
                <div 
                    ref={vizAnim.ref}
                    className={`relative flex justify-center reveal ${vizAnim.isVisible ? 'visible' : ''}`}
                >
                    <div className="relative w-[360px] h-[360px] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#1E2A45]"></div>
                        <div className="absolute inset-[30px] rounded-full border border-[rgba(26,79,204,0.2)]"></div>

                        {/* Animated SVG Ring */}
                        <svg className="absolute w-[360px] h-[360px]" viewBox="0 0 360 360">
                            <circle cx="180" cy="180" r="140" fill="none" stroke="#141D33" strokeWidth="12" />
                            <circle cx="180" cy="180" r="140" fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
                                strokeDasharray="879" strokeDashoffset="140" strokeLinecap="round"
                                className="origin-center -rotate-90" 
                                style={{ animation: "scoreSpin 3s ease-in-out infinite alternate" }}
                            />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2ECC8F" />
                                    <stop offset="50%" stopColor="#EE9900" />
                                    <stop offset="100%" stopColor="#EE3333" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Signal orbs */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 bg-[#051A0E] border border-[rgba(46,204,143,0.4)] rounded-full px-3 py-1 text-[11px] text-[#2ECC8F] whitespace-nowrap animate-[orbFloat_3s_ease-in-out_infinite]">
                                ✓ Normal amount
                            </div>
                            <div className="absolute right-[-20px] top-[35%] bg-[#1A1000] border border-[rgba(238,153,0,0.4)] rounded-full px-3 py-1 text-[11px] text-[#EE9900] whitespace-nowrap animate-[orbFloat_4s_ease-in-out_infinite_1s]">
                                ⚠ New recipient
                            </div>
                            <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 bg-[#1A0A00] border border-[rgba(238,51,51,0.4)] rounded-full px-3 py-1 text-[11px] text-[#EE3333] whitespace-nowrap animate-[orbFloat_5s_ease-in-out_infinite_0.5s]">
                                ✕ Copy-paste detected
                            </div>
                            <div className="absolute left-[-20px] top-[35%] bg-[#1A0A00] border border-[rgba(238,51,51,0.4)] rounded-full px-3 py-1 text-[11px] text-[#EE3333] whitespace-nowrap animate-[orbFloat_3.5s_ease-in-out_infinite_2s]">
                                ✕ 42min unknown call
                            </div>
                        </div>

                        {/* Center Score */}
                        <div className="bg-[#141D33] border border-[#1E2A45] rounded-[20px] px-8 py-6 text-center relative z-10 w-[200px] shadow-xl">
                            <div className="font-bebas text-7xl leading-none tracking-wide text-[#EE9900]">75</div>
                            <div className="text-[11px] text-[#5A7099] tracking-widest uppercase mt-1">RISK SCORE</div>
                            <div className="mt-2.5 text-[11px] text-[#EE9900] bg-[rgba(238,153,0,0.1)] border border-[rgba(238,153,0,0.2)] rounded-lg py-1 px-2.5">
                                🔒 Vault Activated
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
