import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface FavoriteProductsAmountInterface {
    totalQuantity: number;
}

const initialState:FavoriteProductsAmountInterface = {
    totalQuantity: 0,
}

export const favoriteProductSlice = createAppSlice({
    name:'favoriteProducts',
    initialState,
    reducers:(create)=>({
        addToFavorite:create.reducer((state,action:PayloadAction<number>)=>{
            state.totalQuantity = action.payload;
        }),
        removeFromFavorite:create.reducer((state,action:PayloadAction<number>)=>{
            state.totalQuantity = action.payload;
        })
    }),
    selectors:{
        selectTotalFavProducts:(state)=>state.totalQuantity
    }
});

export const {addToFavorite,removeFromFavorite} = favoriteProductSlice.actions
export const {selectTotalFavProducts} = favoriteProductSlice.selectors