import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {BASE_URL} from "@/lib/features/products/productApiSlice";

export interface ProductInterfaceInCart {
    _id:string,
    name:string,
    image:string,
}

export interface ProductInCartInterface {
    _id:string,
    product:ProductInterfaceInCart,
    size:number,
    price:number,
    quantity:number,
    totalPrice:number
}

export interface CartInterface {
    _id:string,
    userId?:string,
    cart:ProductInCartInterface[],
    totalPriceInCart?:number,
    totalQuantityInCart?:number,
}

export const cartApiSlice = createApi({
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
    reducerPath:'cartApi',
    tagTypes:['Cart'],
    endpoints:(build)=>({
        addToCart:build.mutation<CartInterface,{product:string,size:number}>({
            query:(product:{product:string,size:number})=>({
                url:`cart`,
                method:'POST',
                body:product,
            }),
            async onQueryStarted(product:{product:string,size:number},{dispatch,queryFulfilled}){

                try
                {
                    const {data:addedProduct} = await queryFulfilled;

                    const patchResult = dispatch(
                        cartApiSlice.util.updateQueryData(
                            "getCartByUser",undefined,
                            (draft)=>{
                                draft.cart = addedProduct.cart;
                                draft.totalPriceInCart = addedProduct.totalPriceInCart;
                                draft.totalQuantityInCart = addedProduct.totalQuantityInCart;
                            }
                        )
                    )
                }
                catch(err){}
            }
        }),
        getCartByUser:build.query<CartInterface,undefined>({
            query:()=>`cart`
        }),
        removeFromCart:build.mutation<CartInterface,{product:string,size:number}>({
            query:(product:{product:string,size:number})=>({
                url:'cart',
                method:'DELETE',
                body:product
            }),
            async onQueryStarted(product:{product:string,size:number},{dispatch,queryFulfilled}){

                try
                {
                    const {data:removedProduct} = await queryFulfilled;

                    const patchResult = dispatch(
                        cartApiSlice.util.updateQueryData(
                            'getCartByUser',undefined,
                            (draft)=>{
                                draft.cart = removedProduct.cart;
                                draft.totalPriceInCart = removedProduct.totalPriceInCart;
                                draft.totalQuantityInCart = removedProduct.totalQuantityInCart;
                            }
                        )
                    )
                }
                catch(err){}
            }
        }),
        deleteCart:build.mutation<CartInterface,undefined>({
            query:()=>({
                url:`cart/deleteCart`,
                method:'DELETE'
            }),
            async onQueryStarted(undefined,{dispatch,queryFulfilled}){
                try
                {
                    const {data:deletedCart} = await queryFulfilled;

                    const patchResult = dispatch(
                        cartApiSlice.util.updateQueryData(
                            'getCartByUser',undefined,
                            (draft)=>{
                                draft.cart = [];
                            }
                        )
                    )
                }
                catch(err){}
            }
        })
    })
})

export const {useAddToCartMutation,useGetCartByUserQuery,useRemoveFromCartMutation,useDeleteCartMutation} = cartApiSlice