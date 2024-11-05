import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const res = await fetch(
          `${process.env.BASE_URL}/api/users/${user.email}`,
        );
        const foundUser = await res.json();

        if (!foundUser)
          await fetch(`${process.env.BASE_URL}/api/users`, {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              firstName: user.name?.split(" ")[1] ?? "",
              lastName: user.name?.split(" ")[0] ?? "",
              imageUrl: user.image,
            }),
          });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/users/${session.user.email}`,
      );
      const foundUser = await res.json();

      session.user.id = foundUser.id;

      return session;
    },
  },
});
