"use client";
import {ProductInCartInterface} from "@/lib/features/cart/cartApiSlice";
import ProductDetailInCart from "@/app/components/cart/ProductDetailInCart";

export default function ProductListInCart({productList}:{productList:ProductInCartInterface[]}){
    return(
        <div>
            <p className=" font-bold text-2xl">Cart</p>
            {productList.map(product=><ProductDetailInCart key={product._id} product={product}/>)}
        </div>
    )
}