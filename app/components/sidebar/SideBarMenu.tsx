"use client";
import {CircleUserRound, Heart, Menu, Search, ShoppingCart, X} from "lucide-react";
import Link from "next/link";
import styles from "@/app/styles/layout.module.css";
import useCloseDrawer from "@/app/components/customHooks/useCloseDrawer";
import ThemeToggle from "@/app/components/theme/ThemeToggle";
import React, {ChangeEvent} from "react";
import {usePathname, useRouter} from "next/navigation";

interface SideBarMenuProps {
    favProdsCount:number,
    cartValue:number,
    searchKeyword:string,
    searchKeywordHandlerAction:(e:ChangeEvent<HTMLInputElement>)=>void,
    login:string
}

export default function SideBarMenu({favProdsCount,cartValue,searchKeywordHandlerAction, searchKeyword,login}:SideBarMenuProps) {
    const pathname = usePathname();

    const router = useRouter();

    const handleFocus = (e:React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.focus();
    }

    const routeToKeywordPage = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.currentTarget.id === "search_sidebar")
        {
            router.push(`/w/${searchKeyword}`);
            useCloseDrawer("search-drawer");
        }
    }

    const routeToKeywordPageTwo = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.currentTarget.id === "search_keyword_sidebar")
        {
            router.push(`/w/${searchKeyword}`);
            useCloseDrawer("search-drawer");
        }
    }

    return(
        <>
            <div className=" flex justify-between items-center gap-3 xl:hidden">
                <div className="drawer w-1/5 xl:hidden">
                    <input id="route-drawer" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-content xl:hidden">
                        {/* Page content here */}
                        <label htmlFor="route-drawer" className="drawer-button">
                            <Menu className=" cursor-pointer"/>
                        </label>

                    </div>
                    <div className="drawer-side z-20 pr-3 xl:hidden">

                        <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 xl:hidden">
                            <div className=" flex items-center justify-end xl:hidden">
                                <label htmlFor="route-drawer" aria-label="close sidebar" className="drawer-overlay mb-2 cursor-pointer">
                                    <X/>
                                </label>
                            </div>
                            <Link
                                className={`${styles.link} ${pathname === "/" ? styles.active : ""} py-2 border-b border-gray-500`}
                                href="/"
                                onClick={() => useCloseDrawer("route-drawer")}
                            >
                                HOME
                            </Link>
                            <Link
                                className={`${styles.link} ${pathname === `/men` ? styles.active : ""} py-2 border-b border-gray-500`}
                                href="/men"
                                onClick={() => useCloseDrawer("route-drawer")}
                            >
                                MEN
                            </Link>
                            <Link
                                className={`${styles.link} ${pathname === "/women" ? styles.active : ""} py-2 border-b border-gray-500`}
                                href="/women"
                                onClick={() => useCloseDrawer("route-drawer")}
                            >
                                WOMEN
                            </Link>
                            <Link
                                className={`${styles.link} ${pathname === "/kids" ? styles.active : ""} py-2 border-b border-gray-500`}
                                href="/kids"
                                onClick={() => useCloseDrawer("route-drawer")}
                            >
                                KIDS
                            </Link>

                            <div className=" py-2 border-b border-gray-500" onClick={() => useCloseDrawer("route-drawer")}>
                                <ThemeToggle/>
                            </div>

                        </ul>
                    </div>
                </div>

                <Link
                    className={`${styles.link} ${pathname === "/favoriteProducts" ? styles.active : ""} xl:hidden`}
                    href="/favoriteProducts"
                >
                    <div className=" relative">
                        <Heart className=" text-current"/>

                        {(favProdsCount > 0) &&
                            <span className="absolute top-0 right-0 -mt-2 -mr-3
                          bg-red-600 text-white text-xs font-bold rounded-full
                          h-5 w-5 flex items-center justify-center">
                      {(favProdsCount > 9 ? "9+" : favProdsCount)}
                           </span>}
                    </div>
                </Link>
            </div>


            <div className=" flex justify-center items-center gap-3 xl:hidden">
                <div className="hidden xs:block">
                    <label className="input input-bordered flex items-center gap-2 ">
                        <input
                            onFocus={handleFocus}
                            id="search_keyword_sidebar"
                            value={searchKeyword}
                            onChange={searchKeywordHandlerAction}
                            onKeyDown={routeToKeywordPageTwo}
                            type="text"
                            className="grow xs:w-1/2"
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>

                <div className="drawer drawer-end w-1/5 xs:hidden">
                    <input id="search-drawer" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-content xl:hidden">
                        {/* Page content here */}
                        <label htmlFor="search-drawer" className="drawer-button">
                            <Search className="cursor-pointer"/>
                        </label>

                    </div>
                    <div className="drawer-side z-20 pr-3 xl:hidden">

                        <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 xl:hidden">
                            <div className=" flex items-center justify-end xl:hidden">
                                <label htmlFor="search-drawer" aria-label="close sidebar"
                                       className="drawer-overlay mb-2 cursor-pointer">
                                    <X/>
                                </label>
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    onFocus={handleFocus}
                                    id="search_sidebar"
                                    value={searchKeyword}
                                    onChange={searchKeywordHandlerAction}
                                    onKeyDown={routeToKeywordPage}
                                    type="text"
                                    className="grow "
                                    placeholder="Search"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"/>
                                </svg>
                            </label>
                        </ul>
                    </div>
                </div>

                <Link
                    className={`${styles.link} ${pathname === "/userProfile" ? styles.active : ""}`}
                    href="/userProfile"
                >
                    <CircleUserRound className=" xl:hidden"/>
                </Link>

                {login ?
                    <Link
                        className={`${styles.link} ${pathname === "/users/logout" ? styles.active : ""} text-center xl:hidden`}
                        href="/users/logout"
                    >
                        LogOut
                    </Link> :
                    <Link
                        className={`${styles.link} ${pathname === "/users/login" ? styles.active : ""} text-center xl:hidden`}
                        href="/users/login"
                    >
                        LogIn
                    </Link>}

                <Link
                    className={`${styles.link} ${pathname === "/cart" ? styles.active : ""} xl:hidden`}
                    href="/cart"
                >
                    <div className=" relative">
                        <ShoppingCart className=" xl:hidden"/>
                        {(cartValue > 0) && <span
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {(cartValue > 9 ? "9+" : cartValue)}
                      </span>}
                    </div>
                </Link>
            </div>
        </>
    )
}



