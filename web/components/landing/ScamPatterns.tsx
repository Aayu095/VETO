"use client";

import { AlertTriangle, Clock, Users, Zap } from "lucide-react";
import { useScrollAnimation, fadeIn, fadeInVisible, slideUp, slideUpVisible } from "@/lib/animations";

export function ScamPatterns() {
    const titleAnim = useScrollAnimation();
    const testimonialAnim = useScrollAnimation();
    const card1Anim = useScrollAnimation();
    const card2Anim = useScrollAnimation();
    const card3Anim = useScrollAnimation();
    const card4Anim = useScrollAnimation();

    const patterns = [
        {
            name: "The Penny Drop",
            icon: Users,
            desc: "Scammer sends a tiny amount (e.g., 1 MNEE) to build false trust before asking for a large sum.",
            stat: "Detected in 100% of Honey-Trap scams",
            anim: card1Anim,
            delay: "100ms"
        },
        {
            name: "Hyper-Urgency",
            icon: Clock,
            desc: "Transactions sent within seconds of pasting an address. High panic indicator.",
            stat: "Common in Social Engineering attacks",
            anim: card2Anim,
            delay: "200ms"
        },
        {
            name: "The Double Dip",
            icon: Zap,
            desc: "Sending the exact same amount twice in 5 minutes. Often caused by 'Fake Error' messages.",
            stat: "Prevents accidental duplicate payments",
            anim: card3Anim,
            delay: "300ms"
        },
        {
            name: "Fresh Wallet",
            icon: AlertTriangle,
            desc: "Sending large sums to a wallet created less than 24 hours ago.",
            stat: "Flagged as High Risk automatically",
            anim: card4Anim,
            delay: "400ms"
        },
    ];

    return (
        <section id="patterns" className="py-24 bg-white">
            <div className="container px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div
                            ref={titleAnim.ref}
                            className={`${fadeIn} ${titleAnim.isVisible ? fadeInVisible : ''}`}
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Scammers Use Psychology. We Use AI to Know Their Moves.
                            </h2>
                            <p className="mt-4 text-lg text-slate-500">
                                VETO's AI is trained on thousands of fraud cases. It recognizes the subtle signatures of a scam that humans miss in the heat of the moment.
                            </p>
                        </div>

                        <div
                            ref={testimonialAnim.ref}
                            className={`pt-4 ${slideUp} ${testimonialAnim.isVisible ? slideUpVisible : ''}`}
                        >
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Real Case Study</div>
                                <blockquote className="text-lg font-medium text-slate-900 italic">
                                    "I received 1 Rupee from a stranger, then sent him ₹18,000. It was a trap. VETO would have seen that 1 Rupee clearly."
                                </blockquote>
                                <div className="mt-4 text-sm font-bold text-slate-900">— Vinayak, Victim of APP Fraud</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {patterns.map((p, idx) => (
                            <div
                                key={idx}
                                ref={p.anim.ref}
                                className={`p-6 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${slideUp} ${p.anim.isVisible ? slideUpVisible : ''}`}
                                style={{ transitionDelay: p.delay }}
                            >
                                <div className="mb-4 inline-flex p-3 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-110 transition-all">
                                    <p.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{p.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">{p.desc}</p>
                                <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                                    {p.stat}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
