import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const providers = await prisma.serviceProvider.findMany({
    where: {
      ...(category && category !== "ALL"
        ? { servicesOffered: { some: { category } } }
        : {}),
      ...(search
        ? {
            OR: [
              { businessName: { contains: search } },
              { description: { contains: search } },
              { location: { contains: search } },
            ],
          }
        : {}),
    },
    include: {
      certifications: true,
      servicesOffered: true,
      user: { select: { name: true, image: true } },
    },
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(providers);
}
