import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import prisma from "@lib/db";

const { callbacks, ...config } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...config,
  callbacks: {
    ...callbacks,
    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const foundUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        if (!foundUser)
          await prisma.users.create({
            data: {
              email: user.email,
              firstName: user.name?.split(" ")[1] ?? "",
              lastName: user.name?.split(" ")[0] ?? "",
              imageUrl: user.image,
            },
          });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const foundUser = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      if (!foundUser) throw Error("Something went wrong!");

      session.user.id = foundUser.id;
      session.user.role = foundUser.role;

      return session;
    },
  },
});
