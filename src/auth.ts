import NextAuth from "next-auth";
import authConfig from "@/lib/auth/config";

// These exports are correct
export const { 
  handlers, 
  auth,  // This is the auth function
  signIn, 
  signOut 
} = NextAuth(authConfig);

// Proper type for your session
export type AppSession = Awaited<ReturnType<typeof auth>>;

// Correct way to get current session
export const getCurrentSession = async (): Promise<AppSession> => {
  console.dir(auth);
  if (!auth) return null;
  const session = await auth();

  return session;
};

export async function getUserSession(): Promise<AppSession> {
    const session = await getCurrentSession();
    console.dir(session);
    return session;
}