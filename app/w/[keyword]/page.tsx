"use client";
import React,{use} from "react";
import {useGetProductsByKeywordQuery} from "@/lib/features/products/productApiSlice";
import ProductList from "@/app/components/product/ProductList";
import DataFetching from "@/app/components/fetch/DataFetching";
import NoProductPage from "@/app/components/product/NoProductPage";

export default function Page({params}:{params:Promise<{ keyword: string }>}){

    const {keyword} = use(params);

    const decodedKeyword = decodeURIComponent(keyword);

    const {data:products,isError,isFetching,isLoading,isSuccess} = useGetProductsByKeywordQuery(keyword);

    return(
        <>
            <DataFetching isFetching={isFetching} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <p className="my-5 text-lg">Products by search <b>"{decodedKeyword}"</b></p>
                {(products && !isFetching) && (
                    <>
                        {products.length ?
                            <ProductList products={products}/> :
                            <NoProductPage/>}
                    </>
                )}
            </DataFetching>
        </>
    )
}