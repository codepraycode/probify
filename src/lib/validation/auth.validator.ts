import { z } from "zod";


export const signUpSchema = z
    .object({
        name: z.string().min(2).max(50).optional(),
        username: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        school: z.string().optional(),
        gradeLevel: z.string().optional(),
        country: z.string().optional(),
        agree: z.literal(true, {
            errorMap: () => ({ message: "You must accept the terms" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<typeof signUpSchema>;



export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TypeScript type from schema
export type SignInFormValues = z.infer<typeof signInSchema>;
