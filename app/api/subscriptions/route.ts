import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        isDeleted: false,
      },
    });

    return NextResponse.json(
      subscriptions.map((subscription) => ({
        ...subscription,
        time: subscription.time.toString(),
      })),
    );
  } catch (error) {
    throw error;
  }
}
