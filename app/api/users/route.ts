import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const id = searchParams.get("id") ?? undefined;
    const email = searchParams.get("email");

    if (!email) return notFound();

    const user = await prisma.users.findUnique({
      where: {
        id,
        email,
        isDeleted: false,
      },
    });

    return Response.json(user);
  } catch (error) {
    throw error;
  }
}
