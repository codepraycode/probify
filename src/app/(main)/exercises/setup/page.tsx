
import { redirect } from "next/navigation";
import { ExerciseSetupSchema } from "@/lib/schema/exerciseSchema";
import ExerciseSetupForm from "@/components/Exercises/SetupForm";


async function startExercise(formData: FormData) {
    "use server";

    const raw = Object.fromEntries(formData.entries());
    const topics = formData.getAll("topics").map(String);

    const parsed = ExerciseSetupSchema.safeParse({ ...raw, topics });

    if (!parsed.success) {
        console.error(parsed.error.format());
        return;
    }

    const { questions, minutes, type } = parsed.data;
    const topicsStr = parsed.data.topics.join(",");

    redirect(
        `/exercise/start?questions=${questions}&minutes=${minutes}&type=${type}&topics=${topicsStr}`,
    );
}




export default function ExerciseSetupPage() {

    return (
        <section className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4">
            <ExerciseSetupForm/>
        </section>
    );
}
