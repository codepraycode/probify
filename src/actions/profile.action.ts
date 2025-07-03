import prisma from "@/db";
import { ActionResult } from "../types/action.types";
import { handleActionErrors } from "@/utils/errorHandlers";
import { UserInstance, UserProfile } from "@/types/user.types";
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
