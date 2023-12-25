import { isAddToCartWindowOpen, isAuthWindowOpen, isCartWindowOpen, isProfileWindowOpen, setIsOrderAgainWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { deleteAllCartItems, deleteCartItem, updateCartItem } from "@/src/services/cartService"
import { setAddToCartProductId, setIsAuth, setIsOpen, setUser } from "@/src/store/reducers/authSlice"
import { getMe } from "@/src/services/userService"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { useState } from "react"
import { createOrder } from "@/src/services/orderService"

const CartWindow = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    let disabled = false
    let totalСost = 0
    user.cartItems?.length === 0 ? totalСost = 0 : user.cartItems?.map((cartItem) => {
        cartItem.quantity <= 0 ? disabled = true : null
        totalСost = (totalСost + cartItem.product.currentPrice * cartItem.quantity)
    })    

    return(
        <div className={styles.modal} onClick={() => dispatch(isCartWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div  className={styles.modal_container_products}>
                    {user.cartItems?.length === 0 ? <div className={styles.no}>Вы не добавляли товаров в корзину!</div> : user.cartItems?.map((cartItem) => 
                        <div key={cartItem.id} className={styles.product}>
                            <div className={styles.product_image}>
                                <img className={styles.product_image_img} src={`http://localhost:7000/${cartItem.product.images[0]}`}/>
                            </div>
                            <div className={styles.product_info}>
                                <div className={styles.product_info_name}>{cartItem.product.name}</div>
                                <div className={styles.product_info_description}>
                                    <div className={styles.product_info_description_price}>{cartItem.product.currentPrice}$</div>
                                    <div className={styles.product_info_description_quantity}>В наличии: {cartItem.product.quantity} шт</div>
                                </div>
                                <div className={styles.product_info_buy}>
                                    <button disabled={cartItem.quantity <= 0} className={styles.product_info_buy_button} onClick={async () => {
                                        if(isAuth){
                                            if(user.isActivated){
                                                const message = await updateCartItem(cartItem.id, cartItem.quantity-1)
                                                if(message === 'Ok'){
                                                    const data = await getMe()
                                                    if(data){
                                                        dispatch(setIsAuth(true))
                                                        dispatch(setUser(data))
                                                    } else{
                                                        dispatch(setIsAuth(false))
                                                        dispatch(isAuthWindowOpen(true))
                                                    }
                                                } else{
                                                    dispatch(setIsAuth(false))
                                                    dispatch(isAuthWindowOpen(true))
                                                }
                                            } else{
                                                dispatch(setAddToCartProductId(null))
                                                dispatch(setNotActivatedWindowTimer(3))
                                                dispatch(isProfileWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    }}>-</button>
                                    <div className={styles.product_info_buy_quantity}>{cartItem.quantity}</div>
                                    <button disabled={cartItem.quantity >= cartItem.product.quantity} className={styles.product_info_buy_button} onClick={async () => {
                                        if(isAuth){
                                            if(user.isActivated){
                                                const message = await updateCartItem(cartItem.id, cartItem.quantity+1)
                                                if(message === 'Ok'){
                                                    const data = await getMe()
                                                    if(data){
                                                        dispatch(setIsAuth(true))
                                                        dispatch(setUser(data))
                                                    } else{
                                                        dispatch(setIsAuth(false))
                                                        dispatch(isAuthWindowOpen(true))
                                                    }
                                                } else{
                                                    console.log(message)
                                                    dispatch(setIsAuth(false))
                                                    dispatch(isAuthWindowOpen(true))
                                                }
                                            } else{
                                                dispatch(setAddToCartProductId(null))
                                                dispatch(setNotActivatedWindowTimer(3))
                                                dispatch(isProfileWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    }}>+</button>
                                </div>
                            </div>
                            <button className={styles.product_delete} onClick={async () => {
                                if(isAuth){
                                    if(user.isActivated){
                                        const message = await deleteCartItem(cartItem.id)
                                        if(message === 'Ok'){
                                            const data = await getMe()
                                            if(data){
                                                dispatch(setIsAuth(true))
                                                dispatch(setUser(data))
                                            } else{
                                                dispatch(setIsAuth(false))
                                                dispatch(isAuthWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setAddToCartProductId(null))
                                        dispatch(setNotActivatedWindowTimer(3))
                                        dispatch(isProfileWindowOpen(true))
                                    }
                                } else{
                                    dispatch(setAddToCartProductId(null))
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }
                            }}>
                                <img className={styles.product_delete_ico} src="/ico/cross-ico.svg"/>
                            </button>
                        </div>
                    )}
                    {user.cartItems?.length === 0 ? null : 
                        <div className={styles.menu}>
                            <div className={styles.menu_total_cost}>Общая стоимость товаров: <span className={styles.menu_total_cost_value}>{totalСost.toFixed(2)}$</span></div>
                            <div className={styles.menu_buttons}>
                                <button disabled={disabled} className={styles.menu_buttons_buy} onClick={async () => {
                                    if(isAuth){
                                        if(user.isActivated){
                                            const responce = await createOrder()
                                            if(responce.message === 'Ok'){
                                                const data = await getMe()
                                                if(data){
                                                    dispatch(setIsAuth(true))
                                                    dispatch(setUser(data))
                                                    dispatch(setIsOpen('orders'))
                                                    dispatch(isProfileWindowOpen(true))
                                                } else{
                                                    dispatch(setIsAuth(false))
                                                    dispatch(isAuthWindowOpen(true))
                                                }
                                            } else if(responce.message === 'No products'){
                                                console.log(responce.data)
                                                dispatch(setIsOrderAgainWindowOpen(responce.data))
                                            } else {
                                                dispatch(setIsAuth(false))
                                                dispatch(isAuthWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(setNotActivatedWindowTimer(3))
                                            dispatch(isProfileWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setAddToCartProductId(null))
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }
                                }}>Оформить заказ</button>
                                <button className={styles.menu_buttons_delete} onClick={async () => {
                                    if(isAuth){
                                        if(user.isActivated){
                                            const message = await deleteAllCartItems()
                                            if(message === 'Ok'){
                                                const data = await getMe()
                                                if(data){
                                                    dispatch(setIsAuth(true))
                                                    dispatch(setUser(data))
                                                } else{
                                                    dispatch(setIsAuth(false))
                                                    dispatch(isAuthWindowOpen(true))
                                                }
                                            } else{
                                                dispatch(setIsAuth(false))
                                                dispatch(isAuthWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(setNotActivatedWindowTimer(3))
                                            dispatch(isProfileWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setAddToCartProductId(null))
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }
                                }}>Удалить все</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default CartWindow