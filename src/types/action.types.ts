import { ActionErrorKind } from "@/utils/errorHandlers";

export type ServerResult<T> = 
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


export type ActionResult<T> = Promise<ServerResult<T>>;
