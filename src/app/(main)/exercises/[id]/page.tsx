import Spacer from "@/components/Common/Spacer";
import ExercisePlayer from "@/components/Exercises";

export default function ExercisePage() {    

    const reportId = "cmb3r42480000m6081mufo39z";

    return (
        <>
            <Spacer />

            <ExercisePlayer reportId={reportId} />
        </>
    );
}
