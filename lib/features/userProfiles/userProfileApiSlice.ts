import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {BASE_URL} from "@/lib/features/products/productApiSlice";

export interface UserProfileInterfaceForReview {
    _id?:string,
    name:string,
    profileAvatar:string
}

export interface UserProfileInterface {
    _id?: string,
    userId?:string,
    name:string,
    profileAvatar:string,
    gender:string,
    address:string,
    phoneNumber:string,
}

export interface UserProfileResponseInterface {
    profile:UserProfileInterface | null;
}

export const userProfileApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL,
        prepareHeaders:(headers, {getState})=>{
            const state:any = getState();

            const cookieToken = Cookies.get('cookieToken');

            if(cookieToken)
            {
                headers.set('Authorization',`Bearer `+cookieToken)
            }
            return headers;
        }}),
    reducerPath:'userProfileApi',
    tagTypes:['UserProfile'],
    endpoints:(build)=>({
        getUserProfileByUserId:build.query<UserProfileResponseInterface,undefined>({
            query:()=>`userProfile/profile`
        }),
        createUserProfile:build.mutation<UserProfileInterface,FormData>({
            query:(userProfile:FormData)=>({
                url:`userProfile`,
                method:'POST',
                body:userProfile
            })
        }),
        updateUserProfile:build.mutation<UserProfileInterface,FormData>({
            query:(userProfile:FormData)=>({
                url:`userProfile`,
                method:'PUT',
                body:userProfile
            }),
            async onQueryStarted(userProfile:FormData,{dispatch,queryFulfilled}){

                try
                {
                    const {data:updatedProfile} = await queryFulfilled;

                    const patchResult = dispatch(
                        userProfileApiSlice.util.updateQueryData(
                            'getUserProfileByUserId',undefined,
                            (draft)=>{
                                draft.profile = updatedProfile;
                                return draft;
                            }
                        )
                    )
                }
                catch(err){}
            }
        })
    })
})

export const {useGetUserProfileByUserIdQuery, useCreateUserProfileMutation,useUpdateUserProfileMutation} = userProfileApiSlice;