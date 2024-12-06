"use client";

import React from "react";

interface DataFetchingProps {
    isError:boolean,
    isFetching:boolean,
    isLoading:boolean,
    isSuccess:boolean,
    children:React.ReactNode,
}

export default function DataFetching({isError,isFetching,isLoading,isSuccess,children}:DataFetchingProps){
    if(isError)
    {
        return <div>Error</div>
    }

    if(isFetching)
    {
        return (
            <div>
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    if(isLoading)
    {
        return (
            <div>
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    if (isSuccess) {
        return (
           <div>
               {children}
           </div>
       )
    }
}