"use client";
import React, {ChangeEvent, useState} from "react";
import {SlidersHorizontal} from "lucide-react";
import {X} from "lucide-react";
import useCloseDrawer from "@/app/components/customHooks/useCloseDrawer";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import ThemeButton from "@/app/components/button/ThemeButton";

interface PriceSortingProps {
    sort:string,
    setSortAction:(sort:string)=>void
}

export default function PriceSorting({sort,setSortAction}:PriceSortingProps) {

    const sortOptionHandler = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        setSortAction(e.currentTarget.name);
        useCloseDrawer("filter-drawer");
    }

    return (
        <div className=" my-4">
            <div className="drawer drawer-end flex items-center justify-end">
                <input id="filter-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="filter-drawer">
                    {/* Page content here */}
                    <label htmlFor="filter-drawer" className="drawer-button">
                        <SlidersHorizontal className=" cursor-pointer"/>
                    </label>
                </div>
                <div className="drawer-side z-20">

                    <ul className="menu bg-base-200 text-base-content w-full min-h-full lg:w-1/2 p-4">
                        <div className="flex items-center justify-end">
                            <label htmlFor="filter-drawer" aria-label="close sidebar"
                                   className="drawer-overlay lg:mr-3 cursor-pointer">
                                <X/>
                            </label>
                        </div>

                        <Accordion
                            disableGutters
                            elevation={0}
                            square
                            sx={{
                                margin:"20px 0px",
                                border: "none",
                                borderTop: "1px solid #ccc",
                                borderBottom: "1px solid #ccc",
                                backgroundColor:"transparent",
                                "&:before": {
                                    display: "none",
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<button className=" btn bg-none border-none shadow-none hover:bg-transparent"><ExpandMoreIcon /></button>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <button className=" btn bg-none border-none shadow-none hover:bg-transparent">SORT BY</button>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    backgroundColor:"transparent",
                                }}
                            >
                                <div className=" flex flex-col items-start justify-center gap-2">
                                    <ThemeButton name={""} sortOptionHandler={sortOptionHandler}>
                                        {"DEFAULT"}
                                    </ThemeButton>

                                    <ThemeButton name={"asc"} sortOptionHandler={sortOptionHandler}>
                                        {"PRICE (LOW - HIGH)"}
                                    </ThemeButton>

                                    <ThemeButton name={"desc"} sortOptionHandler={sortOptionHandler}>
                                        {"PRICE (HIGH - LOW)"}
                                    </ThemeButton>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </ul>
                </div>
            </div>
        </div>
    )
}

