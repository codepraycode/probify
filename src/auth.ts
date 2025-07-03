// src/auth.ts
import NextAuth, { getServerSession } from "next-auth";
import authConfig from "@/lib/auth/config";

// export the auth() helper — usable in server components
export const session = await getServerSession(authConfig);
