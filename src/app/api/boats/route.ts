import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const boats = await prisma.boat.findMany({
    where: { ownerId: session.user.id },
    include: {
      components: true,
      maintenanceAlerts: { where: { dismissed: false } },
      serviceRequests: { orderBy: { createdAt: "desc" }, take: 3 },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(boats);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const boat = await prisma.boat.create({
      data: {
        ...body,
        ownerId: session.user.id,
      },
    });
    return NextResponse.json(boat, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create boat" }, { status: 500 });
  }
}
