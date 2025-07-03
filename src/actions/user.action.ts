import prisma from "@/db";
import { ActionResult } from "./type";
import { handleActionErrors } from "@/utils/errorHandlers";
import { LeaderboardReport } from "@/types/user.types";

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
