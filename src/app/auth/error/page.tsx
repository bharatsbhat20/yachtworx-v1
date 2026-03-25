"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-ocean flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-navy mb-2">
          Authentication Error
        </h1>
        <p className="text-slate-500 mb-6">
          Something went wrong during sign-in. Please try again.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/auth/login">
            <Button variant="ocean" size="md" className="w-full">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="md" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
