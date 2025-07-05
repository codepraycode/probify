import { dummyModules } from "@/data/module";
import { ActionResult } from "../types/action.types";
import {Module, Topic, TopicWithProgress} from "@/types/exercise.types";
import { ActionError, ActionErrorKind, handleActionErrors } from "@/utils/errorHandlers";
import prisma from "@/db";

export async function getModuleBySlug(slug: string): ActionResult<Module> {

    try {

        const data = dummyModules.find((e)=>Object.is(slug, e.slug));

        if (!data) { // TODO: Replace with isEmpty function

            // throw new ActionError("Module not found", {
            //     kind: ActionErrorKind.ERROR_404
            // });

            return {
                success: false,
                message: "Could not resolve module",
                kind: ActionErrorKind.ERROR_500,
            }
        }

        return {
            success: true,
            message: "Found Module",
            data
        }

    } catch(err) {
        handleActionErrors(err);
        return {
            success: false,
            message: "Could not find module",
            kind: err.kind ?? ActionErrorKind.ERROR_500,
        }
    }
}



export async function loadTopicsByIds(
  topicIds: string[],
  userId?: string
): ActionResult<TopicWithProgress[]> {
    try {
        // 1. Validate input
        if (!topicIds.length) {
            return {
                success: false,
                message: "No topic IDs provided",
                kind: ActionErrorKind.ERROR_404,
            };
        }

        // 2. Fetch topics with conditional progress
        //@ts-ignore
        const topics = await prisma.topic.findMany({
            where: { id: { in: topicIds } },
            include: {
                exercises: true, // If you need exercises
                ...(userId ? {
                    progress: {
                        where: { userId },
                        // Implicitly connects via topicSlug->slug relation
                        take: 1,
                    },
                } : {}),
            },
        });

        if (!topics.length) {
            return {
                success: false,
                message: "No topics found",
                kind: ActionErrorKind.ERROR_404,
            };
        }

        // 3. Transform results
        const result: TopicWithProgress[] = topics.map((topic) => ({
            ...topic,
            progress: userId ? topic.progress?.[0] || null : null,
        }));

        return {
            success: true,
            data: result,
            message: "Topics loaded successfully",
        };
    } catch (error) {
        handleActionErrors(error);
        return {
            success: false,
            message: error.message ?? "Could not find module",
            kind: error.kind ?? ActionErrorKind.ERROR_500,
        }

    }
}