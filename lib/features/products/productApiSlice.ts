import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://ecommerce-expressjs-alpha.vercel.app/api/";

export interface ProductInterface {
    _id?:string,
    name: string,
    category: string,
    color:string[],
    brand: string,
    collectionLine:string,
    segment:string[],
    size:number[],
    price:number,
    image:string,
    availableQuantity:number,
    description:string,
    details:string[],
    discount?:number
}

export interface ProductResponseInterface {
    currentPage:string,
    totalPages:number,
    totalProducts:number,
    products:ProductInterface[],
}

export const productApiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    reducerPath:'productApi',
    tagTypes:['Products'],
    endpoints:(build)=>({
        getAllProducts:build.query<ProductResponseInterface,{pageForUse:number,sort:string}>({
            query:({pageForUse,sort}:{pageForUse:number,sort:string})=>`products?page=${pageForUse}&&sort=${sort}`,
        }),
        getProductsByCategory:build.query<ProductResponseInterface,{category:string,pageForUse:number,sort:string}>({
            query:({category,pageForUse,sort}:{category:string,pageForUse:number,sort:string})=>`products/category/${category}?page=${pageForUse}&&sort=${sort}`
        }),
        getProductById:build.query<ProductInterface,string>({
            query:(productId:string)=>`products/${productId}`
        }),
        getProductsByKeyword:build.query<ProductInterface[],string>({
            query:(keyword:string)=>`products/w/${keyword}`
        })
    })
});

export const {useGetAllProductsQuery,useGetProductsByCategoryQuery,useGetProductByIdQuery,useGetProductsByKeywordQuery} = productApiSlice