
import { useSession } from "next-auth/react";


type UserSession =
    | {
          isLoading: boolean;
          isAuthenticated: false;
          user?: null;
      }
    | {
        isLoading: boolean;
        isAuthenticated: true;
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
      };




export default function useUserSession(redirectToLogin=false): UserSession {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated";
    const user = session?.user;

    if (isAuthenticated) {
        return {
            isLoading,
            isAuthenticated: true,
            user: user as UserSession["user"],
        };
    } else {
        return { isLoading, isAuthenticated: false, user: null };
    }
}