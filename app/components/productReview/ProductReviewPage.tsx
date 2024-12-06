"use client";
import {useGetReviewsByProductIdQuery} from "@/lib/features/productReviews/productReviewsApiSlice";
import ProductReviewList from "@/app/components/productReview/ProductReviewList";
import DataFetching from "@/app/components/fetch/DataFetching";

export default function ProductReviewPage({productId}: {productId: string}) {
    const {data:reviewsByProductId,isError,isFetching,isLoading,isSuccess} =useGetReviewsByProductIdQuery(productId);

    return (
        <>
            <DataFetching
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {reviewsByProductId && <ProductReviewList reviews={reviewsByProductId}/>}
            </DataFetching>
        </>
    )

}