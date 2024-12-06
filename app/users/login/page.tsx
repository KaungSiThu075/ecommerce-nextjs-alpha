"use client";
import {useRouter} from "next/navigation";
import UserLoginForm from "@/app/components/form/user/UserLoginForm";

export default function Page(){
    const router = useRouter();

    const routeToRegisterPage = () => {
        router.push(`/users/register`)
    }
    return(
        <div>
            <UserLoginForm/>
            <p className="  text-center mt-3">Don't have acc?
                <span onClick={routeToRegisterPage} className="cursor-pointer hover:underline">Register Here</span>
            </p>
        </div>
    )
}