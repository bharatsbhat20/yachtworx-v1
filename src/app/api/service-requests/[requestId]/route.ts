import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { status, note, ...rest } = body;

    const updated = await prisma.serviceRequest.update({
      where: { id: params.requestId },
      data: { ...rest, ...(status ? { status } : {}) },
    });

    if (status) {
      await prisma.requestStatusHistory.create({
        data: {
          requestId: params.requestId,
          status,
          note: note ?? `Status updated to ${status}`,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 });
  }
}
