"use client";
import {CartInterface} from "@/lib/features/cart/cartApiSlice";
import {useCreateOrderMutation} from "@/lib/features/order/orderApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {addToCartQuantity} from "@/lib/features/cart/cartSlice";
import React, {useState} from "react";
import ShowDialog from "@/app/components/modalDialog/ShowDialog";
import {useRouter} from "next/navigation";

export default function OrderCreateForm({cart}:{cart:CartInterface}){
    const [createOrderApi,createOrderResult] = useCreateOrderMutation();
    console.log('cart for order ',cart);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const [orderPayment,setOrderPayment] = useState('');

    const payments = [
        { id: "KBZpay_01",name:"KBZPay", src: "/kbzpay.jpg", alt: "KBZPayLogo"},
        { id: "CBpay_02",name:"CBPay" ,src: "/cbpay.jpg", alt: "CBPayLogo" },
        { id: "AYApay_03",name:"AYAPay" ,src: "/ayapay.jpg", alt: "AYAPayLogo" },
        { id: "YOMApay_04",name:"YOMAPay" ,src: "/yomapay.jpg", alt: "YOMAPayLogo" },
    ]

    const paymentHandler = (name:string) => {
        setOrderPayment(name);
    }

    const orderHandler = () => {
        const orderData = {...cart,payment:orderPayment}

        createOrderApi(orderData).unwrap().then(data=>{
            localStorage.setItem('cartValue','0');
            dispatch(addToCartQuantity(0));
            (document.getElementById(`${cart._id}_order`) as HTMLDialogElement).close();
            (document.getElementById(`${cart._id}_order_Success`) as HTMLDialogElement).showModal();
            setTimeout(()=>{
                (document.getElementById(`${cart._id}_order_Success`) as HTMLDialogElement).close();
                 location.replace('/');
            },1000)
        })
    }

    return(
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-semibold text-lg">Choose Payment Method</p>
            <div className=" grid grid-cols-2 gap-3">
                {payments.map(payment=><img
                    key={payment.id}
                    onClick={()=>paymentHandler(payment.name)}
                    className={`w-[50px] h-[50px] rounded cursor-pointer ${orderPayment === payment.name ? "border-2 border-violet-800 rounded-lg" : ""}`}
                    src={payment.src}
                    alt={payment.alt}
                />)}
            </div>

            <button className=" btn mt-3" onClick={orderHandler}>ORDER</button>

            <ShowDialog id={`${cart._id}_order_Success`}>
                <p>You Successfully Ordered!!!</p>
            </ShowDialog>
        </div>
    )
}