import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    railsJwt?: string;
    userEmail?: string;
    userId?: string | number;
  }
}

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!nextAuthSecret || !googleClientId || !googleClientSecret) {
  throw new Error("Missing environment variables for NextAuth configuration");
}

const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/google_oauth2`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ access_token: account.access_token }),
            }
          );

          if (!res.ok) throw new Error("Login failed");

          const data = await res.json();
          console.log(data);

          token.railsJwt = data.token;
          token.userEmail = data.email;
          token.userId = data.id;
        } catch (err) {
          console.error("Error logging in to Rails:", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.railsJwt =
        typeof token.railsJwt === "string" ? token.railsJwt : undefined;
      session.userEmail =
        typeof token.userEmail === "string" ? token.userEmail : undefined;
      session.userId =
        typeof token.userId === "string" || typeof token.userId === "number"
          ? token.userId
          : undefined;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
