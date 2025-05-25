
export type ActionResult<T> = Promise<
    {
        success: false;
        data?: null;
        message: string;
    } | {
        success: true;
        data: T;
        message: string;
    }
>;
