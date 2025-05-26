import { MIN_EXERCISE_DURATION } from "@/data/framework";

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