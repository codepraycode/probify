import { toast } from "sonner";

const baseClass =
  "rounded-sm px-5 py-4 shadow-submit transition duration-300";

export const showLoadingToast = (message: string, id:string) => {
  toast.loading(message, {
    id,
    className: `${baseClass} bg-primary text-white dark:bg-primary dark:text-white`,
    descriptionClassName: "text-white/80 dark:text-white/70",
  });

  return id;
};

export const showSuccessToast = (message: string, id=(new Date().toString())) => {
  toast.success(message, {
    duration: 4000,
    className: `${baseClass} bg-primary text-white dark:bg-primary dark:text-white`,
    descriptionClassName: "text-white/80 dark:text-white/70",
    id
  });

  return id;
};

export const showErrorToast = (message: string, id=(new Date().toString())) => {
  toast.error(message, {
    duration: 4000,
    className: `${baseClass} bg-red-600 text-white dark:bg-red-600 dark:text-white`,
    descriptionClassName: "text-white/80 dark:text-white/70",
    id
  });
  return id;
};

export const showNotImplementedToast = (id=(new Date().toString())) => {
  toast("🚧 Not Implemented", {
    description: "This feature is still being built. Stay tuned!",
    duration: 4000,
    className: `${baseClass} bg-yellow text-black dark:bg-yellow dark:text-black`,
    descriptionClassName: "text-black/80 dark:text-black/70",
    richColors: true,
    id,
  });

  return id;
};
