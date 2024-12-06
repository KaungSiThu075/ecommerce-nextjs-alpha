"use client";
import {ProductReviewInterface} from "@/lib/features/productReviews/productReviewsApiSlice";
import ModalDiaLog from "@/app/components/modalDialog/ModalDiaLog";
import {useState,useEffect} from "react";
import ProductReviewUpdateForm from "@/app/components/form/review/ProductReviewUpdateForm";
import ProductReviewItemDetail from "@/app/components/productReview/ProductReviewItemDetail";
import ProductReviewDeleteForm from "@/app/components/form/review/ProductReviewDeleteForm";
import UserProfileForReview from "@/app/components/profile/UserProfileForReview";
import DefaultUserProfileForReview from "@/app/components/profile/DefaultUserProfileForReview";
import useAuth from "@/lib/features/auth/authHook";
import Cookies from "js-cookie";

export default function ProductReviewItem({review}:{review:ProductReviewInterface}){

    const auth = useAuth();

    return(
        <div className=" border-b border-gray-200 py-2">
            {(review.user.profileCreated) &&
                <UserProfileForReview user={review.user.userProfile!}/>}

            {(!review.user.profileCreated) &&
                <DefaultUserProfileForReview userId={review.user._id as string}/>}

            <ProductReviewItemDetail review={review}/>

            {auth && <div className=" flex items-center justify-start gap-3 mt-2">
                <button
                    className="btn"
                    onClick={() => (document.getElementById(`${review._id}_edit`) as HTMLDialogElement).showModal()}
                >
                    EDIT
                </button>

                <ModalDiaLog id={`${review._id}_edit`}>
                    <ProductReviewUpdateForm review={review}/>
                </ModalDiaLog>

                <button
                    className="btn"
                    onClick={() => (document.getElementById(`${review._id}_delete`) as HTMLDialogElement).showModal()}
                >
                    DELETE
                </button>

                <ModalDiaLog id={`${review._id}_delete`}>
                    <ProductReviewDeleteForm review={review}/>
                </ModalDiaLog>
            </div>}
        </div>
    )
}