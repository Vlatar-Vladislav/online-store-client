import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    isAuthWindowOpen: boolean
    isProfileWindowOpen: boolean
    isFavoritesWindowOpen: boolean
    isComparedWindowOpen: boolean
    isCartWindowOpen: boolean
    isAddToCartWindowOpen: boolean
    isMenuWindowOpen: boolean
}

const initialState: ExampleState = {
    isAuthWindowOpen: false,
    isProfileWindowOpen: false,
    isFavoritesWindowOpen: false,
    isComparedWindowOpen: false,
    isCartWindowOpen: false,
    isAddToCartWindowOpen: false,
    isMenuWindowOpen: false
}

export const modalWindowsSlice = createSlice({
    name: 'modal-windows',
    initialState,
    reducers: {
        isAuthWindowOpen(state, action: PayloadAction<boolean>){
            state.isAuthWindowOpen = action.payload
        },
        isProfileWindowOpen(state, action: PayloadAction<boolean>){
            state.isProfileWindowOpen = action.payload
        },
        isFavoritesWindowOpen(state, action: PayloadAction<boolean>){
            state.isFavoritesWindowOpen = action.payload
        },
        isComparedWindowOpen(state, action: PayloadAction<boolean>){
            state.isComparedWindowOpen = action.payload
        },
        isCartWindowOpen(state, action: PayloadAction<boolean>){
            state.isCartWindowOpen = action.payload
        },
        isAddToCartWindowOpen(state, action: PayloadAction<boolean>){
            state.isAddToCartWindowOpen = action.payload
        },
        setMenuWindowOpen(state, action: PayloadAction<boolean>){
            state.isMenuWindowOpen = action.payload
        }
    },
})

export const { isAuthWindowOpen, isFavoritesWindowOpen, isCartWindowOpen, isProfileWindowOpen, isComparedWindowOpen, isAddToCartWindowOpen, setMenuWindowOpen } = modalWindowsSlice.actions

export default modalWindowsSlice.reducer