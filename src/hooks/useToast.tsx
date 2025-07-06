"use client";

import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info" | "default";

export function useToast() {
    const showToast = (
        message: string,
        type: ToastType = "default",
        options?: {
            description?: string;
            duration?: number;
            action?: {
                label: string;
                onClick: () => void;
            };
        },
    ) => {
        const baseConfig = {
            duration: options?.duration || 5000,
            description: options?.description,
            action: options?.action,
        };

        switch (type) {
            case "success":
                return toast.success(message, baseConfig);
            case "error":
                return toast.error(message, baseConfig);
            case "warning":
                return toast.warning(message, baseConfig);
            case "info":
                return toast.info(message, baseConfig);
            default:
                return toast(message, baseConfig);
        }
    };

    return { toast: showToast };
}
