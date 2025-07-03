import prisma from "@/db";
import { ActionResult } from "../types/action.types";
import { handleActionErrors } from "@/utils/errorHandlers";
import { LeaderboardReport, UserInstance, UserProfile } from "@/types/user.types";
import { redirect } from "next/navigation";
import { session } from "@/auth";


export async function getUserProfile(): ActionResult<UserProfile> {
    if (!session?.user?.email) redirect("/signin");

     try {
        // @ts-ignore
        const user: UserInstance = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                _count: {
                    select: {
                        completedTopics: true,
                        exerciseReports: true,
                    },
                },
                exerciseReports: {
                    select: {
                        score: true,
                        total: true,
                    },
                },
            },
        });


        if (!user) redirect("/signin");

        const totalScores = user.exerciseReports.reduce(
            (acc, r) => acc + r.score,
            0,
        );
        const totalPossible = user.exerciseReports.reduce(
            (acc, r) => acc + r.total,
            0,
        );
        const averageScore =
            totalPossible > 0 ? (totalScores / totalPossible) * 100 : 0;
        
        // @ts-ignore
        const rank = await prisma.user.count({
            where: {
                exerciseReports: {
                    some: {},
                },
            },
        }); // Placeholder for now — later we can implement actual ranking logic

        return {
            message: "Done!",
            success: true,
            data: {
                user,
                totalScores,
                totalPossible,
                averageScore,
                rank
            }
        }
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not get user profile",
        }
    }
}

export async function getLeaderboard(limit = 10): ActionResult<LeaderboardReport[]> {

    try {
        // @ts-ignore
        const users = await prisma.user.findMany({
            take: limit,
            include: {
                exerciseReports: true,
                _count: {
                    select: { completedTopics: true },
                },
            },
        });

        return users.map((user) => {
            const totalScore = user.exerciseReports.reduce((sum, r) => sum + r.score, 0);
            const totalMax = user.exerciseReports.reduce((sum, r) => sum + r.total, 0);
            const accuracy = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                avatarUrl: user.avatarUrl,
                streak: user.streak,
                topicCount: user._count.completedTopics,
                accuracy: Math.round(accuracy),
            };
        }).sort((a, b) => {
            // Sort by accuracy first, then streak
            if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
            return b.streak - a.streak;
        });
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not fetch leaderboard data",
        }
    }
  
}
