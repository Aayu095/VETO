import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ShieldCheck } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* App Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="font-bold text-xl text-slate-900">VETO <span className="text-slate-400 font-normal">Vault</span></div>
                    <ConnectButton />
                </div>
            </header>

            <main className="container py-8 px-4 space-y-8">

                {/* Status Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Protected Balance</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18,000 MNEE</div>
                            <p className="text-xs text-slate-500">Safely held in wallet</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Locked in Vault</CardTitle>
                            <Clock className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0.00 MNEE</div>
                            <p className="text-xs text-slate-500">Pending release</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scams Prevented</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-slate-500">Lifetime saves</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Active Vaults */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight">Active Vault Locks</h2>

                    <Card className="border-l-4 border-l-amber-500">
                        <div className="flex items-center justify-between p-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-900">Sending 18,000 MNEE</span>
                                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                        Locked (3h 59m)
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">To: 0xcd...9e (Suspicious 'Penny Drop' detected)</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="destructive">Recall Funds</Button>
                                <Button variant="outline">View Details</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Empty State */}
                    <div className="text-center py-12 text-slate-400 text-sm">
                        No other active locks. You are safe.
                    </div>
                </div>
            </main>
        </div>
    );
}
