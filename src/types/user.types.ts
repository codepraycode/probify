import { User as UserType, TopicProgress } from "@/db/generated/prisma";

export type User = UserType;

export type UserProgress = TopicProgress;

export type UserProfile = User & UserProgress;
