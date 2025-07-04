// src/auth.ts
import NextAuth from "next-auth";
import authConfig from "@/lib/auth/config";

// Export the NextAuth instance
export const { 
    auth, 
    signIn, 
    signOut, 
    handlers 
} = NextAuth(authConfig);


export const getCurrentSession = async () => {
    return await auth(); // This will be called per-request
};


export { authConfig };