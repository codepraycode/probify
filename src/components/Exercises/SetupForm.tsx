"use client";

import { ExerciseSetupFormValues, ExerciseSetupSchema } from "@/lib/schema/exerciseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../Common/Form/InputField";
import { PrimaryButton } from "../ui/Button";
import { LoadingIcon } from "../Common/Icons";
import clsx from "clsx";
import { CheckboxGroup, RadioGroup } from "../Common/Form/Checkbox";
import { useExercise } from "@/lib/context/ExerciseContext";
import { useNavigate } from "@/hooks/useNavigate";
import { QuestionTypeLabels } from "@/types/exercise.types";
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/utils/toast";
import { useSession } from "next-auth/react";
import { topicOptions } from "@/data/options";


export default function ExerciseSetupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ExerciseSetupFormValues>({
        resolver: zodResolver(ExerciseSetupSchema),
    });

    const toastId = "exerciseSetupToast";


    const { data: session, status } = useSession();
    const user = session?.user;
    

    const store = useExercise();

    const {navigate} = useNavigate();

    const onSubmit = async (data: ExerciseSetupFormValues) => {
        showLoadingToast("Creating Exercise...", toastId);
        const {success, message, data: link} = await store.createExerciseSession({...data, userId: user.id});

        if (!success) {
            showErrorToast(message, toastId);
            return;
        }

        setTimeout(() => navigate(link), 980);
        showSuccessToast(message, toastId);


    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xl animate-fadeIn rounded-2xl border border-stroke bg-white p-8 shadow-2xl dark:border-stroke-dark dark:bg-gray-dark"
            noValidate
        >
            <h1 className="mb-2 text-center font-heading text-3xl font-bold">
                🧠 Set Up Your Exercise
            </h1>
            <p className="mb-6 text-center text-muted-foreground">
                Push your limits. Time to practice probability like a legend.
            </p>

            <div className="space-y-6">
                <InputField
                    label="Number of Questions"
                    type="number"
                    name="questions"
                    placeholder="Enter how many questions you want to answer"
                    {...register("questions")}
                    error={errors.questions}
                    disabled={isSubmitting}
                />

                <InputField
                    label="Time Limit (Minutes)"
                    type="number"
                    name="duration"
                    placeholder="Enter how much time you want"
                    {...register("duration")}
                    error={errors.duration}
                    min={1}
                    max={60}
                    disabled={isSubmitting}
                />

                <RadioGroup
                    label="Question Type"
                    name="type"
                    options={Object.values(QuestionTypeLabels).map((e)=>({
                        label: e.simple,
                        value: e.value,
                        hint: e.verbose
                    }))}
                    {...register("type")}
                    error={errors.type?.message}
                    disabled={isSubmitting}
                />

                <CheckboxGroup
                    label="Select Topics"
                    name="topics"
                    options={topicOptions}
                    {...register("topics")}
                    error={errors.topics?.message}
                    disabled={isSubmitting}
                />

                <PrimaryButton
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx("w-full", {
                        "pointer-events-none": isSubmitting,
                    })}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-4">
                            <LoadingIcon /> Loading...
                        </span>
                    ) : (
                        "🚀 Start Exercise"
                    )}
                </PrimaryButton>
            </div>
        </form>
    );
}
