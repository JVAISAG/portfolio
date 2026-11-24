import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      const authorizedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      return Boolean(authorizedEmail && user.email?.trim().toLowerCase() === authorizedEmail);
    },
  },
});
