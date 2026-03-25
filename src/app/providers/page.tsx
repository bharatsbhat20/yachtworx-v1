import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, BadgeCheck, DollarSign, TrendingUp, Users, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Users,
    title: "Access 12,400+ Verified Owners",
    description:
      "Connect directly with yacht owners in your area who need your expertise. No cold calling, no marketing spend.",
    color: "bg-ocean/10 text-ocean",
  },
  {
    icon: DollarSign,
    title: "Grow Your Revenue",
    description:
      "Our top providers earn 40% more in their first year. Manage quotes, invoices, and payments in one place.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: BadgeCheck,
    title: "Build Your Reputation",
    description:
      "Showcase your certifications, collect reviews, and get verified badges that set you apart from competition.",
    color: "bg-gold/10 text-gold-600",
  },
  {
    icon: TrendingUp,
    title: "Track Your Business",
    description:
      "Monitor job history, revenue trends, and client retention from your professional dashboard.",
    color: "bg-navy/10 text-navy",
  },
];

const stats = [
  { value: "3,200+", label: "Verified Providers" },
  { value: "$850K+", label: "Avg. Annual Revenue" },
  { value: "4.9/5", label: "Provider Satisfaction" },
  { value: "0%", label: "Commission (first 3 months)" },
];

const steps = [
  { number: "01", title: "Create your account", description: "Sign up as a provider in under 3 minutes. Add your business info and location." },
  { number: "02", title: "Build your profile", description: "Add certifications, services offered, photos, and your specialties." },
  { number: "03", title: "Get discovered", description: "Your profile goes live in our marketplace. Owners in your area can find and contact you." },
  { number: "04", title: "Manage your jobs", description: "Receive requests, send quotes, track progress, and build 5-star reviews." },
];

export default function ProvidersLandingPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504355011027-7a1f93f44b66?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-gold" />
              For Marine Service Professionals
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Grow Your Marine{" "}
              <span className="text-gold">Business</span> with Yachtworx
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed mb-8">
              Join 3,200+ certified marine mechanics on the platform trusted by
              yacht owners. Get more clients, manage jobs effortlessly, and build
              a reputation that lasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register/provider">
                <Button variant="gold" size="xl">
                  Join as a Provider
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl sm:text-5xl mb-4">
              Why Top Mechanics{" "}
              <span className="gradient-text">Choose Yachtworx</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Built for marine professionals who take their craft seriously.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex gap-5 p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-card-hover transition-all duration-300">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${benefit.color} flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl sm:text-5xl mb-4">
              Start Earning in{" "}
              <span className="gradient-text">4 Simple Steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-ocean text-white font-heading font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-navy rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-heading text-4xl font-bold mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Free to join. No monthly fees. Start receiving requests today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {[
                  "No monthly subscription",
                  "Keep 100% of earnings",
                  "Get verified badge",
                  "24/7 support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/auth/register/provider">
                <Button variant="gold" size="xl">
                  Create Provider Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
