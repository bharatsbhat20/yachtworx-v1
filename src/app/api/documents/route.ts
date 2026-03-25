import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const documents = await prisma.document.findMany({
    where: { ownerId: session.user.id },
    include: { boat: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const doc = await prisma.document.create({
      data: { ...body, ownerId: session.user.id },
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
