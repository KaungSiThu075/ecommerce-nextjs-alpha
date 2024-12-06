"use client";
import {ChangeEvent, useState} from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {ReviewSchema, reviewSchema} from "@/app/components/schema/review";
import {useAddNewReviewMutation} from "@/lib/features/productReviews/productReviewsApiSlice";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import '@smastrom/react-rating/style.css';
import { Rating as ReactRating } from '@smastrom/react-rating';

export default function AddNewReviewButton({productId}:{productId:string}){
    const [addNewReviewApi,addNewReviewResult] = useAddNewReviewMutation();
    const auth = Cookies.get("cookieToken");
    const router = useRouter();

    const {register,handleSubmit,reset} = useForm<ReviewSchema>({resolver:zodResolver(reviewSchema)});

    const [rating, setRating] = useState(0);
    const [text,setText] = useState('');

    const textAreaHandler =
        (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setText(e.target.value);
    }

    const reviewSubmitHandler = (data:any) => {
        if(auth)
        {
            const formData = {...data,product:productId,rating}

            addNewReviewApi(formData).unwrap().then(data=>{
                setText('');
                reset();
                (document.getElementById(`add_new_review_dialog`)as HTMLDialogElement).close();
            });

        }
        else
        {
            router.push(`/users/login`);
        }
    }

    return (
        <form
            className="flex flex-col items-start justify-center gap-3 my-4"
            onSubmit={handleSubmit(reviewSubmitHandler)}
        >
            <ReactRating
                value={rating}
                onChange={setRating}
            />

            <textarea
                className="w-full textarea textarea-bordered"
                {...register('review')}
                placeholder="Add Your Review Here"
                value={text}
                onChange={textAreaHandler}
            ></textarea>

            <button
                type={"submit"}
                className="btn"
            >
                Add Review
            </button>
        </form>
    )
}