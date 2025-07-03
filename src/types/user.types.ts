import { User as UserType, TopicProgress } from "@/db/generated/prisma";

export type User = UserType;

export type UserProgress = TopicProgress;

export type UserProfile = User & UserProgress;

export type LeaderboardReport = {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    streak: number,
    topicCount: number,
    accuracy: number,
}
