import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    isAuthWindowOpen: boolean
    isProfileWindowOpen: boolean
    isFavoritesWindowOpen: boolean
    isComparedWindowOpen: boolean
    isCartWindowOpen: boolean
    isAddToCartWindowOpen: boolean
    isMenuWindowOpen: boolean
    isChatWindowOpen: boolean
    isOrderAgainWindowOpen: null | {id: number, name: string, needTo: number, inStock: number}[]
}

const initialState: ExampleState = {
    isAuthWindowOpen: false,
    isProfileWindowOpen: false,
    isFavoritesWindowOpen: false,
    isComparedWindowOpen: false,
    isCartWindowOpen: false,
    isAddToCartWindowOpen: false,
    isMenuWindowOpen: false,
    isChatWindowOpen: false,
    isOrderAgainWindowOpen: null
}

export const modalWindowsSlice = createSlice({
    name: 'modal-windows',
    initialState,
    reducers: {
        isAuthWindowOpen(state, action: PayloadAction<boolean>){
            state.isAuthWindowOpen = action.payload
            if(action.payload === true){
                state.isAddToCartWindowOpen = false
                state.isCartWindowOpen = false
                state.isComparedWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isMenuWindowOpen = false
                state.isProfileWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isProfileWindowOpen(state, action: PayloadAction<boolean>){
            state.isProfileWindowOpen = action.payload
            if(action.payload === true){
                state.isAddToCartWindowOpen = false
                state.isCartWindowOpen = false
                state.isComparedWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isFavoritesWindowOpen(state, action: PayloadAction<boolean>){
            state.isFavoritesWindowOpen = action.payload
            if(action.payload === true){
                state.isAddToCartWindowOpen = false
                state.isCartWindowOpen = false
                state.isComparedWindowOpen = false
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isComparedWindowOpen(state, action: PayloadAction<boolean>){
            state.isComparedWindowOpen = action.payload
            if(action.payload === true){
                state.isAddToCartWindowOpen = false
                state.isCartWindowOpen = false
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isCartWindowOpen(state, action: PayloadAction<boolean>){
            state.isCartWindowOpen = action.payload
            if(action.payload === true){
                state.isAddToCartWindowOpen = false
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isComparedWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isAddToCartWindowOpen(state, action: PayloadAction<boolean>){
            state.isAddToCartWindowOpen = action.payload
            if(action.payload === true){
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isComparedWindowOpen = false
                state.isCartWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        isChatWindowOpen(state, action: PayloadAction<boolean>){
            state.isChatWindowOpen = action.payload
            if(action.payload === true){
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isComparedWindowOpen = false
                state.isCartWindowOpen = false
                state.isAddToCartWindowOpen = false
                state.isMenuWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
        setIsOrderAgainWindowOpen(state, action: PayloadAction<null | {id: number, name: string, needTo: number, inStock: number}[]>){
            state.isOrderAgainWindowOpen = action.payload
            if(action.payload !== null){
                state.isProfileWindowOpen = false
                state.isAddToCartWindowOpen = false
                state.isCartWindowOpen = false
                state.isComparedWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isMenuWindowOpen = false
                state.isAuthWindowOpen = false
                state.isChatWindowOpen = false
            }
        },
        setMenuWindowOpen(state, action: PayloadAction<boolean>){
            state.isMenuWindowOpen = action.payload
            if(action.payload === true){
                state.isAuthWindowOpen = false
                state.isProfileWindowOpen = false
                state.isFavoritesWindowOpen = false
                state.isComparedWindowOpen = false
                state.isCartWindowOpen = false
                state.isAddToCartWindowOpen = false
                state.isChatWindowOpen = false
                // Окно подтверждения повторного создания заказа
                state.isOrderAgainWindowOpen = null
            }
        },
    },
})

export const { isAuthWindowOpen, isFavoritesWindowOpen, isCartWindowOpen, isProfileWindowOpen, isComparedWindowOpen, isAddToCartWindowOpen, isChatWindowOpen, setIsOrderAgainWindowOpen, setMenuWindowOpen } = modalWindowsSlice.actions

export default modalWindowsSlice.reducer