import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const secret = process.env.SECRET;
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  secret,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
