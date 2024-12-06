"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import styles from "../styles/layout.module.css";
import useAuth from "@/lib/features/auth/authHook";
import React, {ChangeEvent, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addToCartQuantity, selectTotalQuantity} from "@/lib/features/cart/cartSlice";
import ThemeToggle from "@/app/components/theme/ThemeToggle";
import {CircleUserRound, ShoppingCart} from 'lucide-react';
import { Heart } from 'lucide-react';
import {addToFavorite, selectTotalFavProducts} from "@/lib/features/favoriteProducts/favoriteProductSlice";
import useCloseDrawer from "@/app/components/customHooks/useCloseDrawer";
import SideBarMenu from "@/app/components/sidebar/SideBarMenu";
import {login} from "@/lib/features/auth/authSlice";

export const Nav = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const auth = useAuth();
    const cartValue = useAppSelector(selectTotalQuantity);
    const favProds = useAppSelector(selectTotalFavProducts);
    const [searchKeyword,setSearchKeyword] = useState<string>("");

    const searchKeywordHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    const routeToKeywordPage = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.currentTarget.id === "search_keyword_navbar")
       {
           router.push(`/w/${searchKeyword}`);
           useCloseDrawer("search-bar-drawer");
       }
    }

    useEffect(()=>{
      const cookieToken = Cookies.get('cookieToken');
      const valueFromCart = localStorage.getItem('cartValue');
      const valueFromFavProds = localStorage.getItem('favProdsCount');

      if(cookieToken)
      {
          cookieToken && dispatch(login({token:cookieToken}));
          valueFromCart && dispatch(addToCartQuantity(+valueFromCart));
          valueFromFavProds && dispatch(addToFavorite(+valueFromFavProds));
      }
    },[auth,cartValue,favProds]);


    return (
        <nav className={styles.nav}>
            <SideBarMenu
                favProdsCount={favProds}
                cartValue={cartValue}
                searchKeyword={searchKeyword}
                searchKeywordHandlerAction={searchKeywordHandler}
                // routeToKeywordPageAction={routeToKeywordPage}
                login={auth}
            />

            <>
                <Link
                    className={`${styles.link} ${pathname === "/" ? styles.active : ""} hidden xl:block`}
                    href="/"
                >
                    HOME
                </Link>

                <Link
                    className={`${styles.link} ${pathname === `/men` ? styles.active : ""} hidden xl:block`}
                    href="/men"
                >
                    MEN
                </Link>

                <Link
                    className={`${styles.link} ${pathname === "/women" ? styles.active : ""} hidden xl:block`}
                    href="/women"
                >
                    WOMEN
                </Link>

                <Link
                    className={`${styles.link} ${pathname === "/kids" ? styles.active : ""} hidden xl:block`}
                    href="/kids"
                >
                    KIDS
                </Link>

                <div className=" hidden xl:block">
                    <label className="input input-bordered flex items-center gap-2 ">
                        <input
                            id="search_keyword_navbar"
                            value={searchKeyword}
                            onChange={searchKeywordHandler}
                            onKeyDown={routeToKeywordPage} type="text" className="grow"
                            placeholder="Search"/>
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

                <div className=" hidden xl:block">
                    <ThemeToggle/>
                </div>

                <Link
                    className={`${styles.link} ${pathname === "/userProfile" ? styles.active : ""} hidden xl:block`}
                    href="/userProfile"
                >
                    <CircleUserRound className=" hidden xl:block"/>
                </Link>

                {auth ?
                    <Link
                        className={`${styles.link} ${pathname === "/users/logout" ? styles.active : ""} text-center hidden xl:block`}
                        href="/users/logout"
                    >
                        LogOut
                    </Link> :
                    <Link
                        className={`${styles.link} ${pathname === "/users/login" ? styles.active : ""} text-center hidden xl:block`}
                        href="/users/login"
                    >
                        LogIn
                    </Link>}

                <Link
                    className={`${styles.link} ${pathname === "/favoriteProducts" ? styles.active : ""} hidden xl:block`}
                    href="/favoriteProducts"
                >
                    <div className=" relative">
                        <Heart className=" hidden xl:block text-current"/>
                        {(favProds > 0) &&
                            <span className="absolute top-0 right-0 -mt-2 -mr-3
                            bg-red-600 text-white text-xs font-bold rounded-full
                            h-5 w-5 flex items-center justify-center">
                                {(favProds > 9 ? "9+" : favProds)}
                           </span>}
                    </div>
                </Link>

                <Link
                    className={`${styles.link} ${pathname === "/cart" ? styles.active : ""} hidden xl:block`}
                    href="/cart"
                >
                    <div className=" relative">
                        <ShoppingCart className=" hidden xl:block"/>
                            {(cartValue > 0) && <span
                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {(cartValue > 9 ? "9+" : cartValue)}
                            </span>}
                    </div>
                </Link>
            </>
        </nav>
      );
};
