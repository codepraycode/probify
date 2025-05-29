import { dummyModules } from "@/data/module";
import { ActionResult } from "./type";
import {Module} from "@/types/exercise.types";
import { ActionError, ActionErrorKind, handleActionErrors } from "@/utils/errorHandlers";

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
