import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      email: string;
    };
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

    return Response.json(user);
  } catch (error) {
    throw error;
  }
}
