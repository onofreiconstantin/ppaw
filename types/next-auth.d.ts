import { UsersRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: UsersRole;
    } & DefaultSession["user"];
  }
}
