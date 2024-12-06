"use client"
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import { usePathname } from 'next/navigation';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {login, selectAuth} from "@/lib/features/auth/authSlice";
import Cookies from "js-cookie";
import {addToCartQuantity, selectTotalQuantity} from "@/lib/features/cart/cartSlice";
import {addToFavorite,selectTotalFavProducts} from "@/lib/features/favoriteProducts/favoriteProductSlice";
function IsAuth<T>(Component: React.ComponentType<T>) {
    return (props: T) => {

        const router = useRouter();
        const auth = useAppSelector(selectAuth);
        const cartValue = useAppSelector(selectTotalQuantity);
        const favProdsValue = useAppSelector(selectTotalFavProducts);
        const dispatch = useAppDispatch();
        const pathname = usePathname();

        useEffect(()=>{
            const cookieToken = Cookies.get('cookieToken');
            const cartValue = localStorage.getItem("cartValue");
            const favProdsCount = localStorage.getItem("favProdsCount");

            if (!cookieToken)
            {
                router.push('/users/login?redirectUrl='+pathname);
            }
            else
            {
                dispatch(login({token:cookieToken}));
                cartValue && dispatch(addToCartQuantity(+cartValue));
                favProdsCount && dispatch(addToFavorite(+favProdsCount));
            }
        },[cartValue,auth,favProdsValue]);

        return (
            <>
                <Component {...props!} />
            </>
        );
    };
}

export default IsAuth;