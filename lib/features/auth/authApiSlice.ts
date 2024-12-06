import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserProfileInterfaceForReview} from "@/lib/features/userProfiles/userProfileApiSlice";
import {BASE_URL} from "@/lib/features/products/productApiSlice";

export interface AuthRequest {
    email:string,
    password:string,
}

export interface UserInterface {
    _id:string,
    email:string,
    profileCreated:boolean,
    role:string,
    userProfile?:UserProfileInterfaceForReview,
}

export interface AuthResponse {
    token: string,
}

export const authApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    reducerPath:'authApi',
    tagTypes:['Auth'],
    endpoints:(build)=>({
        userRegister:build.mutation<AuthResponse,AuthRequest>({
            query:(authRequest:AuthRequest)=>({
                url:`users/register`,
                method:'POST',
                body:authRequest
            })
        }),
        userLogin:build.mutation<AuthResponse,AuthRequest>({
            query:(authRequest:AuthRequest)=>({
                url:`users/login`,
                method:'POST',
                body:authRequest
            })
        })
    })
});

export const {useUserRegisterMutation,useUserLoginMutation} = authApiSlice