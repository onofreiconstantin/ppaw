import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      email: string;
    }>;
  },
) {
  try {
    const { email } = await params;

    if (!email) return notFound();

    const user = await prisma.users.findUnique({
      where: {
        email,
        isDeleted: false,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    throw error;
  }
}
