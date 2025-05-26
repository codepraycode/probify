"use server";

import prisma from "@/db";
import { CreateExerciseSessionData, Exercise, ExerciseWithReport, Report, ReportData } from "@/types/exercise.types";
import { ActionResult } from "./type";
import { handleActionErrors } from "@/utils/errorHandlers";

export async function createTestSession(data: CreateExerciseSessionData): ActionResult<string> {
    try {
            const session = await prisma.exerciseSession.create({
            data,
            select: {
                id: true
            }
        });
        return {
            success: true,
            message: "Created Exercise Session",
            data: session.id
        };
    } catch(err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not create exercise",
        }
    }
}

export async function closeSession({
    sessionId,
    reportId,
    duration,
}: {
    sessionId: string;
    reportId: string;
    duration: { minutes: number; seconds: number };
}) {
    const updatedSession = await prisma.exerciseSession.update({
        where: { id: sessionId },
        data: {
            minutes: duration.minutes,
            seconds: duration.seconds,
            reportId: reportId,
            updatedAt: new Date(),
        },
    });
    return updatedSession;
}


export async function getSession(id: string): ActionResult<Exercise> {
    try {
        // @ts-ignore
        const data = await prisma.exerciseSession.findUnique({
            where: { id: id },
            // include: {
            //     report: true,
            // },
        });

        if (!data) {
            throw new Error("Exercise not found");
        }

        return {
            success: true,
            message: "Fetched Exercise Session",
            data: data,
        }
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not fetch exercise session",
        }
    }
}

export async function getAllTestSession(): ActionResult<ExerciseWithReport[]> {
    try {
        // @ts-ignore
        const data = await prisma.exerciseSession.findMany({
            include: {
                report: true,
            },
        });

        return {
            success: true,
            message: "Fetched Exercise Sessions",
            data: data,
        }
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not fetch exercise sessions",
        }
    }
}

// export async function isSessionClosed(id: string) {
//     // @ts-ignore
//     const session = await prisma.exerciseSession.findUnique({
//         where: { id },
//         select: { reportid: true },
//     });

//   return !!session?.reportid;
// }


export async function saveExerciseReport({
    exerciseId,
    ...report
}: ReportData & {exerciseId: string} ): ActionResult<string> {
    try {

        const dt = await prisma.exerciseReport.create({
            data: {
                ...report,
                exercise: {
                    connect: {
                        id: exerciseId,
                    },
                },
            },
            select: {
                id: true,
            }
        });

        return {
            success: true,
            message: "Report is Ready",
            data: dt.id,
        }
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not process report",
        }
    }
}

// Get a single report by its ID (with answers)
export async function getExerciseReportById(reportId: string): ActionResult<Report> {
    try {
        // @ts-ignore
        const dt = await prisma.exerciseReport.findUnique({
            where: { id: reportId },
            // include: {
            //   ExerciseSession: true,
            // },
        });

        if (!dt) {
            throw new Error("Report not found!");
        }

        return {
            success: true,
            message: "Fetched Exercise Report",
            data: dt,
        }
    } catch (err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not fetch exercise report",
        }
    }
}

// Get all reports (optionally paginated)
// export async function getAllReports(limit = 20, offset = 0) {
//   return await prisma.exerciseReport.findMany({
//     take: limit,
//     skip: offset,
//     orderBy: { createdAt: "desc" },
//     // include: {
//     //   ExerciseSession: true,
//     // },
//   });
// }

// Count total reports
// export async function countReports() {
//   return await prisma.exerciseReport.count();
// }