import prisma from "@/db";
import { ActionResult } from "@/types/action.types";
import { LeaderboardReport, UserLeaderboardInstance } from "@/types/user.types";
import { handleActionErrors } from "@/utils/errorHandlers";

export async function fetchLeaderboardPage(page: number, limit = 10): ActionResult<{
    data: LeaderboardReport[];
    currentPage: number;
    totalPages: number;
}> {
    const skip = (page - 1) * limit;

    try {
        // @ts-ignore
        const users: UserLeaderboardInstance[] = await prisma.user.findMany({
            take: limit,
            skip,
            where: {
                exerciseReports: {
                    some: {},
                },
            },
            include: {
                exerciseReports: {
                    select: {
                        score: true,
                        total: true,
                    },
                },
            },
            
        });

        const ranked = users.map(user => {
            const { exerciseReports } = user;

            const totalScore = exerciseReports.reduce((acc, r) => acc + r.score, 0);
            const totalPossible = exerciseReports.reduce((acc, r) => acc + r.total, 0);

            const cumulativeScore = totalPossible > 0 ? totalScore / totalPossible : 0;

            return {
                id: user.id,
                name: user.name ?? "Anonymous",
                avatarUrl: user.avatarUrl,
                school: user.school,
                username: user.username,
                cumulativeScore,
            };
        })
        .filter((e)=>e.cumulativeScore > 0)
        .sort((a, b) => b.cumulativeScore - a.cumulativeScore)
        .map((user, idx) => ({
            ...user,
            rank: idx + 1,
            scorePercent: `${(user.cumulativeScore * 100).toFixed(1)}%`,
        }))


        const totalUsers = users.length;

        return {
            success: true,
            message: "Loaded leaderboard",
            data: {
                data: ranked,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
            },
        };
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not fetch leaderboard data",
        }
    }
  
}
