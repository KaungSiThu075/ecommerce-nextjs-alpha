"use client";
import {useRouter} from "next/navigation";

export default function ToHomePageButton(){

    const router = useRouter();

    const theme = localStorage.getItem("theme");

    const routeToHomePageHandler = () => {
        router.push("/");
    }

    return(
        <p
            className={`border p-3 m-3 cursor-pointer rounded 
            ${theme === 'light' ? 'hover:border-black' : 'hover:border-white'}`}
            onClick={routeToHomePageHandler}
        >
            Continue Shopping
        </p>
    )
}