import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="h-6 w-6 text-slate-900" />
                            <span className="text-xl font-bold text-slate-900">VETO</span>
                        </div>
                        <p className="text-slate-500 max-w-xs">
                            The first intelligent payment layer preventing APP fraud with programmable money.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-blue-600">Mobile Wallet</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Web Vault</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Hackathon</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-blue-600">MNEE Stablecoin</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Smart Contract</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400">© 2026 VETO Protocol. Built for MNEE Hackathon.</p>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
