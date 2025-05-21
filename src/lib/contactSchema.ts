import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string({required_error: "Name is required"}).min(1, 'Name is required'),
    email: z.string({required_error: "Email is required"}).email('Invalid email'),
    message: z.string({required_error: "Message is required"}).min(1, 'Message is required'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
