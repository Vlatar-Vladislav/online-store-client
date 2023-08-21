import { isAddToCartWindowOpen, isAuthWindowOpen, isCartWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setAddToCartProductId, setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { useEffect, useState } from "react"
import { getProductById } from "@/src/services/productsService"
import { IncrementalCache } from "next/dist/server/lib/incremental-cache"
import { duration } from "moment"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { addToCart } from "@/src/services/cartService"
import { getMe } from "@/src/services/userService"

const AddToCartWindow = () => {
    const { isAuth, user, addToCartProductId } = useAppSelector(state => state.authReducer)
    const [product, setProduct] = useState<IProduct | null>(null)
    const [quantity, setQuantity] = useState<number>(0)
    const dispatch = useAppDispatch()

    const increment = () => {
        setQuantity(quantity + 1)  
    }

    const decrement = () => {
        if(quantity > 0){
            setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        async function getData() {
            console.log(addToCartProductId)
            if(addToCartProductId){
                const data = await getProductById(addToCartProductId)
                if(data){
                    setProduct(data)
                }
                console.log(data)
            } else{
                dispatch(setAddToCartProductId(null))
                dispatch(isAddToCartWindowOpen(false))               
            }            
        }
        getData()
    }, [])

    return(
        <div className={styles.modal} onClick={() => {
            dispatch(setAddToCartProductId(null))
            dispatch(isAddToCartWindowOpen(false))
        }}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.name}>{product?.name}</div>
                <div className={styles.product}>
                    <div className={styles.product_image}>
                        <img className={styles.product_image_img} src={`http://localhost:7000/${product?.images[0]}`}/>
                    </div>
                </div>
                <div className={styles.quantity_block}>
                    <button className={styles.quantity_block_button} disabled={quantity === 0 ? true : false} onClick={decrement}>-</button>
                    <div className={styles.quantity_block_counter}>
                        <div className={styles.quantity_block_counter_value}>{quantity}</div>
                        <div className={styles.quantity_block_counter_quantity}>В наличии: {product?.quantity} шт</div>
                    </div>
                    <button className={styles.quantity_block_button} disabled={quantity === product?.quantity ? true : false} onClick={increment}>+</button>
                    <button disabled={quantity === 0 ? true : false} className={styles.quantity_block_buy} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                if(product){
                                    const message = await addToCart(product.id, quantity)
                                    if(message === 'Ok'){
                                        const data = await getMe()
                                        if(data){
                                            dispatch(setIsAuth(true))
                                            dispatch(setUser(data))
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(isAddToCartWindowOpen(false))
                                        } else{
                                            dispatch(setAddToCartProductId(null))
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setAddToCartProductId(null))
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }
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
                    }}>В КОРЗИНУ</button>
                </div>
            </div>
        </div>
    )
}
export default AddToCartWindow