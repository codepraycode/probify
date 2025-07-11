
import NextAuth from "next-auth";
import authConfig from "@/lib/auth/config"; // move your config here

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
