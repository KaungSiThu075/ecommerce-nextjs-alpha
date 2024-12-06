import FavoriteProductItem from "@/app/components/favoriteProduct/FavoriteProductItem";
import {favoriteProductsList} from "@/lib/features/favoriteProducts/favoriteProductApiSlice";

export default function FavoriteProductList({products}:{products:favoriteProductsList[]}){

    return(
        <div>
            <div className=" grid 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 gap-2">
                {products.map(favProduct => <FavoriteProductItem key={favProduct._id} product={favProduct.product}/>)}
            </div>
        </div>
    )
}