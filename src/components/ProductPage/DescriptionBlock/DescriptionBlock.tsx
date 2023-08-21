'use client'

import { FC } from "react"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setAddToCartProductId, setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { isAddToCartWindowOpen, isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setMaxComparedWindowTimer, setNotActivatedWindowTimer, setFavoriteAddWindowTimer, setComparedAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { addComparedProducts, addFavoriteProducts, getMe } from "@/src/services/userService"
import Link from "next/link"

interface IDescriptionBlock {
    product: any
}

const DescriptionBlock: FC<IDescriptionBlock> = ({product}: {product: IProduct}) => {
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    // const comparedLenght = useAppSelector(state => state.authReducer.user.comparedProducts?.length)
    let rating = 0
    const stars = ['★', '★', '★', '★', '★']
    const dispatch = useAppDispatch()

    if(product.comments.length === 0){
        rating = 0
    } else{
        let value = 0
        product.comments.map((comment: IProductComment) => {
            value += comment.rating
        })
        rating = Number((value / product.comments.length).toFixed(1))
    }

    return(
        <div className={styles.container}>
            <div className={styles.name_block}>
                <h1 className={styles.name}>{product.name}</h1>
                <div className={styles.name_block_bottom}>
                    <div className={styles.rating}>
                        <h3 className={styles.rating_value}>{rating}</h3>
                        {stars.map((star, starIndex) => 
                            <h3 key={starIndex} className={starIndex + 1 <= Math.round(rating) ? styles.rating_star_active : styles.rating_star}>{star}</h3>
                        )}
                        <a className={styles.rating_reviews_link} href="#reviews">{`${product.comments.length} ${product.comments.length === 1 ? 'отзыв' : product.comments.length === 2 || 3 ? 'отзыва' : 'отзывов'}`}</a>
                    </div>
                    <h4 className={styles.id}>{`Код: ${product.id}`}</h4>
                </div>
            </div>
            <div className={styles.relations}>
                {product.relatedProducts.length === 0 && product.relatedToProducts.length === 0 ? 
                    <div className={styles.relations_text}>У данного товара нет других вариантов цвета!</div> :
                    <>
                        <h4 className={styles.relations_text}>Другие варианты цветов товара:</h4>
                        <div className={styles.relations_block}>
                            {product.relatedProducts.map((relatedProduct) => 
                                <Link className={styles.relations_block_item} href={`http://localhost:3000/${relatedProduct.id}`} style={{background: relatedProduct.color}}></Link>
                            )}
                            {product.relatedToProducts.map((relatedProduct) => 
                                <Link className={styles.relations_block_item} href={`http://localhost:3000/${relatedProduct.id}`} style={{background: relatedProduct.color}}></Link>
                            )}
                        </div>
                    </>
                }              
            </div>
            <div className={styles.description_block}>
                <p className={styles.description_block_text}>{`${product.description}`}</p>
            </div>
            {product.quantity === 0 ? <div className={styles.quantity_no}>Нет в наличии!</div> : <div className={styles.quantity}>В наличии {product.quantity} шт!</div>}
            <div className={styles.interaction_block}>                
                {product.pastPrice ? 
                    <div className={styles.interaction_block_price_block}>
                        <div className={styles.interaction_block_price_block_past_price_block}>
                            <h3 className={styles.interaction_block_price_block_past}>
                                {`${product.pastPrice} $`}
                            </h3>
                            <div className={styles.interaction_block_price_block_discountr}>
                                {`-${Math.floor(100 - (100 / product.pastPrice * product.currentPrice))}%`}
                            </div>
                        </div>
                        <h2 className={styles.interaction_block_price_block_current}>
                            {`${product.currentPrice} $`}
                        </h2>
                    </div> : 
                    <div className={styles.interaction_block_price_block}>
                        <h2 className={styles.interaction_block_price_block_current}>
                            {`${product.currentPrice} $`}
                        </h2>
                    </div>
                }
                <div className={styles.interaction_block_button_block}>
                    <button className={styles.interaction_block_button_block_button} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                const user = await getMe()
                                if(user){
                                    dispatch(setIsAuth(true))                                    
                                    dispatch(setUser(user))
                                    dispatch(setAddToCartProductId(product.id))
                                    dispatch(isAddToCartWindowOpen(true))
                                } else {
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }                                        
                            } else{
                                dispatch(setNotActivatedWindowTimer(3))
                                dispatch(isProfileWindowOpen(true))
                            }
                        } else{
                            dispatch(isAuthWindowOpen(true))
                        }
                    }}>В КОРЗИНУ</button>
                    <button className={styles.interaction_block_button_block_button_mini} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                const message = await addFavoriteProducts(product.id)
                                if(message === 'Ok'){
                                    const user = await getMe()
                                    if(user){
                                        dispatch(setIsAuth(true))                                    
                                        dispatch(setUser(user))
                                        dispatch(setFavoriteAddWindowTimer(3))
                                    } else {
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }
                                } else {
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }                                        
                            } else{
                                dispatch(setNotActivatedWindowTimer(3))
                                dispatch(isProfileWindowOpen(true))
                            }
                        } else{
                            dispatch(isAuthWindowOpen(true))
                        }
                    }}>
                        <img className={styles.svg} src={"./ico/favorite-white-ico.svg"}/>
                    </button>
                    <button className={styles.interaction_block_button_block_button_mini} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                if(user.comparedProducts?.length && user.comparedProducts?.length >= 5){
                                    dispatch(setMaxComparedWindowTimer(3))
                                } else {
                                    const message = await addComparedProducts(product.id)
                                    if(message === 'Ok'){
                                        const data = await getMe()
                                        if(data){
                                            dispatch(setIsAuth(true))                                    
                                            dispatch(setUser(data))
                                            dispatch(setComparedAddWindowTimer(3))
                                        } else {
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else if(message === 'Max'){
                                        dispatch(setMaxComparedWindowTimer(3))
                                    } else {
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }                                            
                                }
                            } else{
                                dispatch(setNotActivatedWindowTimer(3))
                                dispatch(isProfileWindowOpen(true))
                            }
                        } else{
                            dispatch(isAuthWindowOpen(true))
                        }
                    }}>
                        <img className={styles.svg} src={"./ico/scales-white-ico.svg"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DescriptionBlock