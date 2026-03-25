import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { conversationId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await prisma.message.findMany({
    where: { conversationId: params.conversationId },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // Mark as read
  await prisma.conversationParticipant.updateMany({
    where: { conversationId: params.conversationId, userId: session.user.id },
    data: { unreadCount: 0, lastReadAt: new Date() },
  });

  return NextResponse.json(messages);
}

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { body } = await request.json();
    const message = await prisma.message.create({
      data: {
        conversationId: params.conversationId,
        senderId: session.user.id,
        body,
      },
      include: { sender: { select: { id: true, name: true, image: true } } },
    });

    await prisma.conversation.update({
      where: { id: params.conversationId },
      data: { updatedAt: new Date() },
    });

    // Increment unread for other participants
    await prisma.conversationParticipant.updateMany({
      where: {
        conversationId: params.conversationId,
        userId: { not: session.user.id },
      },
      data: { unreadCount: { increment: 1 } },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
