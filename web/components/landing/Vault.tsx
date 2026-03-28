"use client";

import { useScrollAnimation } from "@/lib/animations";

export function Vault() {
    const leftAnim = useScrollAnimation(0.2);
    const rightAnim = useScrollAnimation(0.4);

    return (
        <section id="vault" className="relative z-10 bg-[#0F1628] border-y border-[#1E2A45] py-[100px] px-6 md:px-[60px] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-[80px] items-center">
                
                {/* Vault Visual UI */}
                <div 
                    ref={leftAnim.ref}
                    className={`flex flex-col gap-3 reveal ${leftAnim.isVisible ? 'visible' : ''}`}
                >
                    <div className="bg-[#060A14] border border-[#CC7700] rounded-3xl p-7 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(238,153,0,0.06)] to-transparent pointer-events-none"></div>
                        
                        <div className="flex items-center gap-3.5 mb-5 relative z-10">
                            <div className="w-[52px] h-[52px] bg-[rgba(238,153,0,0.1)] border border-[rgba(238,153,0,0.3)] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                                🔒
                            </div>
                            <div>
                                <div className="text-[20px] font-semibold text-[#E8EEF8] mb-0.5">Payment Paused</div>
                                <div className="text-[12px] text-[#EE9900]">Unusual coercion patterns detected</div>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-1.5 relative z-10">
                            <span className="text-[12px] text-[#5A7099]">Securely held</span>
                        </div>
                        <div className="font-mono text-[32px] font-medium text-[#EE9900] relative z-10">₹ 45,000</div>

                        <div className="vault-timer-bar relative z-10">
                            <div className="vault-timer-fill"></div>
                        </div>

                        <div className="text-[11px] text-[#5A7099] text-right relative z-10">Auto-returns in 16:24:07</div>

                        <div className="flex gap-2.5 mt-5 relative z-10">
                            <button className="flex-1 py-3 rounded-xl text-center text-[13px] font-medium bg-[rgba(46,204,143,0.1)] border border-[rgba(46,204,143,0.3)] text-[#2ECC8F] cursor-none hover:bg-[rgba(46,204,143,0.15)] transition-colors">
                                ✓ Yes, release it
                            </button>
                            <button className="flex-1 py-3 rounded-xl text-center text-[13px] font-medium bg-[rgba(238,51,51,0.1)] border border-[rgba(238,51,51,0.3)] text-[#EE3333] cursor-none hover:bg-[rgba(238,51,51,0.15)] transition-colors">
                                ✕ Return my money
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#141D33] border border-[#1E2A45] rounded-2xl py-4 px-5">
                        <div className="text-[11px] text-[#5A7099] tracking-widest uppercase mb-3 font-medium">Why we flagged this</div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-1.5 h-1.5 bg-[#EE3333] rounded-full shrink-0"></div>
                            <div className="text-[12px] text-[#8899BB]">Account number copy-pasted from clipboard</div>
                        </div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-1.5 h-1.5 bg-[#EE3333] rounded-full shrink-0"></div>
                            <div className="text-[12px] text-[#8899BB]">42 minute unknown call detected 8 min before payment</div>
                        </div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-1.5 h-1.5 bg-[#EE3333] rounded-full shrink-0"></div>
                            <div className="text-[12px] text-[#8899BB]">Recipient account first-time use, created recently</div>
                        </div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-1.5 h-1.5 bg-[#EE9900] rounded-full shrink-0"></div>
                            <div className="text-[12px] text-[#5A7099]">Amount 4x higher than your usual transfers</div>
                        </div>
                    </div>
                </div>

                {/* Right side text */}
                <div 
                    ref={rightAnim.ref}
                    className={`reveal ${rightAnim.isVisible ? 'visible' : ''}`}
                >
                    <div className="inline-flex items-center gap-2 bg-[rgba(26,79,204,0.1)] border border-[rgba(26,79,204,0.3)] rounded-full px-4 py-1.5 mb-5">
                        <span className="text-[11px] text-[#2260EE] font-medium tracking-wide uppercase">Smart Vault</span>
                    </div>

                    <h2 className="font-bebas text-[44px] md:text-[58px] leading-[0.95] tracking-wide mb-4 text-[#E8EEF8]">
                        THE MONEY STAYS PAUSED.<br />
                        <span className="text-[#2ECC8F]">YOU REGAIN CONTROL.</span>
                    </h2>

                    <div className="w-[60px] h-0.5 bg-gradient-to-r from-[#1A4FCC] to-transparent mb-5"></div>

                    <p className="text-[16px] text-[#8899BB] leading-[1.7] max-w-[520px] font-light">
                        A scammer's greatest weapon is urgency — "send it now, or your account will be blocked." The Vault attacks that urgency directly. It enforces a mandatory pause — an escape window — giving you the breathing room to realize what is actually happening.
                    </p>

                    <div className="flex gap-2.5 flex-wrap mt-7">
                        <div className="flex items-center gap-1.5 bg-[#141D33] border border-[#1E2A45] rounded-full px-3.5 py-1.5 text-[12px] text-[#8899BB]">
                            <div className="w-1.5 h-1.5 bg-[#2260EE] rounded-full shrink-0"></div> Smart Contract Escrow
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#141D33] border border-[#1E2A45] rounded-full px-3.5 py-1.5 text-[12px] text-[#8899BB]">
                            <div className="w-1.5 h-1.5 bg-[#2ECC8F] rounded-full shrink-0"></div> Trustless — Zero Central Control
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#141D33] border border-[#1E2A45] rounded-full px-3.5 py-1.5 text-[12px] text-[#8899BB]">
                            <div className="w-1.5 h-1.5 bg-[#EE9900] rounded-full shrink-0"></div> 24hr Auto-Return
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#141D33] border border-[#1E2A45] rounded-full px-3.5 py-1.5 text-[12px] text-[#8899BB]">
                            <div className="w-1.5 h-1.5 bg-[#2260EE] rounded-full shrink-0"></div> Blockchain Transparent
                        </div>
                    </div>

                    <div className="mt-9 bg-[#141D33] border border-[#1E2A45] rounded-2xl py-5 px-6">
                        <div className="text-[12px] text-[#5A7099] tracking-widest uppercase mb-3.5 font-medium">Override Feature</div>
                        <p className="text-[13px] text-[#8899BB] leading-[1.7] font-light">
                            If the transaction is genuinely yours, there is a 3-statement Override flow. Three conscious checks to confirm trust. This friction is highly intentional — it acts as a mirror for a scam victim. Often, a single second of friction breaks the illusion and saves the funds.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
