import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    comparedAddWindowTimer: number
    favoriteAddWindowTimer: number
    reviewAddWindowTimer: number
    reviewDeleteWindowTimer: number
    signupWindowTimer: number
    signinWindowTimer: number
    logoutWindowTimer: number
    notActivatedWindowTimer: number
    maxComparedWindowTimer: number
}

const initialState: ExampleState = {
    comparedAddWindowTimer: 0,
    favoriteAddWindowTimer: 0,    
    reviewAddWindowTimer: 0,
    reviewDeleteWindowTimer: 0,
    signupWindowTimer: 0,
    signinWindowTimer: 0,
    logoutWindowTimer: 0,
    notActivatedWindowTimer: 0,
    maxComparedWindowTimer: 0
}

export const alertWindowsSlice = createSlice({
    name: 'alert-windows',
    initialState,
    reducers: {
        setComparedAddWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.comparedAddWindowTimer = action.payload
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.comparedAddWindowTimer = action.payload
            }            
        },
        setFavoriteAddWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.favoriteAddWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.favoriteAddWindowTimer = action.payload
            }            
        },
        setReviewAddWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.reviewAddWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.reviewAddWindowTimer = action.payload
            }            
        },
        setReviewDeleteWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.reviewDeleteWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.reviewDeleteWindowTimer = action.payload
            }            
        },
        setSignupWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.signupWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.signupWindowTimer = action.payload
            }  
        },
        setSigninWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.signinWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signupWindowTimer = 0
                state.logoutWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.signinWindowTimer = action.payload
            }  
        },
        setLogoutWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.logoutWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.logoutWindowTimer = action.payload
            }  
        },
        setNotActivatedWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.notActivatedWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.logoutWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
                state.maxComparedWindowTimer = 0
            } else {
                state.notActivatedWindowTimer = action.payload
            }  
        },
        setMaxComparedWindowTimer(state, action: PayloadAction<number>){
            if(action.payload > 0){
                state.maxComparedWindowTimer = action.payload
                state.comparedAddWindowTimer = 0
                state.notActivatedWindowTimer = 0
                state.logoutWindowTimer = 0
                state.favoriteAddWindowTimer = 0
                state.reviewAddWindowTimer = 0
                state.reviewDeleteWindowTimer = 0
                state.signinWindowTimer = 0
                state.signupWindowTimer = 0
            } else{
                state.maxComparedWindowTimer = action.payload
            }
        }
    },
})

export const { setComparedAddWindowTimer, setFavoriteAddWindowTimer, setReviewAddWindowTimer, setReviewDeleteWindowTimer, setSignupWindowTimer, setSigninWindowTimer, setLogoutWindowTimer, setNotActivatedWindowTimer, setMaxComparedWindowTimer } = alertWindowsSlice.actions

export default alertWindowsSlice.reducer