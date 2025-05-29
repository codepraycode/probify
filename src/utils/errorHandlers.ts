
export enum ActionErrorKind {
    ERROR_404=404,
    ERROR_500=500,
};


interface ActionErrorOptions extends ErrorOptions {
    kind?: ActionErrorKind;
}

export class ActionError extends Error {
    kind: ActionErrorKind;

    constructor(message?: string, options?: ActionErrorOptions) {
        const {kind = ActionErrorKind.ERROR_500, ...rest} = options;
        super(message, rest);
        this.kind = kind;
    }
}

export function handleActionErrors<T extends Error>(err: T) {
    console.error(`
        Error with name ${err.name} occured
        |||||||||||||||||||||
        Error Message: ${err.message}
        |||||||||||||||||||||
        Error Cause: ${err.cause}
        |||||||||||||||||||||

        STACK
        ${err.stack}
    `)
}