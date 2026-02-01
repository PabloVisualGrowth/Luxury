import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockClient as base44 } from "@/api/mockClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await base44.auth.login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-rose/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-brand-pine/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-pine mb-6 shadow-xl">
                        <span className="text-white font-bold text-2xl tracking-tighter">SL</span>
                    </div>
                    <h1 className="text-3xl font-bold text-brand-chocolate mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-brand-chocolate/60 font-light italic">Enter your credentials to access your private enclave.</p>
                </div>

                <Card className="border-brand-rose/20 shadow-2xl rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                    <CardHeader className="pt-10 pb-6 px-8">
                        <CardTitle className="text-xl font-bold text-brand-chocolate">Private Access</CardTitle>
                        <CardDescription className="text-brand-chocolate/40 tracking-wide uppercase text-[10px] font-bold">
                            Sustainable Luxury Excellence Platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-600 rounded-xl">
                                    <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold text-brand-chocolate/60 uppercase ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-chocolate/30" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-12 border-brand-rose/30 focus:border-brand-brick focus:ring-brand-brick rounded-xl bg-white/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <Label htmlFor="password" className="text-xs font-bold text-brand-chocolate/60 uppercase ml-1">Password</Label>
                                    <button type="button" className="text-[10px] font-bold text-brand-brick hover:underline uppercase tracking-tighter">
                                        Recover?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-chocolate/30" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 h-12 border-brand-rose/30 focus:border-brand-brick focus:ring-brand-brick rounded-xl bg-white/50"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-brick hover:bg-brand-brown text-white h-14 rounded-2xl font-bold shadow-xl shadow-brand-brick/20 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="bg-brand-rose/10 px-8 py-6 flex justify-center border-t border-brand-rose/20">
                        <p className="text-sm text-brand-chocolate/40 font-light">
                            Not a member yet? <button className="text-brand-brick font-bold hover:underline">Apply for Membership</button>
                        </p>
                    </CardFooter>
                </Card>

                <div className="mt-8 text-center text-[10px] text-brand-chocolate/30 uppercase tracking-[0.2em] font-bold">
                    © 2024 Sustainable Luxury. All rights reserved.
                </div>
            </motion.div>
        </div>
    );
}
