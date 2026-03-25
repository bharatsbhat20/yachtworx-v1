import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { boatId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const boat = await prisma.boat.findFirst({
    where: { id: params.boatId, ownerId: session.user.id },
    include: {
      components: { include: { services: { orderBy: { date: "desc" } } } },
      documents: { orderBy: { createdAt: "desc" } },
      serviceRequests: {
        orderBy: { createdAt: "desc" },
        include: { provider: true, statusHistory: { orderBy: { createdAt: "asc" } } },
      },
      maintenanceAlerts: { where: { dismissed: false }, orderBy: { dueDate: "asc" } },
      valueHistory: { orderBy: { date: "asc" } },
    },
  });

  if (!boat) return NextResponse.json({ error: "Boat not found" }, { status: 404 });
  return NextResponse.json(boat);
}

export async function PATCH(
  request: Request,
  { params }: { params: { boatId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const boat = await prisma.boat.updateMany({
      where: { id: params.boatId, ownerId: session.user.id },
      data: body,
    });
    return NextResponse.json(boat);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update boat" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { boatId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.boat.deleteMany({
    where: { id: params.boatId, ownerId: session.user.id },
  });

  return NextResponse.json({ message: "Boat deleted" });
}
