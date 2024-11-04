import prisma from "@/lib/db";

export async function GET() {
  try {
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        isDeleted: false,
      },
    });

    return Response.json(subscriptions);
  } catch (error) {
    throw error;
  }
}
