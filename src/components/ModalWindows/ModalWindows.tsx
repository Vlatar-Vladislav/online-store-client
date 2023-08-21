'use client'

import { useAppSelector } from "@/src/hooks/redux"
import AuthWindow from "./AuthWindow/AuthWindow"
import ProfileWindow from "./ProfileWindow/ProfileWindow"
import FavoritesWindow from "./FavoritesWindow/FavoritesWindow"
import ComparedWindow from "./ComparedWindow/ComparedWindow"
import CartWindow from "./CartWindow/CartWindow"
import AddToCartWindow from "./AddToCartWindow/AddToCartWindow"

const ModalWindows = () => {
    const { isAuthWindowOpen, isProfileWindowOpen, isFavoritesWindowOpen, isComparedWindowOpen, isCartWindowOpen, isAddToCartWindowOpen } = useAppSelector(state => state.modalWindowsReducer)
    return(
        <>
            {isAuthWindowOpen && <AuthWindow/>}
            {isProfileWindowOpen && <ProfileWindow/>}
            {isFavoritesWindowOpen && <FavoritesWindow/>}
            {isComparedWindowOpen && <ComparedWindow/>}
            {isCartWindowOpen && <CartWindow/>}
            {isAddToCartWindowOpen  && <AddToCartWindow/>}
        </>        
    )
}
export default ModalWindows