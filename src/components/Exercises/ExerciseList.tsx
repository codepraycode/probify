"use client";

import { AuthRequiredExercisePrompt, ExerciseListItem, ExerciseSetup, LoadExerciseError, NoExerciseError } from "./ExerciseListItem";
import { getAllTestSession } from "@/actions/exercise.actions";
import { getUserSession } from "@/auth";
import useUserSession from "@/hooks/useUserSession";
import PageLoader from "../ui/PageLoader";
import useExercise from "@/hooks/useExercise";
// import { useCallback } from "react";


export function ExerciseList() {


    const {
        isLoading, isAuthenticated,
        data,
        error,
        isEmpty
    } = useExercise();

    if (isLoading) {
        return <PageLoader
            icon="🎯"
            label="Loading your exercises"
            description="Hold on tight!"
        />
    }

    if (!isAuthenticated) {
        return <AuthRequiredExercisePrompt/>
    }

    

    if (error) {
        // console.error("Failed to fetch exercises:", message);
        return <LoadExerciseError message={error}/>;
    }

    if (isEmpty) {
        return <NoExerciseError/>;
    }
    

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* New Exercise Card */}
            <ExerciseSetup/>

            {/* Active session card */}
            {/* {activeSession && <ActiveExerciseCard session={activeSession} />} */}

            {/* Completed exercises */}
            {data.map((exercise) => (
                <ExerciseListItem key={exercise.id} exercise={exercise} />
            ))}
        </div>
    );
}
