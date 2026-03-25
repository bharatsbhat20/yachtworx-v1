"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Anchor,
  Mail,
  Lock,
  User,
  Building,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Step = 1 | 2 | 3;

export default function ProviderRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    location: "",
    phone: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function nextStep() {
    if (step === 1) {
      if (!form.name || !form.email || !form.password) {
        setError("Please fill all required fields");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
    }
    if (step === 2 && !form.businessName) {
      setError("Business name is required");
      return;
    }
    setError("");
    setStep((prev) => (prev + 1) as Step);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "PROVIDER" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Registration failed");
        return;
      }

      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      router.push("/provider/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { label: "Account", number: 1 },
    { label: "Business", number: 2 },
    { label: "Services", number: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-600 to-ocean flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-ocean text-white">
                <Anchor className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-2xl text-navy">
                Yacht<span className="gradient-text">worx</span>
              </span>
            </Link>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                    step > s.number
                      ? "bg-teal text-white"
                      : step === s.number
                        ? "bg-ocean text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= s.number ? "text-navy" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${step > s.number ? "bg-teal" : "bg-slate-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Step 1: Account */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy">
                Create Your Account
              </h2>
              <Input
                label="Full Name"
                type="text"
                placeholder="John Mariner"
                value={form.name}
                onChange={update("name")}
                icon={<User className="w-4 h-4" />}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                icon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={update("password")}
                icon={<Lock className="w-4 h-4" />}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>
          )}

          {/* Step 2: Business */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy">
                Business Details
              </h2>
              <Input
                label="Business Name"
                type="text"
                placeholder="Miami Marine Services"
                value={form.businessName}
                onChange={update("businessName")}
                icon={<Building className="w-4 h-4" />}
              />
              <Input
                label="Location"
                type="text"
                placeholder="Miami, FL"
                value={form.location}
                onChange={update("location")}
                icon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="Phone (optional)"
                type="tel"
                placeholder="+1 (305) 555-0100"
                value={form.phone}
                onChange={update("phone")}
                icon={<Phone className="w-4 h-4" />}
              />
              <Textarea
                label="Business Description"
                placeholder="Describe your services, experience, and specialties..."
                value={form.description}
                onChange={update("description")}
                rows={3}
              />
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy">
                Ready to Launch!
              </h2>
              <p className="text-slate-500 text-sm">
                Review your information and complete registration to start
                receiving service requests.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                {[
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  { label: "Business", value: form.businessName },
                  { label: "Location", value: form.location },
                  { label: "Phone", value: form.phone || "Not provided" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-navy">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-ocean/5 border border-ocean/10 text-xs text-slate-600">
                <CheckCircle className="w-4 h-4 text-ocean flex-shrink-0 mt-0.5" />
                You&apos;ll be able to add certifications, services, and photos
                from your provider dashboard after registration.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep((prev) => (prev - 1) as Step)}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button variant="ocean" size="md" onClick={nextStep} className="flex-1">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Creating account..." : "Complete Registration"}
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-ocean font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
