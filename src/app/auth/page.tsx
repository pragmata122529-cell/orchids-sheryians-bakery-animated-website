"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CursorFollower } from "@/components/CursorFollower";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/profile");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        router.push("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setEmailSent(true);
        toast.success("Check your email to verify your account!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <>
        <CursorFollower />
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-2xl"
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-black uppercase tracking-wider mb-4">
              Check Your <span className="gradient-text">Email</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              We've sent a verification link to <span className="text-primary font-bold">{formData.email}</span>. 
              Click the link to activate your account.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEmailSent(false)}
              className="px-8 py-4 bg-card border border-primary/30 text-foreground font-bold uppercase tracking-wider"
              style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
            >
              Back to Sign In
            </motion.button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CursorFollower />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div 
              className="relative p-10 bg-card border border-primary/20 overflow-hidden"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-caramel to-primary" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-caramel flex items-center justify-center text-4xl shadow-xl"
                  style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}
                >
                  🍰
                </motion.div>
                <h1 className="text-3xl font-black uppercase tracking-wider text-foreground">
                  {isLogin ? "Welcome Back" : "Join Us"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isLogin ? "Sign in to continue your sweet journey" : "Create an account to start ordering"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-bold uppercase tracking-wider text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0 100%)" }}
                          placeholder="Your name"
                          required={!isLogin}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0 100%)" }}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-4 bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0 100%)" }}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 bg-gradient-to-r from-primary via-caramel to-primary text-primary-foreground font-black text-lg uppercase tracking-wider shadow-xl shadow-primary/30 disabled:opacity-50"
                  style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight size={20} />
                    </span>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary font-bold uppercase tracking-wider hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
