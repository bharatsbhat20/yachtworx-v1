"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Anchor, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Redirect based on role — we'll let middleware handle it
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-600 to-ocean flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
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
            Welcome back
          </h1>
          <p className="text-slate-500 text-center text-sm mb-8">
            Sign in to your Yachtworx account
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Demo credentials hint */}
          <div className="p-3 rounded-xl bg-ocean/5 border border-ocean/10 text-xs text-ocean mb-6">
            <strong>Demo:</strong> owner@demo.com / demo1234 or mechanic@demo.com / demo1234
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm text-ocean hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-ocean font-semibold hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
