"use client";
import {
    ProductInCartInterface,
    useAddToCartMutation,
    useRemoveFromCartMutation
} from "@/lib/features/cart/cartApiSlice";
import {Trash2} from "lucide-react";
import {useAppDispatch} from "@/lib/hooks";
import {addToCartQuantity} from "@/lib/features/cart/cartSlice";

export default function ProductDetailInCart({product}:{product:ProductInCartInterface}){
    const [addToCartApi,addToCartResult] = useAddToCartMutation();
    const [removeFromCartApi,removeFromCartResult] = useRemoveFromCartMutation();

    const dispatch = useAppDispatch();

    const addToCartHandler = (product:string,size:number) => {
        const dataForServer = {product,size};

        addToCartApi(dataForServer).unwrap().then(data=>{
            localStorage.setItem('cartValue',`${data.totalQuantityInCart}`);
            dispatch(addToCartQuantity(data.totalQuantityInCart as number));
        });
    }

    const removeFromCartHandler = (product:string,size:number) => {
        const dataForServer = {product,size};

        removeFromCartApi(dataForServer).unwrap().then(data=>{
            localStorage.setItem('cartValue',`${data.totalQuantityInCart}`);
            dispatch(addToCartQuantity(data.totalQuantityInCart as number));
        })
    }

    return(
        <div className=" border-b border-black py-2">
            <div className=" flex items-center gap-3">
                <img
                    className=" w-[100px] h-[100px] rounded"
                    src={product.product.image}
                    alt={product.product.name}
                />
                <div>
                    <p>{product.product.name}</p>
                    <p>Size - {product.size}</p>
                    <p className=" font-semibold">$ {product.totalPrice}</p>
                </div>
            </div>

            <div className=" flex items-center justify-start gap-3 mt-3">
                <button
                    className=" btn "
                    type={"button"}
                    onClick={() => removeFromCartHandler(product.product._id, product.size)}
                >
                    {product.quantity === 1 ? <Trash2/> : '-'}
                </button>

                <p className=" font-semibold">{product.quantity}</p>

                <button
                    onClick={() => addToCartHandler(product.product._id, product.size)}
                    type={"button"}
                    className={'btn'}
                >
                    +
                </button>
            </div>
        </div>
    )
}