"use client";

import { COMPONENT_CATEGORIES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle, Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Component {
  id: string;
  category: string;
  name: string;
  manufacturer: string | null;
  model: string | null;
  status: string;
  lastService: string | null;
  nextService: string | null;
  notes: string | null;
  services: { id: string; date: string; description: string; cost: number | null }[];
}

function StatusIcon({ status }: { status: string }) {
  if (status === "CRITICAL") return <XCircle className="w-4 h-4 text-red-500" />;
  if (status === "WARNING") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  return <CheckCircle className="w-4 h-4 text-teal" />;
}

export function ComponentGrid({
  components,
}: {
  components: Component[];
  boatId: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">
          Tracking {components.length} components across 6 categories
        </p>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4" />
          Add Component
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPONENT_CATEGORIES.map((cat) => {
          const catComponents = components.filter((c) => c.category === cat.id);

          return (
            <Card key={cat.id} className="overflow-hidden">
              {/* Category header */}
              <div className="p-4 bg-gradient-to-r from-navy/5 to-ocean/5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-navy">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                {catComponents.length === 0 ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <Wrench className="w-8 h-8 text-slate-200 mb-2" />
                    <p className="text-xs text-slate-400">
                      No components tracked
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 text-ocean text-xs">
                      <Plus className="w-3 h-3" />
                      Add {cat.label}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {catComponents.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <StatusIcon status={comp.status} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm text-navy truncate">
                              {comp.name}
                            </span>
                            <Badge
                              variant={
                                comp.status === "CRITICAL"
                                  ? "danger"
                                  : comp.status === "WARNING"
                                    ? "warning"
                                    : "teal"
                              }
                              className="text-xs flex-shrink-0"
                            >
                              {comp.status}
                            </Badge>
                          </div>
                          {comp.manufacturer && (
                            <p className="text-xs text-slate-400 mt-0.5">
                              {comp.manufacturer}
                              {comp.model && ` • ${comp.model}`}
                            </p>
                          )}
                          {comp.lastService && (
                            <p className="text-xs text-slate-400 mt-1">
                              Last service: {formatDate(comp.lastService)}
                            </p>
                          )}
                          {comp.nextService && (
                            <p className={`text-xs mt-0.5 ${
                              new Date(comp.nextService) < new Date()
                                ? "text-red-500"
                                : "text-teal"
                            }`}>
                              Next: {formatDate(comp.nextService)}
                            </p>
                          )}
                          {comp.services.length > 0 && (
                            <p className="text-xs text-slate-400 mt-1">
                              {comp.services.length} service record
                              {comp.services.length > 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
