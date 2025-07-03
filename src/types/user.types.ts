import { User as UserType, TopicProgress } from "@/db/generated/prisma";

export type User = UserType;

export type UserProgress = TopicProgress;

// export type UserProfile =  {

//     _count: {
//       completedTopics: number;
//       exerciseReports: number;
//     };
//     exerciseReports: {
//       score: number;
//       total: number;
//     }[];
// };


export type UserInstance = User & {
    _count: {
        completedTopics: number;
        exerciseReports: number;
    };
    exerciseReports: {
        score: number;
        total: number;
    }[];
}

export type UserLeaderboardInstance = Omit<UserInstance, "_count">;


export type UserProfile = {
    user: UserInstance;
    totalScores: number;
    totalPossible: number;
    averageScore: number;
    rank: number;
};

// export type LeaderboardReport = {
//     id: string;
//     name: string;
//     username: string;
//     avatarUrl: string;
//     streak: number,
//     topicCount: number,
//     accuracy: number,
// }
export type LeaderboardReport = {
    rank: number;
    scorePercent: string;
    id: string;
    name: string;
    avatarUrl: string;
    school: string;
    username: string;
    cumulativeScore: number;
}
