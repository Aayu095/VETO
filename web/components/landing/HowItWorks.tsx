"use client";

import { Scan, ShieldAlert, History } from "lucide-react";
import { useScrollAnimation, fadeIn, fadeInVisible, slideUp, slideUpVisible } from "@/lib/animations";

export function HowItWorks() {
    const titleAnim = useScrollAnimation();
    const step1Anim = useScrollAnimation();
    const step2Anim = useScrollAnimation();
    const step3Anim = useScrollAnimation();

    const steps = [
        {
            icon: Scan,
            title: "1. The Scan",
            desc: "Every time you send money, our AI Agent scans the recipient address and transaction pattern in milliseconds.",
            color: "blue",
            anim: step1Anim,
            delay: "100ms"
        },
        {
            icon: ShieldAlert,
            title: "2. The Interception",
            desc: "If a risk is detected (like a 'Penny Drop' scam), funds don't go to the scammer. They move to the VETO Vault.",
            color: "amber",
            anim: step2Anim,
            delay: "200ms"
        },
        {
            icon: History,
            title: "3. The Recall",
            desc: "The money sits in the Time-Lock Vault for 4-24 hours. Realized it's a scam? Click 'Undo' to get a full refund.",
            color: "emerald",
            anim: step3Anim,
            delay: "300ms"
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container px-6 md:px-12">
                <div
                    ref={titleAnim.ref}
                    className={`text-center max-w-3xl mx-auto mb-16 ${fadeIn} ${titleAnim.isVisible ? fadeInVisible : ''}`}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Introducing the Vault Protocol
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                        Scammers count on panic. We introduce intelligent friction to give you the one thing crypto lacks: <strong>Time</strong> to verify before you lose your money.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            ref={step.anim.ref}
                            className={`relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${slideUp} ${step.anim.isVisible ? slideUpVisible : ''}`}
                            style={{ transitionDelay: step.delay }}
                        >
                            <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-${step.color}-100 text-${step.color}-600 mb-6`}>
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
