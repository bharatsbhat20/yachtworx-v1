"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Anchor, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "OWNER" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Registration failed");
        return;
      }

      // Auto sign in
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength =
    form.password.length === 0
      ? 0
      : form.password.length < 8
        ? 1
        : form.password.length < 12
          ? 2
          : 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-600 to-ocean flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-ocean text-white">
                <Anchor className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-2xl text-navy">
                Yacht<span className="gradient-text">worx</span>
              </span>
            </Link>
          </div>

          <h1 className="font-heading text-2xl font-bold text-navy text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-500 text-center text-sm mb-6">
            Join as a yacht owner — free to start
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-ocean bg-ocean/5 cursor-pointer">
              <span className="text-2xl mb-1">⛵</span>
              <span className="text-sm font-semibold text-ocean">Yacht Owner</span>
            </div>
            <Link href="/auth/register/provider" className="flex flex-col items-center p-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">
              <span className="text-2xl mb-1">🔧</span>
              <span className="text-sm font-medium text-slate-600">Service Provider</span>
            </Link>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Mariner"
              value={form.name}
              onChange={update("name")}
              icon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={update("password")}
                icon={<Lock className="w-4 h-4" />}
                required
              />
              {form.password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? level === 1
                            ? "bg-red-400"
                            : level === 2
                              ? "bg-gold"
                              : "bg-teal"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              icon={
                form.confirmPassword && form.password === form.confirmPassword ? (
                  <CheckCircle className="w-4 h-4 text-teal" />
                ) : (
                  <Lock className="w-4 h-4" />
                )
              }
              required
            />

            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Free Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            By signing up you agree to our{" "}
            <Link href="#" className="text-ocean hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-ocean hover:underline">
              Privacy Policy
            </Link>
          </p>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-ocean font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
