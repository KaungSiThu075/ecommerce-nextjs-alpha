import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {UserInterface} from "@/lib/features/auth/authApiSlice";
import {BASE_URL} from "@/lib/features/products/productApiSlice";

export interface ProductReviewInterface {
    _id?:string,
    user:UserInterface,
    product:string,
    rating:number,
    review:string
}

export const productReviewsApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL,
        prepareHeaders:(headers, {getState})=>{
            const state:any = getState();

            const cookieToken = Cookies.get('cookieToken');

            if(cookieToken)
            {
                headers.set('Authorization',`Bearer `+cookieToken)
            }
            return headers;
        }}),
    reducerPath:'productReviewsApi',
    tagTypes:['ProductReviews'],
    endpoints:(build)=>({
        getReviewsByProductId:build.query<ProductReviewInterface[],string>({
            query:(productId:string)=>`productReviews/product/${productId}`
        }),
        addNewReview:build.mutation<ProductReviewInterface,Partial<ProductReviewInterface>>({
            query:(review:Partial<ProductReviewInterface>)=>({
                url:`productReviews`,
                method:'POST',
                body:review
            }),
            async onQueryStarted(review:Partial<ProductReviewInterface>,{dispatch,queryFulfilled}){

                try
                {
                    const {data:addedReview} = await queryFulfilled;

                    const patchResult = dispatch(
                        productReviewsApiSlice.util.updateQueryData(
                            'getReviewsByProductId',review.product as string,
                            (draft)=>{
                                draft.push(addedReview);
                                return draft;
                            }
                        )
                    )
                }
                catch (err){}
            }
        }),
        updateReview:build.mutation<ProductReviewInterface,Partial<ProductReviewInterface>>({
            query:(review:Partial<ProductReviewInterface>)=>({
                url:`productReviews/${review._id}`,
                method:'PUT',
                body:review
            }),
            async onQueryStarted(review:Partial<ProductReviewInterface>,{dispatch,queryFulfilled}){

                try
                {
                    const {data:updatedReview} = await queryFulfilled;

                    const patchResult = dispatch(
                        productReviewsApiSlice.util.updateQueryData(
                            'getReviewsByProductId',review.product as string,
                            (draft)=>{
                                draft = draft.map(r=>r._id===review._id?updatedReview:r);
                                return draft;
                            }
                        )
                    )
                }
                catch (err){}
            }
        }),
        deleteReview:build.mutation<ProductReviewInterface,Partial<ProductReviewInterface>>({
            query:(review:Partial<ProductReviewInterface>)=>({
                url:`productReviews/${review._id}`,
                method:'DELETE',
            }),
            async onQueryStarted(review:Partial<ProductReviewInterface>,{dispatch,queryFulfilled}){

                try
                {
                    const {data:deletedReview} = await queryFulfilled;
                    const patchResult = dispatch(
                        productReviewsApiSlice.util.updateQueryData(
                            'getReviewsByProductId',review.product as string,(draft)=>{
                                draft = draft.filter(r=>r._id !== deletedReview._id);
                                return draft;
                            }
                        )
                    )
                }
                catch(err){}
            }
        })
    })
})

export const {useGetReviewsByProductIdQuery, useAddNewReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation} = productReviewsApiSlice