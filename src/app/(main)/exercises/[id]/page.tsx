import { getSession } from "@/actions/exercise.actions";
import Spacer from "@/components/Common/Spacer";
import ExercisePlayer from "@/components/Exercises/ExercisePlayer";
import { EXERCISE_REPORT_REF_URL } from "@/data/links";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ExercisePage({params}: Props) {

    // const reportId = "cmb3r42480000m6081mufo39z";
    const exerciseId = (await params).id;

    // console.debug("ExercisePage reportId:", reportId);

    const { success, data } = await getSession(exerciseId);

    if (!success) {
        return notFound();
    }

    const { reportId, ...exercise } = data;

    if (reportId) {
        // console.dir(report);
        // Remove to use this same page for both report and player
        return redirect(EXERCISE_REPORT_REF_URL(reportId));
    }


    return (
        <>
            <Spacer />

            <ExercisePlayer exercise={{ ...exercise, reportId }} />
        </>
    );
}
