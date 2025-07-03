export const APP_LIVE_URL = "https://probify.vercel.app";

export const HOME = "/";
export const SIGNIN = "/signin";
export const SIGNUP = "/signup";
export const PROFILE = "/profile";
export const LEADERBOARD = "/leaderboard";
export const HASH = "/#";
export const TERMS = "/#";
export const PRIVACY = "/#";
export const COOKIES = "/#";

export const EXERCISES="/exercises";
export const EXERCISE_SETUP=`${EXERCISES}/setup`;
export const EXERCISE_REPORT=`${EXERCISES}/report`;
export const EXERCISE_REPORT_REF="d";
export function EXERCISE_REPORT_REF_URL(reportId: string) {
    return `${EXERCISE_REPORT}?${EXERCISE_REPORT_REF}=${reportId}`;
}


export const MODULES="/modules";

export function MODULE_PAGE_URL(ref: string) {
    return `${MODULES}/${ref}`;
}

export function MODULE_TOPIC_PAGE_URL(topic:string) {
    return `${MODULES}/topics/${topic}`;
}
