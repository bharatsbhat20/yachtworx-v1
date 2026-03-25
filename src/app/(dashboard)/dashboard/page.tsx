import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Sailboat,
  AlertTriangle,
  ClipboardList,
  DollarSign,
  Plus,
  ArrowRight,
  Wrench,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const [boats, requests, alerts] = await Promise.all([
    prisma.boat.findMany({
      where: { ownerId: session.user.id },
      include: {
        components: true,
        maintenanceAlerts: { where: { dismissed: false } },
      },
    }),
    prisma.serviceRequest.findMany({
      where: { ownerId: session.user.id },
      include: { boat: true, provider: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.maintenanceAlert.findMany({
      where: { userId: session.user.id, dismissed: false },
      include: { boat: true },
      orderBy: { dueDate: "asc" },
      take: 4,
    }),
  ]);

  const totalFleetValue = boats.reduce(
    (sum, b) => sum + (b.estimatedValue ?? 0),
    0
  );
  const activeRequests = requests.filter((r) =>
    ["PENDING", "QUOTED", "ACCEPTED", "IN_PROGRESS"].includes(r.status)
  ).length;

  const statusColors: Record<string, "pending" | "quoted" | "accepted" | "in-progress" | "completed" | "cancelled"> = {
    PENDING: "pending",
    QUOTED: "quoted",
    ACCEPTED: "accepted",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  };

  const priorityColors: Record<string, string> = {
    LOW: "text-blue-500 bg-blue-50",
    MEDIUM: "text-amber-600 bg-amber-50",
    HIGH: "text-orange-500 bg-orange-50",
    CRITICAL: "text-red-500 bg-red-50",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">
            Welcome back, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your fleet today.
          </p>
        </div>
        <Link href="/boats">
          <Button variant="ocean" size="md">
            <Plus className="w-4 h-4" />
            Add Boat
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: "Boats in Fleet",
            value: boats.length,
            icon: Sailboat,
            color: "text-ocean",
            bg: "bg-ocean/10",
            href: "/boats",
          },
          {
            label: "Maintenance Alerts",
            value: alerts.length,
            icon: AlertTriangle,
            color: "text-gold-600",
            bg: "bg-gold/10",
            href: "/requests",
          },
          {
            label: "Active Requests",
            value: activeRequests,
            icon: ClipboardList,
            color: "text-teal",
            bg: "bg-teal/10",
            href: "/requests",
          },
          {
            label: "Fleet Value",
            value: formatCurrency(totalFleetValue),
            icon: DollarSign,
            color: "text-navy",
            bg: "bg-navy/10",
            href: "/boats",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-card-hover transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg}`}
                    >
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-teal opacity-50" />
                  </div>
                  <div className="font-heading text-2xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Fleet</CardTitle>
              <Link href="/boats">
                <Button variant="ghost" size="sm" className="text-ocean">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {boats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-5xl mb-4">⛵</div>
                  <h3 className="font-heading font-semibold text-navy mb-2">
                    No boats yet
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Add your first boat to start tracking maintenance
                  </p>
                  <Link href="/boats">
                    <Button variant="ocean" size="sm">
                      <Plus className="w-4 h-4" />
                      Add First Boat
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {boats.map((boat) => (
                    <Link key={boat.id} href={`/boats/${boat.id}`}>
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-ocean text-white flex-shrink-0">
                          <Sailboat className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-navy">{boat.name}</div>
                          <div className="text-sm text-slate-500">
                            {boat.year} {boat.make} {boat.model}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {boat.estimatedValue && (
                            <div className="text-sm font-semibold text-teal">
                              {formatCurrency(boat.estimatedValue)}
                            </div>
                          )}
                          {boat.maintenanceAlerts.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gold-600 mt-1">
                              <AlertTriangle className="w-3 h-3" />
                              {boat.maintenanceAlerts.length} alert
                              {boat.maintenanceAlerts.length > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Alerts */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Alerts</CardTitle>
              {alerts.length > 0 && (
                <Badge variant="gold">{alerts.length}</Badge>
              )}
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm text-slate-500">All clear!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-xl border border-slate-100 bg-slate-50"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[alert.priority]}`}
                        >
                          {alert.priority}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-navy mt-1.5">
                        {alert.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {alert.boat.name}
                        {alert.dueDate &&
                          ` • Due ${formatDate(alert.dueDate)}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Service Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Service Requests</CardTitle>
          <Link href="/requests">
            <Button variant="ghost" size="sm" className="text-ocean">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Wrench className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">No service requests yet</p>
              <Link href="/marketplace" className="mt-3">
                <Button variant="ocean" size="sm">
                  Find a Mechanic
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <Link key={req.id} href={`/requests`}>
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
                      <Wrench className="w-5 h-5 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-navy text-sm">
                        {req.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {req.boat.name}
                        {req.provider &&
                          ` • ${req.provider.businessName}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant={statusColors[req.status] ?? "default"}>
                        {req.status.replace("_", " ")}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(req.updatedAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
