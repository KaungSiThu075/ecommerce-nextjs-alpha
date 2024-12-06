import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface ProductsQuantityInCartInterface {
    totalQuantity:number
}

const initialState : ProductsQuantityInCartInterface = {
    totalQuantity:0,
}

export const cartSlice = createAppSlice({
    name:'cart',
    initialState,
    reducers:(create)=>({
        addToCartQuantity:create.reducer((state,action:PayloadAction<number>)=>{
            state.totalQuantity = action.payload;
        })
    }),
    selectors:{
        selectTotalQuantity:(state)=>state.totalQuantity
    }
})

export const {addToCartQuantity} = cartSlice.actions
export const {selectTotalQuantity} = cartSlice.selectors