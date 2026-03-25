import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isProvider = session.user.role === "PROVIDER";

  if (isProvider) {
    const provider = await prisma.serviceProvider.findUnique({
      where: { userId: session.user.id },
    });
    if (!provider) return NextResponse.json([]);

    const requests = await prisma.serviceRequest.findMany({
      where: { providerId: provider.id },
      include: {
        boat: true,
        owner: { select: { name: true, email: true, image: true } },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(requests);
  }

  const requests = await prisma.serviceRequest.findMany({
    where: { ownerId: session.user.id },
    include: {
      boat: true,
      provider: { include: { user: { select: { name: true, image: true } } } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        ...body,
        ownerId: session.user.id,
        status: "PENDING",
      },
    });

    await prisma.requestStatusHistory.create({
      data: {
        requestId: serviceRequest.id,
        status: "PENDING",
        note: "Request submitted",
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}
