import * as z from 'zod';

export const reviewSchema =z.object({
    review:z.string().min(1,{message:`required`})
});

export type ReviewSchema = z.infer<typeof reviewSchema>;