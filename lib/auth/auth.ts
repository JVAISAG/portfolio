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
      const authorizedEmail = process.env.ADMIN_EMAIL;
      
      // Only allow the authorized admin email to log in
      if (user.email === authorizedEmail) {
        return true;
      }
      
      // Return false to reject the sign in
      return false;
    },
  },
});
