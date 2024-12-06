import * as z from 'zod';

export const userSchema =z.object({
    email:z.string().email({message:`Email is required`}),
    password:z.string().min(8,{message:`password need minimum 8 letters`})
});

export type UserSchema = z.infer<typeof userSchema>;