import Spacer from "@/components/Common/Spacer";
import ExercisePlayer from "@/components/Exercises";
import { nanoid } from "nanoid";

export default function ExercisePage() {    

    const reportId = nanoid();

    return (
        <>
            <Spacer />

            <ExercisePlayer reportId={reportId} />
        </>
    );
}
