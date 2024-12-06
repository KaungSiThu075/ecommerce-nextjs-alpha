import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL, ProductInterface} from "@/lib/features/products/productApiSlice";
import Cookies from "js-cookie";

export interface favoriteProductsList {
    product:ProductInterface;
    _id?:string
}

export interface FavoriteProductsInterface {
    _id?:string,
    userId:string,
    favoriteProducts:[favoriteProductsList],
    totalProducts:number
}

export const favoriteProductApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL,
    prepareHeaders:(headers, {getState})=>{
        const state:any = getState();

        const cookieToken = Cookies.get('cookieToken');

        if(cookieToken)
        {
            headers.set('Authorization',`Bearer `+cookieToken)
        }
        return headers;
    }}),
    reducerPath:'favoriteProductApi',
    tagTypes:['FavoriteProducts'],
    endpoints:(build)=>({
        addToFavoriteProducts:build.mutation<FavoriteProductsInterface,{product:string}>({
            query:(productId:{product:string})=>({
                url:`favoriteProducts`,
                method:'POST',
                body:productId
            }),
            async onQueryStarted(productId:{product:string},{dispatch,queryFulfilled}){

                try
                {
                    const {data:addedProduct} = await queryFulfilled;

                    const patchResult = dispatch(
                        favoriteProductApiSlice.util.updateQueryData(
                            'getAllFavoriteProducts',undefined,
                            (draft)=>{
                                draft.favoriteProducts = addedProduct.favoriteProducts;
                                return draft;
                            }
                        )
                    )
                }
                catch(err){}
            }
        }),
        removeFromFavoriteProducts:build.mutation<FavoriteProductsInterface,{product:string}>({
            query:(productId:{product:string})=>({
                url:`favoriteProducts`,
                method:'DELETE',
                body:productId
            }),
            async onQueryStarted(productId:{product:string},{dispatch,queryFulfilled}){

                try
                {
                    const {data:removedProduct} = await queryFulfilled;

                    const patchResult = dispatch(
                        favoriteProductApiSlice.util.updateQueryData(
                            'getAllFavoriteProducts',undefined,
                            (draft)=>{
                                draft.favoriteProducts = removedProduct.favoriteProducts;
                                return draft;
                            }
                        )
                    )
                }
                catch(err){}
            }
        }),
        getAllFavoriteProducts:build.query<FavoriteProductsInterface,undefined>({
            query:()=>`favoriteProducts`
        })
    })
});

export const {useAddToFavoriteProductsMutation,useGetAllFavoriteProductsQuery,useRemoveFromFavoriteProductsMutation} = favoriteProductApiSlice