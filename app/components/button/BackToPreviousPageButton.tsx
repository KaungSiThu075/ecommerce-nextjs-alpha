"use client";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

export default function BackToPreviousPageButton(){
    const router = useRouter();
    return(
        <ArrowLeft className=" my-3 cursor-pointer" onClick={()=>router.back()}/>
    )
}