import NextAuth from "next-auth";
import authConfig from "@/lib/auth/config";

export const { 
  handlers, 
  auth,  // This is the proper auth function
  signIn, 
  signOut 
} = NextAuth(authConfig);

// Proper type for your session
export type AppSession = Awaited<ReturnType<typeof auth>>;

export const getCurrentSession = async (): Promise<AppSession> => {
  return await auth();
};