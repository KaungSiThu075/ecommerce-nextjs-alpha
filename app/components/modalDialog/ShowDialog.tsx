"use client";
import React from "react";

export default function ShowDialog({id,children}:{id:string,children:React.ReactNode}){
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                {children}
            </div>
        </dialog>
    )
}