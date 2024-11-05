import prisma from "@/lib/db";
import { createSchema } from "@/schemas/users";

export async function POST(request: Request) {
  try {
    const values = await request.json();

    console.log(values);

    const { success, error, data } = createSchema.safeParse(values);

    if (!success) throw error.flatten().fieldErrors;

    const user = await prisma.users.create({
      data,
    });

    return Response.json(user);
  } catch (error) {
    throw error;
  }
}
