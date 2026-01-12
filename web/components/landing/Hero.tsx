"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { useScrollAnimation, fadeIn, fadeInVisible } from "@/lib/animations";

export function Hero() {
    const contentAnim = useScrollAnimation(0.2);
    const mockupAnim = useScrollAnimation(0.2);

    return (
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl opacity-70"></div>
                <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-slate-50/50 rounded-full blur-3xl opacity-70"></div>
            </div>

            <div className="container relative z-10 px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div
                    ref={contentAnim.ref}
                    className={`space-y-8 ${fadeIn} ${contentAnim.isVisible ? fadeInVisible : ''}`}
                >
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                        The payment layer that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">says No</span> for you.
                    </h1>

                    <p className="max-w-[600px] text-lg text-slate-500 leading-relaxed">
                        Stop Authorized Push Payment (APP) fraud before it settles. VETO uses AI to intercept risky transfers and move them to a secure Time-Lock Vault.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/download">
                            <Button size="lg" className="h-14 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-full w-full sm:w-auto">
                                Protect Your Wallet
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 w-full sm:w-auto">
                                How VETO Works <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-4 flex items-center gap-6 text-sm text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>MNEE Supported</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>Non-Custodial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>AI Powered</span>
                        </div>
                    </div>
                </div>

                {/* Visual Mockup */}
                <div
                    ref={mockupAnim.ref}
                    className={`relative mx-auto w-full max-w-[500px] lg:max-w-none ${fadeIn} ${mockupAnim.isVisible ? fadeInVisible : ''}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    <div className="relative rounded-3xl bg-slate-100 border border-slate-200 p-2 shadow-2xl hover:shadow-3xl transition-shadow duration-500 animate-float">
                        <div className="rounded-2xl overflow-hidden bg-white">
                            {/* Mock Interface Header */}
                            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="text-xs font-medium text-slate-400">VETO Safe Protocol</div>
                            </div>
                            {/* Mock Interface Body */}
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-slate-400">Status</div>
                                        <div className="text-xl font-bold text-emerald-600">Protected</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-slate-400">Vault Balance</div>
                                        <div className="text-xl font-bold text-slate-900">0.00 MNEE</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <ShieldAlert className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-red-900">Threat Blocked</div>
                                        <div className="text-sm text-red-700 mt-1">
                                            We intercepted a transaction to <strong>0x9f...a1</strong> due to a 'Penny Drop' signature.
                                        </div>
                                        <Button size="sm" variant="destructive" className="mt-3 w-full">Emergency Recall</Button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-300 font-mono">AI-AGENT-ID: VETO-8X-SENTINEL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-blue-600 rounded-2xl -z-10 opacity-10 rotate-12"></div>
                    <div className="absolute -top-6 -left-6 h-32 w-32 bg-emerald-500 rounded-full -z-10 opacity-10 blur-xl"></div>
                </div>
            </div>
        </section>
    );
}
