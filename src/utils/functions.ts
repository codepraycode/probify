import { MIN_EXERCISE_DURATION } from "@/data/framework";
import { ModuleMeta } from "@/types/exercise.types";

type WaitOption = {
    shouldErr?: boolean;
    returnValue?: any;
}

export function wait(duration: number, option: WaitOption = {shouldErr: false, returnValue: null}) {
    const time = Math.abs(duration) * 1000;

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

            if (option.shouldErr) {
                reject(option.returnValue);
            }else {

                resolve(option.returnValue);
            }
        }, time);
    })
}

export function calculateExerciseDuration(duration: number) {
    // Duration is in minutes, convert it to seconds
    if (duration < MIN_EXERCISE_DURATION) {
        throw new Error("Duration must be at least 5 minute");
    }

    return duration * 60; // Convert minutes to seconds
}

export function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")} min`;
}

export const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });


export function isModuleMeta(data: unknown): data is ModuleMeta {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    'title' in data &&
    'order' in data
  );
}