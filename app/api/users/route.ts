import prisma from "@/lib/db";
import { createSchema } from "@/schemas/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    const { success, error, data } = createSchema.safeParse(values);

    if (!success) throw error.flatten().fieldErrors;

    const user = await prisma.users.create({
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    throw error;
  }
}
