import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ClipboardList,
  DollarSign,
  Star,
  TrendingUp,
  ArrowRight,
  Wrench,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProviderDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const provider = await prisma.serviceProvider.findUnique({
    where: { userId: session.user.id },
    include: {
      serviceRequests: {
        orderBy: { updatedAt: "desc" },
        take: 10,
        include: {
          boat: true,
          owner: { select: { name: true, email: true } },
        },
      },
      certifications: true,
      servicesOffered: true,
    },
  });

  if (!provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-5xl mb-4">🔧</div>
        <h2 className="font-heading text-2xl font-bold text-navy mb-2">
          Complete Your Profile
        </h2>
        <p className="text-slate-500 mb-6">
          Set up your service provider profile to start receiving requests
        </p>
        <Link href="/provider/profile">
          <Button variant="ocean">Set Up Profile</Button>
        </Link>
      </div>
    );
  }

  const requests = provider.serviceRequests;
  const activeRequests = requests.filter((r) =>
    ["PENDING", "QUOTED", "ACCEPTED", "IN_PROGRESS"].includes(r.status)
  );
  const completedRequests = requests.filter((r) => r.status === "COMPLETED");
  const totalRevenue = completedRequests.reduce(
    (sum, r) => sum + (r.finalPrice ?? r.quotedPrice ?? 0),
    0
  );

  const statusBadge: Record<string, "pending" | "quoted" | "accepted" | "in-progress" | "completed"> = {
    PENDING: "pending",
    QUOTED: "quoted",
    ACCEPTED: "accepted",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">
            Welcome, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1">{provider.businessName}</p>
          {provider.verified && (
            <Badge variant="teal" className="mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Provider
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-gold fill-gold" />
            <span className="font-heading font-bold text-navy">
              {provider.rating.toFixed(1)}
            </span>
            <span className="text-slate-400 text-sm">
              ({provider.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: "Active Jobs",
            value: activeRequests.length,
            icon: Wrench,
            color: "text-ocean bg-ocean/10",
          },
          {
            label: "Completed",
            value: completedRequests.length,
            icon: CheckCircle,
            color: "text-teal bg-teal/10",
          },
          {
            label: "Pending Review",
            value: requests.filter((r) => r.status === "PENDING").length,
            icon: Clock,
            color: "text-gold-600 bg-gold/10",
          },
          {
            label: "Total Revenue",
            value: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: "text-navy bg-navy/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color} mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-heading text-2xl font-bold text-navy">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Requests</CardTitle>
              <Link href="/provider/requests">
                <Button variant="ghost" size="sm" className="text-ocean">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <ClipboardList className="w-10 h-10 text-slate-200 mb-3" />
                  <p className="text-slate-500 text-sm">No requests yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete your profile to attract clients
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
                        <Wrench className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy text-sm">
                          {req.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {req.owner.name} • {req.boat.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {req.quotedPrice && (
                          <span className="text-sm font-semibold text-teal">
                            {formatCurrency(req.quotedPrice)}
                          </span>
                        )}
                        <Badge variant={statusBadge[req.status] ?? "secondary"}>
                          {req.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Business info", done: !!provider.businessName },
                  { label: "Location set", done: !!provider.location },
                  { label: "Description added", done: !!provider.description },
                  { label: "Services listed", done: provider.servicesOffered.length > 0 },
                  { label: "Certifications", done: provider.certifications.length > 0 },
                  { label: "Profile photo", done: !!provider.logoUrl },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-teal text-white" : "bg-slate-100"}`}>
                      {done ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <span className={`text-sm ${done ? "text-slate-700" : "text-slate-400"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Profile completion</span>
                  <span>
                    {Math.round(
                      ([
                        provider.businessName,
                        provider.location,
                        provider.description,
                        provider.servicesOffered.length > 0,
                        provider.certifications.length > 0,
                        provider.logoUrl,
                      ].filter(Boolean).length / 6) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-ocean rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        ([
                          provider.businessName,
                          provider.location,
                          provider.description,
                          provider.servicesOffered.length > 0,
                          provider.certifications.length > 0,
                          provider.logoUrl,
                        ].filter(Boolean).length / 6) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <Link href="/provider/profile" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="w-4 h-4" />
                  Improve Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
