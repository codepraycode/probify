import { ExerciseReport, ExerciseReportFooter, ExerciseReportHeader } from "@/components/Exercises/Report/ExerciseReport";
import { EXERCISE_REPORT_REF } from "@/data/links";
import { getExerciseReportById } from "@/actions/exercise.actions";
import { notFound } from "next/navigation";
import Spacer from "@/components/Common/Spacer";

type Props = {
    // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    searchParams: Promise<{ [key: string]: string | undefined}>;
};


export default async function ReportPage({searchParams}: Props) {
    const params = await searchParams;
    const reportId = params[EXERCISE_REPORT_REF];

    const {success, data: report} = await getExerciseReportById(reportId)

    if (!success) {
        return notFound();
    }

    return (
        <section className="container max-w-4xl space-y-8 py-10">
            <Spacer/>
            <ExerciseReportHeader />
            <ExerciseReport report={report}/>
            <ExerciseReportFooter />
        </section>
    );
}