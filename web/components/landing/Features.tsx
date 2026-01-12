"use client";

import { Lock, Smartphone, Globe } from "lucide-react";
import { useScrollAnimation, fadeIn, fadeInVisible, slideUp, slideUpVisible } from "@/lib/animations";

export function Features() {
    const titleAnim = useScrollAnimation();
    const card1Anim = useScrollAnimation();
    const card2Anim = useScrollAnimation();
    const card3Anim = useScrollAnimation();

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10 px-6 md:px-12">
                <div
                    ref={titleAnim.ref}
                    className={`text-center max-w-2xl mx-auto mb-16 ${fadeIn} ${titleAnim.isVisible ? fadeInVisible : ''}`}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Your Money. Your Rules. AI Protection.
                    </h2>
                    <p className="mt-4 text-slate-400 text-lg">
                        Whether you're buying coffee or closing a business deal, VETO ensures your MNEE lands where it should.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div
                        ref={card1Anim.ref}
                        className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 ${slideUp} ${card1Anim.isVisible ? slideUpVisible : ''}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <Lock className="h-10 w-10 text-blue-400 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Time-Lock Escrow</h3>
                        <p className="text-slate-400">Funds are held in a smart contract, not a centralized wallet. Only you can recall them.</p>
                    </div>

                    <div
                        ref={card2Anim.ref}
                        className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 ${slideUp} ${card2Anim.isVisible ? slideUpVisible : ''}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <Smartphone className="h-10 w-10 text-emerald-400 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Mobile Native</h3>
                        <p className="text-slate-400">Designed for iOS and Android. Biometric override lets you approve trusted transfers instantly.</p>
                    </div>

                    <div
                        ref={card3Anim.ref}
                        className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300 ${slideUp} ${card3Anim.isVisible ? slideUpVisible : ''}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <Globe className="h-10 w-10 text-amber-400 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Universal Standard</h3>
                        <p className="text-slate-400">Built on Ethereum & MNEE. Works with any wallet, but works best with VETO App.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
