import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { create } from "@/actions/users";
import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const foundUser = await prisma.users.findUnique({
          where: {
            email: user.email,
            isDeleted: false,
          },
        });

        if (!foundUser)
          await create({
            email: user.email,
            firstName: user.name?.split(" ")[1] ?? "",
            lastName: user.name?.split(" ")[0] ?? "",
            imageUrl: user.image,
          });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?email=${session.user.email}`,
      );
      const foundUser = await res.json();

      session.user.id = foundUser.id;

      return session;
    },
  },
});
