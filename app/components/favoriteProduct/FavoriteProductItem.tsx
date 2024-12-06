import {ProductInterface} from "@/lib/features/products/productApiSlice";
import React, {useEffect, useState} from "react";
import {
    useGetAllFavoriteProductsQuery,
    useRemoveFromFavoriteProductsMutation
} from "@/lib/features/favoriteProducts/favoriteProductApiSlice";
import FavoriteListButton from "@/app/components/button/FavoriteListButton";
import Alert from "@/app/components/alert/Alert";
import {removeFromFavorite} from "@/lib/features/favoriteProducts/favoriteProductSlice";
import {useAppDispatch} from "@/lib/hooks";

export default function FavoriteProductItem({product}:{product:ProductInterface}){

    const dispatch = useAppDispatch();

    const { favoriteProduct } = useGetAllFavoriteProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            favoriteProduct: data?.favoriteProducts?.some
            ((d) => {
                return   d.product._id === product._id
            }),
        }),
    });

    const [removeFromFavoriteProductsApi,removeFromFavoriteProductsResult] =
        useRemoveFromFavoriteProductsMutation();

    const btnFavoriteProductsHandler = () => {
        removeFromFavoriteProductsApi({product:product._id as string}).
        unwrap().then(data=>{
            localStorage.setItem('favProdsCount',`${data.favoriteProducts.length}`);
            dispatch(removeFromFavorite(data.favoriteProducts.length));
        })
    }

    return(
        <div className=" flex flex-col items-start justify-center gap-2 my-2">
            <img className=" 3xs:w-[200px] 3xs:h-[200px] rounded" src={product.image} alt={product.name}/>
            <p>{product.name}</p>
            <p className=" font-bold">$ - {product.price}</p>

            <FavoriteListButton
                btnFavoriteProductsHandler={btnFavoriteProductsHandler}
                favoriteProduct={favoriteProduct}
            />
        </div>
    )
}