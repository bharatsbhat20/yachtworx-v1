import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ClipboardList, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ProviderRequestsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const provider = await prisma.serviceProvider.findUnique({
    where: { userId: session.user.id },
  });

  if (!provider) redirect("/provider/dashboard");

  const requests = await prisma.serviceRequest.findMany({
    where: { providerId: provider.id },
    include: {
      boat: true,
      owner: { select: { name: true, email: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const urgencyColors: Record<string, string> = {
    LOW: "text-slate-500 bg-slate-100",
    NORMAL: "text-ocean bg-ocean/10",
    HIGH: "text-amber-600 bg-amber-50",
    EMERGENCY: "text-red-600 bg-red-50",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy">
          Service Requests
        </h1>
        <p className="text-slate-500 mt-1">
          {requests.length} request{requests.length !== 1 ? "s" : ""} assigned to you
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <ClipboardList className="w-16 h-16 text-slate-200 mb-4" />
          <h3 className="font-heading text-xl font-semibold text-navy mb-2">
            No requests yet
          </h3>
          <p className="text-slate-500">
            Complete your profile to start appearing in search results
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
              {requests.map((req) => (
                <div key={req.id} className="py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
                      <Wrench className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-semibold text-navy">{req.title}</h3>
                        <Badge
                          variant={
                            req.status === "COMPLETED" ? "completed" :
                            req.status === "IN_PROGRESS" ? "in-progress" :
                            req.status === "ACCEPTED" ? "accepted" :
                            req.status === "QUOTED" ? "quoted" :
                            "pending"
                          }
                        >
                          {req.status.replace("_", " ")}
                        </Badge>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${urgencyColors[req.urgency]}`}>
                          {req.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">
                        {req.owner.name} • {req.boat.name} ({req.boat.year} {req.boat.make} {req.boat.model})
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {req.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className="text-xs text-slate-400">
                          Received {formatDate(req.createdAt)}
                        </span>
                        {req.quotedPrice && (
                          <span className="text-sm font-semibold text-teal">
                            Quote: {formatCurrency(req.quotedPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {req.status === "PENDING" && (
                        <Button variant="ocean" size="sm">
                          Send Quote
                        </Button>
                      )}
                      {req.status === "ACCEPTED" && (
                        <Button variant="teal" size="sm">
                          Start Job
                        </Button>
                      )}
                      {req.status === "IN_PROGRESS" && (
                        <Button variant="gold" size="sm">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
