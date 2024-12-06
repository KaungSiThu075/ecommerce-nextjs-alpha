"use client";
import {useDeleteCartMutation} from "@/lib/features/cart/cartApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {addToCartQuantity} from "@/lib/features/cart/cartSlice";

export default function CartDeleteForm(){
    const [deleteCartApi,deleteCartResult] = useDeleteCartMutation();
    const dispatch =useAppDispatch();

    const deleteCartHandler = () => {
        deleteCartApi(undefined).unwrap().then(data => {
            dispatch(addToCartQuantity(0));
            localStorage.setItem('cartValue','0');
        })
    }
    return(
        <div className=" flex flex-col items-start justify-center gap-2">
            <h3 className=" text-lg font-semibold">You sure to delete cart?</h3>
            <button onClick={deleteCartHandler} type={"button"} className={'btn'}>DELETE</button>
        </div>
    )
}