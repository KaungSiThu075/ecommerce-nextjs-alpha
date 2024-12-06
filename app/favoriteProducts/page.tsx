"use client";
import IsAuth from "@/app/components/auth/IsAuth";
import {useGetAllFavoriteProductsQuery} from "@/lib/features/favoriteProducts/favoriteProductApiSlice";
import FavoriteProductList from "@/app/components/favoriteProduct/FavoriteProductList";
import DataFetching from "@/app/components/fetch/DataFetching";
import NoProductPage from "@/app/components/product/NoProductPage";

function Page(){
    const {data:favoriteProductStructure,isError,isFetching,isLoading,isSuccess} = useGetAllFavoriteProductsQuery(undefined)

    return (
        <div className="flex flex-col items-start justify-center">
            <DataFetching
                isFetching={isFetching}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {(favoriteProductStructure && !isFetching) && (
                    favoriteProductStructure.favoriteProducts.length > 0 ?
                        <FavoriteProductList products={favoriteProductStructure.favoriteProducts}/> :
                        <NoProductPage/>
                )}
            </DataFetching>
        </div>
    )
}

export default IsAuth(Page);