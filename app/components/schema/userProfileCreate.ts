import * as z from 'zod';

export const userProfileSchema = z.object({
    name:z.string().min(1,{message: 'Name is required'}),
    // profileAvatar: z
    //     .instanceof(File)
    //     .or(z.null())
    //     .refine((file) => file instanceof File),
    profileAvatar:z.any(),
    gender:z.string().min(1,{message: 'Gender is required'}),
    address:z.string().min(1,{message: 'Address is required'}),
    phoneNumber:z.string().min(1,{message: 'Phone number is required'}),
})

export type UserProfileSchema = z.infer<typeof userProfileSchema>