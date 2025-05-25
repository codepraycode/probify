"use server";

import prisma from "@/db";
import { CreateExerciseSessionData } from "@/types/exercise.types";
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
            reportid: reportId,
            updatedAt: new Date(),
        },
    });
    return updatedSession;
}


export async function getSession(id: string) {
    // @ts-ignore
    return prisma.exerciseSession.findUnique({
        where: { id: id },
        include: {
            report: true,
        },
    });
}

export async function isSessionClosed(id: string) {
    // @ts-ignore
    const session = await prisma.exerciseSession.findUnique({
        where: { id },
        select: { reportid: true },
    });

  return !!session?.reportid;
}
