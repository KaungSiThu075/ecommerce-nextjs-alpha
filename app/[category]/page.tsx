"use client";
import {useGetProductsByCategoryQuery} from "@/lib/features/products/productApiSlice";
import React, {use, useState} from "react";
import ProductList from "@/app/components/product/ProductList";
import PriceSorting from "@/app/components/sort/PriceSorting";
import Pagination from "@/app/components/pagination/Pagination";
import DataFetching from "@/app/components/fetch/DataFetching";
import {useSearchParams} from "next/navigation";

export default function Page ({params}:{params:Promise<{category:string}>}){
    const searchParams = useSearchParams();

    const {category} = use(params);

    const pageForUse = Number(searchParams.get("page")) || 1;

    const [sort,setSort] = useState<string>("");

    const {data:productsByCategoryStructure,isError,isFetching,isLoading,isSuccess} = useGetProductsByCategoryQuery({category,pageForUse,sort});

    return (
        <>
            <DataFetching isError={isError} isFetching={isFetching} isLoading={isLoading} isSuccess={isSuccess}>

                {(productsByCategoryStructure && !isFetching) && (
                    <>
                        <PriceSorting
                            sort={sort}
                            setSortAction={setSort}
                        />

                        <ProductList
                            products={productsByCategoryStructure.products}
                        />

                        <Pagination
                            totalPages={productsByCategoryStructure.totalPages}
                            page={pageForUse}
                        />
                    </>
                )}
            </DataFetching>
        </>
    )
}
