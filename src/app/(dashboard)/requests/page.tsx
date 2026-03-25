"use client";

import { useState, useEffect } from "react";
import { Plus, ClipboardList, Wrench, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { REQUEST_STATUSES } from "@/lib/constants";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  urgency: string;
  category: string;
  quotedPrice: number | null;
  createdAt: string;
  updatedAt: string;
  boat: { name: string; make: string; model: string };
  provider: { businessName: string } | null;
  statusHistory: { id: string; status: string; createdAt: string; note: string | null }[];
}

const urgencyColors: Record<string, string> = {
  LOW: "text-slate-500 bg-slate-100",
  NORMAL: "text-ocean bg-ocean/10",
  HIGH: "text-amber-600 bg-amber-50",
  EMERGENCY: "text-red-600 bg-red-50",
};

const PIPELINE_STAGES = ["PENDING", "QUOTED", "ACCEPTED", "IN_PROGRESS", "COMPLETED"];

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"pipeline" | "list">("pipeline");
  const [selected, setSelected] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    fetch("/api/service-requests")
      .then((r) => r.json())
      .then((data) => { setRequests(data); setLoading(false); });
  }, []);

  const byStatus = (status: string) =>
    requests.filter((r) => r.status === status);

  // Demo requests for empty state
  const demoRequests: ServiceRequest[] = [
    {
      id: "d1",
      title: "Annual Engine Service",
      description: "Full engine tune-up including oil change, filters, impeller, and zincs.",
      status: "IN_PROGRESS",
      urgency: "NORMAL",
      category: "ENGINE",
      quotedPrice: 1200,
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      boat: { name: "Sea Breeze", make: "Beneteau", model: "Oceanis 51.1" },
      provider: { businessName: "BlueWater Marine Services" },
      statusHistory: [
        { id: "h1", status: "PENDING", createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), note: "Request submitted" },
        { id: "h2", status: "QUOTED", createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), note: "Quote provided: $1,200" },
        { id: "h3", status: "ACCEPTED", createdAt: new Date(Date.now() - 4 * 86400000).toISOString(), note: "Quote accepted" },
        { id: "h4", status: "IN_PROGRESS", createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), note: "Work commenced" },
      ],
    },
    {
      id: "d2",
      title: "GPS Chartplotter Replacement",
      description: "Replace existing chartplotter with Garmin GPSMAP 923xsv.",
      status: "QUOTED",
      urgency: "NORMAL",
      category: "NAVIGATION",
      quotedPrice: 2400,
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      boat: { name: "Blue Horizon", make: "Sunseeker", model: "Predator 65" },
      provider: { businessName: "Neptune Navigation Systems" },
      statusHistory: [
        { id: "h5", status: "PENDING", createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), note: null },
        { id: "h6", status: "QUOTED", createdAt: new Date(Date.now() - 1 * 86400000).toISOString(), note: "Parts + labor: $2,400" },
      ],
    },
    {
      id: "d3",
      title: "Hull Antifouling Paint",
      description: "Haul out, strip old paint, and apply 3 coats of Interlux Micron Extra.",
      status: "PENDING",
      urgency: "HIGH",
      category: "PAINTING",
      quotedPrice: null,
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      boat: { name: "Sea Breeze", make: "Beneteau", model: "Oceanis 51.1" },
      provider: null,
      statusHistory: [
        { id: "h7", status: "PENDING", createdAt: new Date(Date.now() - 1 * 86400000).toISOString(), note: "Request submitted" },
      ],
    },
    {
      id: "d4",
      title: "Interior Upholstery Repair",
      description: "Replace saloon cushions and helm seat upholstery.",
      status: "COMPLETED",
      urgency: "LOW",
      category: "INTERIOR",
      quotedPrice: 850,
      createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      boat: { name: "Blue Horizon", make: "Sunseeker", model: "Predator 65" },
      provider: { businessName: "Coastal Yacht Care" },
      statusHistory: [],
    },
  ];

  const displayRequests = requests.length > 0 ? requests : demoRequests;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">Service Requests</h1>
          <p className="text-slate-500 mt-1">
            Track all your maintenance and service jobs
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setView("pipeline")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === "pipeline" ? "bg-white text-navy shadow-sm" : "text-slate-500"
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === "list" ? "bg-white text-navy shadow-sm" : "text-slate-500"
              }`}
            >
              List
            </button>
          </div>
          <Button variant="ocean" size="md">
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 bg-slate-100 animate-pulse rounded-2xl" />
      ) : (
        <>
          {/* Pipeline view */}
          {view === "pipeline" && (
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4 min-w-max pb-4">
                {PIPELINE_STAGES.map((stage) => {
                  const stageRequests = displayRequests.filter((r) => r.status === stage);
                  const statusInfo = REQUEST_STATUSES.find((s) => s.id === stage);

                  return (
                    <div key={stage} className="w-72 flex-shrink-0">
                      {/* Stage header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            stage === "COMPLETED" ? "bg-teal" :
                            stage === "IN_PROGRESS" ? "bg-navy" :
                            stage === "ACCEPTED" ? "bg-teal" :
                            stage === "QUOTED" ? "bg-ocean" :
                            "bg-gold"
                          }`} />
                          <span className="font-heading font-semibold text-navy text-sm">
                            {statusInfo?.label ?? stage}
                          </span>
                        </div>
                        <Badge variant="secondary">{stageRequests.length}</Badge>
                      </div>

                      {/* Cards */}
                      <div className="space-y-3">
                        {stageRequests.map((req) => (
                          <button
                            key={req.id}
                            onClick={() => setSelected(req)}
                            className="w-full text-left"
                          >
                            <Card className="hover:shadow-card-hover transition-all duration-200 cursor-pointer border-l-4 border-l-ocean">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="font-semibold text-navy text-sm leading-tight">
                                    {req.title}
                                  </h4>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${urgencyColors[req.urgency]}`}>
                                    {req.urgency}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">
                                  {req.boat.name}
                                  {req.provider && (
                                    <> • {req.provider.businessName}</>
                                  )}
                                </p>
                                {req.quotedPrice && (
                                  <div className="text-sm font-semibold text-teal mb-2">
                                    {formatCurrency(req.quotedPrice)}
                                  </div>
                                )}
                                <div className="text-xs text-slate-400">
                                  {formatDate(req.updatedAt)}
                                </div>
                              </CardContent>
                            </Card>
                          </button>
                        ))}

                        {stageRequests.length === 0 && (
                          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            <p className="text-xs text-slate-400">No requests</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* List view */}
          {view === "list" && (
            <Card>
              <CardHeader>
                <CardTitle>All Requests ({displayRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {displayRequests.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <ClipboardList className="w-12 h-12 text-slate-200 mb-4" />
                    <h3 className="font-heading font-semibold text-navy mb-2">No requests yet</h3>
                    <Button variant="ocean" size="sm">
                      <Plus className="w-4 h-4" />
                      Create First Request
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {displayRequests.map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-6 px-6 cursor-pointer"
                        onClick={() => setSelected(req)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
                          <Wrench className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-navy text-sm">{req.title}</p>
                          <p className="text-xs text-slate-400">
                            {req.boat.name}
                            {req.provider && ` • ${req.provider.businessName}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {req.quotedPrice && (
                            <span className="text-sm font-semibold text-teal">
                              {formatCurrency(req.quotedPrice)}
                            </span>
                          )}
                          <Badge variant={req.status.toLowerCase().replace("_", "-") as "pending" | "quoted" | "accepted" | "in-progress" | "completed" | "cancelled"}>
                            {req.status.replace("_", " ")}
                          </Badge>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgencyColors[req.urgency]}`}>
                            {req.urgency}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Request detail modal */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-heading font-bold text-navy text-xl">{selected.title}</h2>
                    <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">&times;</button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant={selected.status.toLowerCase().replace("_", "-") as "pending" | "quoted" | "accepted" | "in-progress" | "completed" | "cancelled"}>
                        {selected.status.replace("_", " ")}
                      </Badge>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${urgencyColors[selected.urgency]}`}>
                        {selected.urgency} urgency
                      </span>
                      {selected.urgency === "EMERGENCY" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>

                    <p className="text-slate-600 text-sm">{selected.description}</p>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Vessel", value: selected.boat.name },
                        { label: "Category", value: selected.category },
                        { label: "Created", value: formatDate(selected.createdAt) },
                        { label: "Provider", value: selected.provider?.businessName ?? "Unassigned" },
                        ...(selected.quotedPrice ? [{ label: "Quoted Price", value: formatCurrency(selected.quotedPrice) }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-xl p-3">
                          <div className="text-xs text-slate-400">{label}</div>
                          <div className="text-sm font-medium text-navy mt-0.5">{value}</div>
                        </div>
                      ))}
                    </div>

                    {selected.statusHistory.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-navy text-sm mb-3">Status History</h4>
                        <div className="space-y-2">
                          {selected.statusHistory.map((h) => (
                            <div key={h.id} className="flex items-center gap-3 text-xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-ocean flex-shrink-0" />
                              <span className="font-medium text-slate-700">{h.status.replace("_", " ")}</span>
                              <span className="text-slate-400">{formatDate(h.createdAt)}</span>
                              {h.note && <span className="text-slate-400 truncate">{h.note}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
