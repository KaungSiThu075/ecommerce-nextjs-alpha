"use client";
import {ProductReviewInterface, useUpdateReviewMutation} from "@/lib/features/productReviews/productReviewsApiSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { reviewSchema} from "@/app/components/schema/review";
import {useEffect, useMemo, useState} from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function ProductReviewUpdateForm({review}:{review:ProductReviewInterface}){
    const [updateReviewApi,updateReviewResult] = useUpdateReviewMutation();
    const [rating, setRating] = useState(review.rating);
    const {register,handleSubmit,reset} = useForm({resolver:zodResolver(reviewSchema), defaultValues:review});

    const reviewUpdateFormHandler = (data:any)=> {
        const formData = {...review,rating,review:data.review}

        updateReviewApi(formData).unwrap().then(data=>{
            console.log('data from server ',data);
            reset();
            (document.getElementById(`${review._id}_edit`) as HTMLDialogElement).close();
        })
    }

    useEffect(()=>{
        reset(review);
    },[review,reset]);

    return (
        <div>
            <form className=" flex flex-col items-start justify-center gap-3 my-4" onSubmit={handleSubmit(reviewUpdateFormHandler)}>
                <Rating
                    value={rating}
                    onChange={setRating}
                />

                <textarea
                    className="w-full textarea textarea-bordered"
                    {...register("review")}
                ></textarea>

                <button
                    className=" btn"
                    type={"submit"}
                >
                    UPDATE
                </button>
            </form>
        </div>
    )
}
