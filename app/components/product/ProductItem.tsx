"use client";
import {ProductInterface} from "@/lib/features/products/productApiSlice";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function ProductItem({product}:{product:ProductInterface}){
    const router = useRouter();

    const [imageOnLoad,setImageOnLoad] = useState(true);
    const productDetailHandler = () => {
        router.push(`/products/${product._id}`)
    }

    return(
        <div className={`hover:scale-105 rounded-lg transition-all duration-300 cursor-pointer hover:border hover:border-gray-400`}>
            <div className=" overflow-hidden">
                {imageOnLoad && <div className="skeleton 3xs:w-[150px] 3xs:h-[240px] xs:w-[200px] xs:h-[280px] sm:w-[210px] sm:h-[300px]"></div>}
                <img
                    onLoad={() => setImageOnLoad(false)}
                    onClick={productDetailHandler}
                    className={`3xs:w-[250px] 3xs:h-[250px] 2xs:w-[310px] 2xs:h-[300px] xs:w-[200px] xs:h-[280px] sm:w-[250px] sm:h-[300px] md:h-[350px] md:w-[350px] lg:w-[400px] lg:h-[400px] rounded-lg`}
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <p>{product.name}</p>
            <p className=" font-bold">$ {product.price}</p>
        </div>
    )
}

//3xs:h-60 3xs:w-40 xs:w-44 xs:h-72