"use client";
import React from "react";

interface ThemeButtonProps {
    children:React.ReactNode,
    name?:string,
    sortOptionHandler?:(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>void
}

export default function ThemeButton({children,name,sortOptionHandler}:ThemeButtonProps){
    return(
        <button
            name={name}
            onClick={sortOptionHandler}
            className=" btn border-none shadow-none bg-transparent hover:bg-transparent"
        >
            {children}
        </button>
    )
}