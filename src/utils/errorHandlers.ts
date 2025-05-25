

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