"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {userSchema, UserSchema} from "@/app/components/schema/user";
import {AuthRequest, useUserLoginMutation} from "@/lib/features/auth/authApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {login} from "@/lib/features/auth/authSlice";
import {useRouter, useSearchParams} from "next/navigation";
import Cookies from "js-cookie";

export default function UserLoginForm(){
    const [userLogInApi,uerLogInResult] = useUserLoginMutation();
    const {register,handleSubmit,reset,formState:{errors}} = useForm<UserSchema>({resolver:zodResolver(userSchema)});

    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl");

    const userLoginFormSubmit = (userLoginFormData:AuthRequest) => {

        userLogInApi(userLoginFormData).unwrap()
            .then(data=>{
                const cookieToken = Cookies.set('cookieToken',data.token,{expires:100});

                dispatch(login({token : cookieToken as string}));
                reset();

                if(redirectUrl)
                {
                    router.push(redirectUrl);
                }
                else
                {
                    router.push(`/`);
                }
            })
    }
    return(
        <div>
            <form onSubmit={handleSubmit(userLoginFormSubmit)} className=" flex flex-col items-center justify-center gap-3">
                <div className=" flex flex-col items-start justify-center gap-2">
                    <label className="input input-bordered flex items-center gap-2 3xs:w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                        </svg>
                        <input {...register('email')} type="text" className="grow" placeholder="Email"/>
                    </label>
                    <p className=" text-red-500">{errors.email?.message}</p>
                </div>

                <div className=" flex flex-col items-start justify-center gap-2">
                    <label className="input input-bordered flex items-center gap-2 3xs:w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"/>
                        </svg>
                        <input {...register('password')} type="password" className="grow" placeholder="Password"/>
                    </label>
                    <p className=" text-red-500">{errors.password?.message}</p>
                </div>

                <button className=" btn w-full" type={"submit"}>Log In</button>
            </form>
        </div>
    )
};