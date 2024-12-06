"use client";
import {ProductReviewInterface, useDeleteReviewMutation} from "@/lib/features/productReviews/productReviewsApiSlice";

export default function ProductReviewDeleteForm({review}:{review:ProductReviewInterface}){

    const [deleteReviewApi,deleteReviewResult] = useDeleteReviewMutation();

    const btnReviewDeleteHandler = () => {
        deleteReviewApi(review).unwrap().then(data=>{
            (document.getElementById(`${review._id}_delete`) as HTMLDialogElement).close();
        });
    }
    return(
        <div className="flex flex-col items-center justify-center gap-3 ">
            <h3 className=" font-semibold text-2xl">You sure to delete?</h3>
            <button className={"btn"} type={'button'} onClick={btnReviewDeleteHandler}>DELETE</button>
        </div>
    )
}