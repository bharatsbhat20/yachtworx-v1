"use client";

import { useState } from "react";
import {
  Sailboat,
  Settings,
  FileText,
  TrendingUp,
  Clock,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  MapPin,
  Ruler,
  Anchor,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentGrid } from "./component-grid";
import { ServiceTimeline } from "./service-timeline";
import { DocumentVaultTab } from "./document-vault-tab";
import { ValueChart } from "./value-chart";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "overview" | "components" | "timeline" | "documents" | "value";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Sailboat },
  { id: "components", label: "Components", icon: Settings },
  { id: "timeline", label: "Service Timeline", icon: Clock },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "value", label: "Value Chart", icon: TrendingUp },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BoatDigitalTwin({ boat }: { boat: any }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const componentWarnings = boat.components.filter(
    (c: { status: string }) => c.status === "WARNING" || c.status === "CRITICAL"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/boats">
          <Button variant="ghost" size="sm" className="mb-4 text-slate-500">
            <ChevronLeft className="w-4 h-4" />
            Back to Fleet
          </Button>
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-ocean text-white flex-shrink-0">
              <Sailboat className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-navy">
                {boat.name}
              </h1>
              <p className="text-slate-500 mt-0.5">
                {boat.year} {boat.make} {boat.model}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {boat.homePort && (
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {boat.homePort}
                  </div>
                )}
                {boat.registrationNumber && (
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Anchor className="w-3 h-3" />
                    {boat.registrationNumber}
                  </div>
                )}
                {componentWarnings > 0 && (
                  <Badge variant="warning">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {componentWarnings} component warning
                    {componentWarnings > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {boat.estimatedValue && (
            <div className="text-right">
              <div className="text-sm text-slate-500">Estimated Value</div>
              <div className="font-heading text-2xl font-bold text-teal">
                {formatCurrency(boat.estimatedValue)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 bg-slate-100 p-1 rounded-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "bg-white text-navy shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Specs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vessel Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Make", value: boat.make },
                  { label: "Model", value: boat.model },
                  { label: "Year", value: boat.year },
                  { label: "Hull Type", value: boat.hullType ?? "—" },
                  { label: "Engine Type", value: boat.engineType ?? "—" },
                  { label: "Home Port", value: boat.homePort ?? "—" },
                  {
                    label: "Length (LOA)",
                    value: boat.loa ? `${boat.loa}m` : "—",
                    icon: <Ruler className="w-3 h-3" />,
                  },
                  {
                    label: "Beam",
                    value: boat.beam ? `${boat.beam}m` : "—",
                  },
                  {
                    label: "Draft",
                    value: boat.draft ? `${boat.draft}m` : "—",
                  },
                  {
                    label: "Purchase Year",
                    value: boat.purchaseYear ?? "—",
                    icon: <Calendar className="w-3 h-3" />,
                  },
                  {
                    label: "Purchase Price",
                    value: boat.purchasePrice
                      ? formatCurrency(boat.purchasePrice)
                      : "—",
                  },
                  {
                    label: "Est. Value",
                    value: boat.estimatedValue
                      ? formatCurrency(boat.estimatedValue)
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-3 rounded-xl bg-slate-50"
                  >
                    <div className="text-xs text-slate-400 mb-1">{label}</div>
                    <div className="font-semibold text-navy text-sm">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {boat.maintenanceAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm text-slate-500">All systems clear</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {boat.maintenanceAlerts.map(
                    (alert: {
                      id: string;
                      title: string;
                      priority: string;
                      dueDate: string | null;
                    }) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-xl border border-slate-100"
                      >
                        <Badge
                          variant={
                            alert.priority === "CRITICAL"
                              ? "danger"
                              : alert.priority === "HIGH"
                                ? "warning"
                                : "secondary"
                          }
                          className="mb-2"
                        >
                          {alert.priority}
                        </Badge>
                        <p className="text-sm font-medium text-navy">
                          {alert.title}
                        </p>
                        {alert.dueDate && (
                          <p className="text-xs text-slate-400 mt-1">
                            Due {formatDate(alert.dueDate)}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "components" && (
        <ComponentGrid components={boat.components} boatId={boat.id} />
      )}

      {activeTab === "timeline" && (
        <ServiceTimeline requests={boat.serviceRequests} />
      )}

      {activeTab === "documents" && (
        <DocumentVaultTab documents={boat.documents} boatId={boat.id} />
      )}

      {activeTab === "value" && (
        <ValueChart
          valueHistory={boat.valueHistory}
          currentValue={boat.estimatedValue}
          purchasePrice={boat.purchasePrice}
        />
      )}
    </div>
  );
}
