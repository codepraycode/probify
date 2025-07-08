import { useEffect, useState } from "react";
import useUserSession from "./useUserSession";
import { getAllTestSession } from "@/actions/exercise.actions";
import { ExerciseWithReport } from "@/types/exercise.types";

export default function useExercise() {
    const {
        user,
        isAuthenticated,
        isLoading: isUserLoading,
    } = useUserSession();
    const [exercises, setExercises] = useState<ExerciseWithReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadExercises() {
            if (!user?.id) return;

            try {
                setIsLoading(true);
                const { success, message, data } = await getAllTestSession(
                    user.id,
                );

                if (isMounted) {
                    if (success) {
                        setExercises(data);
                    } else {
                        setError(message);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "An unknown error occurred",
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadExercises();

        return () => {
            isMounted = false;
        };
    }, [user?.id]); // Only re-run when user.id changes    

    return {
        isAuthenticated,
        isLoading: isUserLoading || isLoading,
        error,
        data: exercises,
        isEmpty: !isLoading && exercises.length === 0,
    };
}
