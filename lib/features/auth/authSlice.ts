import {createAppSlice} from "@/lib/createAppSlice";
import {AuthResponse} from "@/lib/features/auth/authApiSlice";
import {PayloadAction} from "@reduxjs/toolkit";

const initialState:AuthResponse = {
    token:"",
}

export const authSlice = createAppSlice({
    name:'auth',
    initialState,
    reducers:(create)=>({
        login:create.reducer((state,action:PayloadAction<AuthResponse>)=>{
            state.token = action.payload.token;
        }),
        logout:create.reducer((state)=>{
            state.token = "";
        })
    }),
    selectors:{
        selectAuth:(state)=>state.token,
    }
});

export  const {login,logout} = authSlice.actions
export const {selectAuth} = authSlice.selectors
