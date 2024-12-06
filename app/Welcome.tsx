"use client";

import {useGetAllProductsQuery} from "@/lib/features/products/productApiSlice";
import ProductList from "@/app/components/product/ProductList";
import { useState} from "react";
import Pagination from "@/app/components/pagination/Pagination";
import PriceSorting from "@/app/components/sort/PriceSorting";
import DataFetching from "@/app/components/fetch/DataFetching";
import { useSearchParams} from "next/navigation";

export default function Welcome(){
    const searchParams = useSearchParams();

    const pageForUse =  Number(searchParams.get("page")) || 1;

    const [sort,setSort] = useState<string>("");

    const {data:productsStructure,isError,isFetching,isLoading,isSuccess} = useGetAllProductsQuery({pageForUse,sort});

    return(
        <>
            <DataFetching
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {(productsStructure && !isFetching) && (
                    <>
                        <PriceSorting sort={sort} setSortAction={setSort}/>

                        <ProductList products={productsStructure.products}/>

                        <Pagination
                            totalPages={productsStructure.totalPages}
                            page={pageForUse}
                        />
                    </>
                )}
            </DataFetching>
        </>
    )
};
