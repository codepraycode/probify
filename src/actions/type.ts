import { ActionErrorKind } from "@/utils/errorHandlers";

export type ActionResult<T> = Promise<
    {
        success: false;
        data?: null;
        message: string;
        kind?: ActionErrorKind;
    } | {
        success: true;
        data: T;
        message: string;
        kind?: ActionErrorKind;
    }
>;
