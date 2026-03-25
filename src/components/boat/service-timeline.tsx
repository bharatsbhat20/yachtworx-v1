"use client";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
  completedAt: string | null;
  provider: { businessName: string } | null;
  statusHistory: { id: string; status: string; createdAt: string; note: string | null }[];
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; badge: "pending" | "quoted" | "accepted" | "in-progress" | "completed" | "cancelled" }> = {
  PENDING: { icon: Clock, color: "text-gold-600", badge: "pending" },
  QUOTED: { icon: FileText, color: "text-ocean", badge: "quoted" },
  ACCEPTED: { icon: CheckCircle, color: "text-teal", badge: "accepted" },
  IN_PROGRESS: { icon: Wrench, color: "text-navy", badge: "in-progress" },
  COMPLETED: { icon: CheckCircle, color: "text-teal", badge: "completed" },
  CANCELLED: { icon: AlertCircle, color: "text-slate-400", badge: "cancelled" },
};

export function ServiceTimeline({ requests }: { requests: ServiceRequest[] }) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Wrench className="w-12 h-12 text-slate-200 mb-4" />
        <h3 className="font-heading font-semibold text-navy mb-2">No service history</h3>
        <p className="text-slate-500 text-sm">
          Service records will appear here once you book your first mechanic
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-slate-500 text-sm">{requests.length} service record{requests.length !== 1 ? "s" : ""}</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {requests.map((req) => {
            const config = statusConfig[req.status] ?? statusConfig.PENDING;
            const Icon = config.icon;

            return (
              <div key={req.id} className="relative flex gap-4">
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex-shrink-0`}
                >
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-navy">
                        {req.title}
                      </h3>
                      {req.provider && (
                        <p className="text-sm text-slate-500 mt-0.5">
                          {req.provider.businessName}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={config.badge}>
                        {req.status.replace("_", " ")}
                      </Badge>
                      <Badge variant="secondary">{req.category}</Badge>
                    </div>
                  </div>

                  {/* Status history mini-timeline */}
                  {req.statusHistory.length > 0 && (
                    <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                      {req.statusHistory.map((h) => (
                        <div key={h.id} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-ocean flex-shrink-0" />
                          <span className="font-medium text-slate-600">
                            {h.status.replace("_", " ")}
                          </span>
                          <span>•</span>
                          <span>{formatDate(h.createdAt)}</span>
                          {h.note && (
                            <>
                              <span>•</span>
                              <span className="text-slate-400">{h.note}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span>Opened {formatDate(req.createdAt)}</span>
                    {req.completedAt && (
                      <span>Completed {formatDate(req.completedAt)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
