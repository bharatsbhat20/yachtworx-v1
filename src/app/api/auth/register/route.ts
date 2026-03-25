import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["OWNER", "PROVIDER"]).default("OWNER"),
  businessName: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
      },
    });

    if (data.role === "PROVIDER" && data.businessName) {
      await prisma.serviceProvider.create({
        data: {
          userId: user.id,
          businessName: data.businessName,
          location: data.location ?? "",
          phone: data.phone,
          description: data.description,
        },
      });
    }

    return NextResponse.json(
      { message: "Account created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 422 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
