import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {ProductInCartInterface} from "@/lib/features/cart/cartApiSlice";
import {BASE_URL} from "@/lib/features/products/productApiSlice";

interface OrderInterface {
    _id:string,
    userId?:string,
    cart:ProductInCartInterface[],
    totalPriceInCart?:number,
    totalQuantityInCart?:number,
    payment:string
}

export const orderApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL,
        prepareHeaders:(headers,{getState})=>{
            const state : any = getState();
            const cookieToken = Cookies.get('cookieToken');

            if(cookieToken)
            {
                headers.set('Authorization','Bearer '+cookieToken);
            }

            return headers;
        }}),
    reducerPath:'orderApi',
    tagTypes:['Order'],
    endpoints:(build)=>({
        createOrder:build.mutation<OrderInterface,OrderInterface>({
            query:(order:OrderInterface)=>({
                url:`orders`,
                method:'POST',
                body:order
            })
        })
    })
})

export const {useCreateOrderMutation} = orderApiSlice