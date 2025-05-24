import prisma from "@/db";

export async function createSession(duration: number) {
    const session = await prisma.exerciseSession.create({
        data: {
            duration
        },
    });
    return session;
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
