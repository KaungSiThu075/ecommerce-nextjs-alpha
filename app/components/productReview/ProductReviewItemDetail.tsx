"use client";
import {ProductReviewInterface} from "@/lib/features/productReviews/productReviewsApiSlice";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import ThemeButton from "@/app/components/button/ThemeButton";

export default function ProductReviewItemDetail({review}:{review:ProductReviewInterface}){

    return(
        <div>
            <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly={true}
            />
            <ThemeButton>
                {review.review}
            </ThemeButton>
        </div>
    )
}