"use client";

import { useScrollAnimation } from "@/lib/animations";

export function Features() {
    const titleAnim = useScrollAnimation(0.2);
    // Observe cards
    const gridAnim = useScrollAnimation(0.1);
    
    const features = [
        {
            icon: "🧠",
            color: "blue",
            title: "Behavioral Coercion Detection",
            desc: "The world's first payment system that doesn't just evaluate the account — it evaluates the psychological state. 12 real-time behavioral signals including copy-paste, call history, typing patterns, and screen dwell time. All analyzed completely silently and instantly.",
            tag: "CORE TECHNOLOGY",
            bgColor: "bg-[rgba(26,79,204,0.15)]",
            borderColor: "hover:border-[#2260EE]",
            lineColor: "linear-gradient(90deg, transparent, rgba(26,79,204,0.5), transparent)"
        },
        {
            icon: "🔒",
            color: "amber",
            title: "Smart Contract Vault",
            desc: "Flagged payments are routed directly into a Trustless Smart Contract Vault. Not us, not the bank, and not the government can access it. Only YOU have the ability to withdraw it within the 24-hour window. Auto-return is mathematically guaranteed by code, not by empty promises.",
            tag: "BLOCKCHAIN ESCROW",
            bgColor: "bg-[rgba(238,153,0,0.1)]",
            borderColor: "hover:border-[#EE9900]",
            lineColor: "linear-gradient(90deg, transparent, rgba(238,153,0,0.5), transparent)"
        },
        {
            icon: "⛓",
            color: "green",
            title: "Decentralized Fraud Registry",
            desc: "When one user reports a scam, the entire network is instantly protected. Mule accounts are permanently flagged on the blockchain. They cannot be deleted or hidden. If a scammer attempts to create a new layer of accounts, their historical patterns trace back instantly.",
            tag: "COMMUNITY SHIELD",
            bgColor: "bg-[rgba(46,204,143,0.1)]",
            borderColor: "hover:border-[#2ECC8F]",
            lineColor: "linear-gradient(90deg, transparent, rgba(46,204,143,0.5), transparent)"
        },
        {
            icon: "⚡",
            color: "red",
            title: "3-Tier Precision AI",
            desc: "Over 95% of transactions are completely smooth — a better UX than traditional banking apps. The Vault is only activated on genuine red flags. Mathematically calibrated thresholds ensure that regular payments are instant, while precision coercion is intercepted flawlessly.",
            tag: "PRECISION CALIBRATED",
            bgColor: "bg-[rgba(238,51,51,0.1)]",
            borderColor: "hover:border-[#EE3333]",
            lineColor: "linear-gradient(90deg, transparent, rgba(238,51,51,0.5), transparent)"
        }
    ];

    return (
        <section id="features" className="relative z-10 py-24 bg-[#060A14]">
            <div className="text-center px-6">
                <div className="inline-flex items-center gap-2 bg-[rgba(26,79,204,0.1)] border border-[rgba(26,79,204,0.3)] rounded-full px-4 py-1.5 mb-5">
                    <span className="text-[11px] text-[#2260EE] font-medium tracking-wide uppercase">Features</span>
                </div>
                
                <h2 
                    ref={titleAnim.ref}
                    className={`font-bebas text-[44px] md:text-[58px] leading-[0.95] tracking-wide mb-4 text-[#E8EEF8] reveal ${titleAnim.isVisible ? 'visible' : ''}`}
                >
                    TECHNOLOGY<br />THAT <span className="text-[#2260EE]">THINKS.</span>
                </h2>
                
                <p className="text-[16px] text-[#8899BB] leading-[1.7] max-w-[620px] mx-auto font-light mb-16 px-4">
                    Three layers of protection. AI handles the intelligence. Blockchain provides the trust. Most importantly — zero friction for normal transactions.
                </p>
            </div>

            {/* Feature Grid layout */}
            <div 
                ref={gridAnim.ref}
                className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto px-6 relative z-10"
            >
                {features.map((ft, idx) => (
                    <div 
                        key={idx}
                        className={`feature-card ${gridAnim.isVisible ? 'visible' : ''} bg-[#141D33] border border-[#1E2A45] rounded-3xl p-8 max-md:p-6 relative overflow-hidden group transition-all duration-300 ${ft.borderColor} hover:-translate-y-2`}
                    >
                        {/* Hover Neon Top Line */}
                        <div 
                            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: ft.lineColor }}
                        ></div>
                        
                        <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-3xl mb-6 shrink-0 ${ft.bgColor}`}>
                            {ft.icon}
                        </div>
                        
                        <div>
                            <h3 className="text-[22px] font-semibold text-[#E8EEF8] mb-3">{ft.title}</h3>
                            <p className="text-[14px] text-[#8899BB] leading-[1.7] font-light mb-5">
                                {ft.desc}
                            </p>
                            <div className="inline-block text-[11px] text-[#2260EE] bg-[rgba(26,79,204,0.1)] border border-[rgba(26,79,204,0.2)] rounded-lg px-3 py-1.5 font-medium tracking-wide">
                                {ft.tag}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
