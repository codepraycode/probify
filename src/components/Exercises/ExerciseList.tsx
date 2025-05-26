

import { ExerciseListItem, ExerciseSetup, LoadExerciseError, NoExerciseError } from "./ExerciseListItem";
import { getAllTestSession } from "@/actions/exercise.actions";
// import { useCallback } from "react";


export async function ExerciseList() {

    const {success, message, data} = await getAllTestSession();

    if (!success) {
        // console.error("Failed to fetch exercises:", message);
        return <LoadExerciseError message={message}/>;
    }

    if (!data || data.length === 0) {
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
