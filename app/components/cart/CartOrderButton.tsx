"use client";
import {CartInterface} from "@/lib/features/cart/cartApiSlice";
import ModalDiaLog from "@/app/components/modalDialog/ModalDiaLog";
import CartDeleteForm from "@/app/components/form/cart/CartDeleteForm";
import OrderCreateForm from "@/app/components/form/order/OrderCreateForm";

export default function CartOrderButton({cartByUser}:{cartByUser:CartInterface}){
    return (
        <div className=" flex flex-col items-start justify-center gap-2">
            <p className=" font-bold text-2xl">Summary</p>
            <p>Total Quantity - {cartByUser.totalQuantityInCart}</p>
            <p>Subtotal - ${cartByUser.totalPriceInCart}</p>

            <div className=" flex items-center justify-start gap-3">
                <button
                    type={"button"}
                    className={'btn'}
                    onClick={() => (document.getElementById(`${cartByUser._id}_deleteCart`) as HTMLDialogElement)
                        .showModal()}
                >
                    DELETE
                </button>

                <ModalDiaLog id={`${cartByUser._id}_deleteCart`}>
                    <CartDeleteForm/>
                </ModalDiaLog>

                <button
                    type={"button"}
                    className={'btn btn-neutral'}
                    onClick={() => (document.getElementById(`${cartByUser._id}_order`) as HTMLDialogElement)
                        .showModal()}
                >
                    ORDER
                </button>

                <ModalDiaLog id={`${cartByUser._id}_order`}>
                    <OrderCreateForm cart={cartByUser}/>
                </ModalDiaLog>
            </div>
        </div>
    )
}