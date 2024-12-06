"use client";
import React, { useState} from "react";
import {ChevronRight} from "lucide-react";
import {ChevronLeft} from "lucide-react";
import {useRouter} from "next/navigation";

interface PaginationProps {
    totalPages:number,
    page:number | string,
}

export default function Pagination({totalPages,page}:PaginationProps){

    const [input,setInput] = useState('');

    const router = useRouter();

    const paginateHandler = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        if(e.currentTarget.name === "paginate_right")
        {
            router.push(`?page=${(+page)+1}`);
        }
        else if(e.currentTarget.name === "paginate_left")
        {
            router.push(`?page=${(+page)-1}`);
        }
    }

    const pageSubmit = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter" && e.currentTarget.id === "pagination_input")
        {
            const pageForUse = +e.currentTarget.value;

            if(pageForUse > totalPages)
            {
                setInput('');
                router.push(`?page=${totalPages}`);
            }
            else if(pageForUse < 1 || isNaN(pageForUse))
            {
                setInput('');
                router.push(`?page=${1}`);
            }
            else
            {
                setInput('');
                router.push(`?page=${pageForUse}`);
            }
        }
    }

    return(
        <div
            className=" flex items-center justify-center gap-x-4 my-5"
        >
            {+page > 1 &&
                <button name="paginate_left"
                        className={'btn'} onClick={paginateHandler}
                >
                    <ChevronLeft/>
                </button>}

                <input
                    id="pagination_input"
                    className="w-[30px]"
                    value={input}
                    onKeyDown={pageSubmit}
                    min={1}
                    max={totalPages}
                    name='pageInput'
                    placeholder={`${page}`}
                    onChange={(e) => setInput(e.target.value)}
                /> / <p className="p-3">{totalPages}</p>

            {+page < totalPages &&
                <button
                    name="paginate_right"
                    className={'btn'}
                    onClick={paginateHandler}
                >
                    <ChevronRight/>
                </button>}
        </div>
    )
}