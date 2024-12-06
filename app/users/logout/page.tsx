"use client";
import {useAppDispatch} from "@/lib/hooks";
import Cookies from "js-cookie";
import {logout} from "@/lib/features/auth/authSlice";
import {favoriteProductApiSlice} from "@/lib/features/favoriteProducts/favoriteProductApiSlice";
import {productReviewsApiSlice} from "@/lib/features/productReviews/productReviewsApiSlice";
import {userProfileApiSlice} from "@/lib/features/userProfiles/userProfileApiSlice";
import ModalDiaLog from "@/app/components/modalDialog/ModalDiaLog";
import {useRouter} from "next/navigation";

export default function Page(){
    const dispatch = useAppDispatch();

    const router = useRouter();

    const btnLogOutHandler = () => {
        Cookies.remove("cookieToken");
        dispatch(logout());
        dispatch(favoriteProductApiSlice.util.resetApiState());
        dispatch(productReviewsApiSlice.util.resetApiState());
        dispatch(userProfileApiSlice.util.resetApiState());
        location.replace('/');
    }
    return(
        <div className=" flex flex-col items-center justify-center gap-5">
            <h3 className=" font-semibold">This is Log Out Page</h3>
            <button
                onClick={()=>(document.getElementById('log_out_dialog') as HTMLDialogElement).showModal()}
                className={"btn"}
                type={"button"}
            >
                Log Out
            </button>

            <ModalDiaLog id={`log_out_dialog`}>
                <div className=" flex flex-col items-start justify-center gap-2">
                    <h3 className="font-semibold">You sure to Log Out???</h3>
                    <button onClick={btnLogOutHandler} className=" btn">Log Out</button>
                </div>
            </ModalDiaLog>
        </div>
    )
}