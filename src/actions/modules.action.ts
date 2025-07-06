import { dummyModules } from "@/data/module";
import { ActionResult } from "../types/action.types";
import {ModuleMetadata, ModuleWithProgress, ModuleWithTopics, TopicWithProgress} from "@/types/exercise.types";
import { ActionError, ActionErrorKind, handleActionErrors } from "@/utils/errorHandlers";
import prisma from "@/db";

export async function getModuleMeta(
    slug: string
): ActionResult<ModuleMetadata> {
    try {
        //@ts-ignore
        const moduleData = await prisma.module.findUnique({
            where: { slug },
            select: {
                title: true,
                slug: true,
                description: true,
            }
        });

        if (!moduleData) {
            return {
                success: false,
                message: "Module not found",
                kind: ActionErrorKind.ERROR_404,
            };
        }

        return {
            success: true,
            data: moduleData,
            message: "Module loaded successfully",
        };
    } catch (error) {
        handleActionErrors(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Database error",
            kind: ActionErrorKind.ERROR_500,
        };
  }
}

export async function loadModule(
    slug: string,
    // userId?: string
): ActionResult<ModuleWithProgress> {
    // const session = await getCurrentSession(); // Use directly
    const userId = undefined; //session.user?.id;
  try {
    // 1. Fetch module with topics
    // @ts-ignore
    const moduleData: ModuleWithTopics = await prisma.module.findUnique({
        where: { slug },
        include: {
            topics: {
                // select: { id: true },
                orderBy: { order: "asc" },
            },
            ...(userId
                ? {
                    topics: {
                        include: {

                            progress: {
                                where: { userId },
                            },
                        },
                    },
            } : {}
        )},
    });

    if (!moduleData) {
        return {
            success: false,
            message: "Module not found",
            kind: ActionErrorKind.ERROR_404,
        };
    }

    // 2. Calculate completion stats
    // const topicIds = moduleData.topics.map((t) => t.id);
    let completedCount = 0;
    let completionPercentage = 0;
    let isCompleted = false;
    let totalCount = moduleData.topics.length;

    // if (userId && "progress" in module.topics[0]) {
    //     completedTopics = module.topics.filter(
    //         (t) => t.progress?.[0]?.completed
    //     ).length;
    //     const highestOrderTopic = [...module.topics].sort(
    //         (a, b) => b.order - a.order
    //     )[0];
    //   isCompleted = highestOrderTopic.progress?.[0]?.completed || false;
    // }

    // 3. Prepare response
    const result: ModuleWithProgress = {
      ...moduleData,
      topics: moduleData.topics,
      progress: {
        isCompleted,
        completedCount,
        completionPercentage,
        totalCount,
      }
    };

    return {
      success: true,
      data: result,
      message: "Module loaded successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Database error",
      kind: ActionErrorKind.ERROR_500,
    };
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


export async function checkModuleCompletion(moduleId: string, userId: string) {
  // 1. Get all topics in module ordered by difficulty
  const topics = []
//   await prisma.topic.findMany({
//     where: { moduleId },
//     orderBy: { order: "desc" }, // Highest order first
//     include: {
//       progress: {
//         where: { userId },
//       },
//     },
//   });

  // 2. Check if highest-order topic is completed
  const isCompleted = topics.length > 0 && 
                     topics[0].progress?.length > 0 && 
                     topics[0].progress[0].completed;

  // 3. Unlock next module if completed
  if (isCompleted) {
    const currentModule = {} as any
    // await prisma.module.findUnique({
    //   where: { id: moduleId },
    // });

    await prisma.module.updateMany({
      where: { 
        order: currentModule.order + 1,
        locked: true,
      },
      data: { locked: false },
    });
  }

  return isCompleted;
}