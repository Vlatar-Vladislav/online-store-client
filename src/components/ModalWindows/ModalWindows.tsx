'use client'

import { useAppSelector } from "@/src/hooks/redux"
import AuthWindow from "./AuthWindow/AuthWindow"
import ProfileWindow from "./ProfileWindow/ProfileWindow"
import FavoritesWindow from "./FavoritesWindow/FavoritesWindow"
import ComparedWindow from "./ComparedWindow/ComparedWindow"
import CartWindow from "./CartWindow/CartWindow"
import AddToCartWindow from "./AddToCartWindow/AddToCartWindow"
import ChatWindow from "./ChatWindow/ChatWindow"
import OrderAgainWindow from "./OrderAgainWindow/OrderAgainWindow"

const ModalWindows = () => {
    const { isAuthWindowOpen, isProfileWindowOpen, isFavoritesWindowOpen, isComparedWindowOpen, isCartWindowOpen, isAddToCartWindowOpen, isChatWindowOpen, isOrderAgainWindowOpen } = useAppSelector(state => state.modalWindowsReducer)

    return(
        <>
            {isAuthWindowOpen && <AuthWindow/>}
            {isProfileWindowOpen && <ProfileWindow/>}
            {isFavoritesWindowOpen && <FavoritesWindow/>}
            {isComparedWindowOpen && <ComparedWindow/>}
            {isCartWindowOpen && <CartWindow/>}
            {isAddToCartWindowOpen  && <AddToCartWindow/>}
            {isChatWindowOpen && <ChatWindow/>}
            {isOrderAgainWindowOpen !== null && <OrderAgainWindow/>}
        </>        
    )
}
export default ModalWindows