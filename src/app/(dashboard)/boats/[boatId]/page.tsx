import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BoatDigitalTwin } from "@/components/boat/digital-twin-tabs";

export default async function BoatDetailPage({
  params,
}: {
  params: { boatId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const boat = await prisma.boat.findFirst({
    where: { id: params.boatId, ownerId: session.user.id },
    include: {
      components: {
        include: {
          services: { orderBy: { date: "desc" } },
        },
      },
      documents: { orderBy: { createdAt: "desc" } },
      serviceRequests: {
        orderBy: { createdAt: "desc" },
        include: {
          provider: true,
          statusHistory: { orderBy: { createdAt: "asc" } },
        },
      },
      maintenanceAlerts: {
        where: { dismissed: false },
        orderBy: { dueDate: "asc" },
      },
      valueHistory: { orderBy: { date: "asc" } },
    },
  });

  if (!boat) notFound();

  return <BoatDigitalTwin boat={boat} />;
}
