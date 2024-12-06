"use client";
import {ProductInterface} from "@/lib/features/products/productApiSlice";
import {useAddToCartMutation} from "@/lib/features/cart/cartApiSlice";
import React, { useState} from "react";
import ModalDiaLog from "@/app/components/modalDialog/ModalDiaLog";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {addToCartQuantity} from "@/lib/features/cart/cartSlice";
import BackToPreviousPageButton from "@/app/components/button/BackToPreviousPageButton";
import FavoriteListButton from "@/app/components/button/FavoriteListButton";
import AddNewReviewButton from "@/app/components/button/AddNewReviewButton";
import {
    useAddToFavoriteProductsMutation,
    useGetAllFavoriteProductsQuery, useRemoveFromFavoriteProductsMutation
} from "@/lib/features/favoriteProducts/favoriteProductApiSlice";
import {addToFavorite, removeFromFavorite} from "@/lib/features/favoriteProducts/favoriteProductSlice";
import useAuth from "@/lib/features/auth/authHook";

export default function ProductDetailItem({product,productIdForUse}:{product:ProductInterface,productIdForUse:string}){
    const [addToCartApi,addToCartResult] = useAddToCartMutation();

    const auth = useAuth();

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [selectedSize,setSelectedSize]=useState<null | number>(null);

    const [imageOnLoad,setImageOnLoad] = useState(true);

    const { favoriteProduct } = useGetAllFavoriteProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            favoriteProduct: data?.favoriteProducts?.some
            ((d) => {
                return  d.product._id === productIdForUse
            }),
        }),
    });

    const [addToFavoriteProductsApi,addToFavoriteProductsResult] =
        useAddToFavoriteProductsMutation();

    const [removeFromFavoriteProductsApi,removeFromFavoriteProductsResult] =
        useRemoveFromFavoriteProductsMutation();

    const addToCartHandler = () => {
        if(auth)
        {
            if(selectedSize)
            {
                const dataForServer = {product:product._id as string,size:selectedSize as number};
                addToCartApi(dataForServer).unwrap().then(data=>{
                    localStorage.setItem("cartValue",`${data.totalQuantityInCart}`);
                    dispatch(addToCartQuantity(data.totalQuantityInCart as number));
                    (document.getElementById(`${product._id}_toCart`)as HTMLDialogElement).showModal();
                });
            }
            else
            {
                (document.getElementById(`${product._id}_addToCartError`) as HTMLDialogElement).showModal();
            }
        }
        else
        {
            router.push(`/users/login`);
        }
    }

    const btnFavoriteProductsHandler = () => {
        if(auth)
        {
            if(favoriteProduct)
            {
                removeFromFavoriteProductsApi({product: productIdForUse}).unwrap().then(data => {
                    localStorage.setItem('favProdsCount', `${data.favoriteProducts.length}`);
                    dispatch(removeFromFavorite(data.favoriteProducts.length));
                })
            }
            else
            {
                addToFavoriteProductsApi({product: productIdForUse}).unwrap().then(data => {
                    localStorage.setItem('favProdsCount', `${data.favoriteProducts.length}`);
                    dispatch(addToFavorite(data.favoriteProducts.length));
                })
            }
        }
        else
        {
            router.push(`/users/login`);
        }
    }

    return(
        <div>
            <BackToPreviousPageButton/>

            <div className=" xl:flex xl:items-start xl:justify-center xl:gap-5">
                <div>
                    {imageOnLoad && <div className="skeleton 3xs:w-[350px] 3xs:h-[350px] 2xs:w-[500px] 2xs:h-[500px]  xs:w-[600px] xs:h-[600px] lg:w-[400px] lg:h-[500px]"></div>}
                    <img
                        onLoad={() => setImageOnLoad(false)}
                        className=" 3xs:w-full 3xs:h-full rounded-lg xl:w-[800px] xl:h-[800px]"
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                <div className=" xl:w-[800px] xl:h-[800px]">
                    <p className=" font-bold text-3xl my-1">{product.name}</p>
                    <p className=" text-lg">Brand - {product.brand}</p>
                    <p className=" uppercase">{product.category} shoe</p>
                    <p className=" font-bold text-xl">$ {product.price}</p>

                    <div className=" my-2">
                        <p className=" font-semibold text-2xl">Description</p>
                        <p>{product.description}</p>
                    </div>

                    <div className=" my-2">
                        <p className=" font-semibold text-2xl">Details</p>
                        {product.details.map((d, i) => <p key={i}>- {d}</p>)}
                    </div>

                    <p className="font-semibold text-2xl my-2">Sizes</p>
                    <div className="4xs:flex 4xs:flex-col 4xs:justify-center 4xs:gap-1 3xs:grid 3xs:grid-cols-2 3xs:gap-2 2xs:grid-cols-3 xs:grid-cols-4">
                        {product.size.map(((size) =>
                            <button
                                className={selectedSize === size ? 'btn btn-neutral' : 'btn'}
                                type={"button"}
                                key={size}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>))}
                    </div>
                    <button
                        type={"button"}
                        className={'btn w-full my-2'}
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </button>

                    <ModalDiaLog id={`${product._id}_addToCartError`}>
                        <p className=" text-lg font-semibold">Please select size first</p>
                    </ModalDiaLog>

                    <ModalDiaLog id={`${product._id}_toCart`}>
                        <div className=" flex flex-col items-start justify-center gap-2">
                            <p>You successfully added to Cart</p>
                            <button className={'btn'} type={"button"} onClick={() => {
                                router.push(`/cart`)
                            }}>Go to Cart
                            </button>
                        </div>
                    </ModalDiaLog>

                    <div className=" grid grid-cols-4 gap-3">

                        <button
                            className="btn col-span-3"
                            onClick={() => (document.getElementById(`add_new_review_dialog`) as HTMLDialogElement).showModal()}
                        >
                            Add Review
                        </button>

                        <FavoriteListButton
                            btnFavoriteProductsHandler={btnFavoriteProductsHandler}
                            favoriteProduct={favoriteProduct}
                        />

                    </div>

                    <ModalDiaLog id={`add_new_review_dialog`}>
                        <AddNewReviewButton productId={productIdForUse}/>
                    </ModalDiaLog>
                </div>
            </div>
        </div>
    )
}