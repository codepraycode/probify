
export function ModuleLoadError({message}:{message: string}) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="mb-4 text-xl font-semibold text-red-500">
                Failed to load modules
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
    );
}

export function EmptyModuleState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mx-auto max-w-md space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    No Modules Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Get started by creating your first learning module.
                </p>
                {/* <Button asChild className="mt-4">
                    <Link href="/modules/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Module
                    </Link>
                </Button> */}
            </div>
        </div>
    );
}
