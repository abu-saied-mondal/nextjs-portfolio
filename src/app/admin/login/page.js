"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Check if already authenticated on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (data.success) {
          router.push("/admin");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#03030f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00f2fe] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03030f] text-slate-200 flex flex-col justify-center items-center px-6 relative overflow-hidden font-sans">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00f2fe]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#7000ff]/5 blur-[120px] pointer-events-none" />

      {/* Floating Home Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-[#00f2fe] transition-colors border border-white/5 bg-white/5 px-4 py-2.5 rounded-xl backdrop-blur-md no-underline"
      >
        <Home className="w-4 h-4" /> Back to Site
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-[0_0_20px_rgba(0,242,254,0.05)]">
            <Lock className="w-6 h-6 text-[#00f2fe] shadow-sm" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console</h1>
          <p className="text-sm text-slate-400 mt-2 font-light">
            Enter your access credentials to manage portfolio content.
          </p>
        </div>

        {/* Login Card */}
        <div
          className="p-8 md:p-10 rounded-3xl relative overflow-hidden"
          style={{
            background: "rgba(9,9,21,0.75)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8)",
          }}
        >
          {/* Card Border Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe]/40 to-transparent" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Password input */}
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                Security Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold leading-relaxed animate-fade-in">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="flex items-center justify-center gap-2 w-full py-4 text-xs font-semibold tracking-wider text-black bg-[#00f2fe] hover:bg-white rounded-xl shadow-[0_10px_25px_-5px_rgba(0,242,254,0.3)] hover:shadow-[0_12px_28px_-5px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  AUTHENTICATE SECURELY <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-600 mt-8">
          DevSki Portfolio Dashboard • Protected Area
        </p>
      </div>
    </div>
  );
}
