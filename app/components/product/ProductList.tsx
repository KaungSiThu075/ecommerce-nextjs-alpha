import {ProductInterface} from "@/lib/features/products/productApiSlice";
import ProductItem from "@/app/components/product/ProductItem";

export default function ProductList({products}:{products:ProductInterface[]}){

    return (
        <div className=" 3xs:grid 3xs:grid-cols-2 3xs:gap-4 xs:grid xs:grid-cols-3 xs:gap-5 xl:grid xl:grid-cols-4 xl:gap-6">
            {products.map(product=><ProductItem key={product._id} product={product}/>)}
        </div>
    )
}