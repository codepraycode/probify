"use server";

import prisma from "@/db";
import { CreateExerciseSessionData, Exercise, ExerciseWithReport, Report, ReportData } from "@/types/exercise.types";
import { ActionResult } from "../types/action.types";
import { ActionErrorKind, handleActionErrors } from "@/utils/errorHandlers";
import { JsonValue } from "@/db/generated/prisma/runtime/library";
import { SubmittedAnswer } from "@/lib/schema/exerciseSchema";

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
  userId,
  ...report
}: ReportData & { exerciseId: string }): ActionResult<string> {
  try {
    // Calculate accuracy
    const accuracy = (report.score / report.total) * 100;

    // Use transaction for data integrity
    interface SaveExerciseReportTransactionResult {
      newReport: Report;
    }

    const [newReport] = await prisma.$transaction([
      prisma.exerciseReport.create({
        data: {
          ...report,
          accuracy,
          user: { connect: { id: userId } },
          exercise: { connect: { id: exerciseId } },
        },
      }),
      prisma.exerciseSession.update({
        where: { id: exerciseId },
        data: {
          user: { connect: { id: userId } },
        },
      }),
    ]);

    const result: Report = newReport;

    return {
      success: true,
      message: "Exercise report saved successfully",
      data: result.id,
    };
  } catch (error) {
    console.error("Failed to save exercise report:", error);
    return {
      success: false,
      message: error instanceof Error 
        ? error.message 
        : "An unknown error occurred while saving the report",
      kind: ActionErrorKind.ERROR_500,
    };
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