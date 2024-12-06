import {ProductReviewInterface} from "@/lib/features/productReviews/productReviewsApiSlice";
import ProductReviewItem from "@/app/components/productReview/ProductReviewItem";

export default function ProductReviewList({reviews}:{reviews:ProductReviewInterface[]}){
    return(
        <div>
            {reviews.map(review=><ProductReviewItem key={review._id} review={review}/>)}
        </div>
    )
}