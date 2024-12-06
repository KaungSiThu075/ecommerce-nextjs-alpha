"use client";
import IsAuth from "@/app/components/auth/IsAuth";
import {useGetCartByUserQuery} from "@/lib/features/cart/cartApiSlice";
import DataFetching from "@/app/components/fetch/DataFetching";
import ProductListInCart from "@/app/components/cart/ProductListInCart";
import CartOrderButton from "@/app/components/cart/CartOrderButton";
import NoProductPage from "@/app/components/product/NoProductPage";

function page(){
    const {data:cartByUser,isError,isFetching,isLoading,isSuccess} = useGetCartByUserQuery(undefined);

    return (
        <>
            <DataFetching
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {(cartByUser && !isFetching) && (
                    cartByUser.cart.length ?
                        <div className=" mt-3 md:flex md:items-start md:justify-center gap-10">
                            <ProductListInCart productList={cartByUser.cart}/>
                            <CartOrderButton cartByUser={cartByUser}/>
                        </div> :
                        <NoProductPage/>
                )}
            </DataFetching>
        </>
    )
}

export default IsAuth(page);