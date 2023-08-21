'use client'

import { FC, useState } from "react"
import styles from "./index.module.scss"
import Link from "next/link"
import ArrowLeftСircle from "../../svg/Arrow/ArrowLeftСircle"
import ArrowRightСircle from "../../svg/Arrow/ArrowRightСircle"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setAddToCartProductId, setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { isAddToCartWindowOpen, isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setMaxComparedWindowTimer, setNotActivatedWindowTimer, setFavoriteAddWindowTimer, setComparedAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { addComparedProducts, addFavoriteProducts, getMe } from "@/src/services/userService"

interface IProductsBlock {
    header: string,
    link: string,
    description?: string,
    products: any[]
}

const ProductsBlock: FC<IProductsBlock> = ({header, link, description, products}) => {
    const { isAuth, user} = useAppSelector(state => state.authReducer)
    const compared = useAppSelector(state => state.authReducer.user.comparedProducts)
    const [slideIndex, setSlideIndex] = useState(0)
    const dispatch = useAppDispatch()

    const incrementSlideIndex = () => {
        setSlideIndex(slideIndex + 1)
    }
    const decrementSlideIndex = () => {
        setSlideIndex(slideIndex - 1)
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.container_description}>
                <Link className={styles.container_description_link} href={link}>{header} <img className={styles.container_description_link_img} src={"./ico/another-ico.svg"}/></Link>
                {description ? <h4 className={styles.container_description_description}>{description}</h4> : null}
                <div className={styles.container_control}>
                    <button disabled={slideIndex !== 0 ? false : true} className={styles.container_control_button} onClick={decrementSlideIndex}>
                        <ArrowLeftСircle disabled={slideIndex !== 0 ? false : true}/>
                    </button>
                    <button disabled={slideIndex < products.length-4 ? false : true} className={styles.container_control_button} onClick={incrementSlideIndex}>
                        <ArrowRightСircle disabled={slideIndex < products.length-4 ? false : true}/>
                    </button>
                </div>
            </div>
            <div className={styles.container_carousel}>
                {products.map((product, productIndex) => 
                    <div key={productIndex} className={styles.slide} style={{transform: `translateX(${(-slideIndex)*100}%)`, transition: `transform ${1}s`}}>
                        <div className={styles.slide_content}>
                            <Link className={styles.slide_content_image} href={`/${product.id}`}>                                      
                                <Image unoptimized src={`http://localhost:7000/${product.images[0]}`} alt={product.name} width={0} height={0} className={styles.image}/>
                                {/* <img className={styles.img} alt={product.name} src={`http://localhost:7000/${product.images[0]}`}/> */}
                            </Link>
                            <div className={styles.slide_content_description}>
                                <Link className={styles.slide_content_description_name} href={`/${product.id}`}>
                                    {product.name}                                
                                </Link>
                                <div className={styles.slide_content_description_block}>
                                    <div className={styles.slide_content_description_price}>
                                        {product.pastPrice ? <p className={styles.slide_content_description_price_past}>
                                            {`${product.pastPrice}$`}
                                        </p> : null}
                                        <p className={styles.slide_content_description_price_current}>
                                            {`${product.currentPrice}$`}
                                        </p>
                                    </div>
                                    <button className={styles.slide_content_description_buy} onClick={async () => {
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
                                    }}>корзина</button>
                                </div>
                            </div>
                            <button className={styles.slide_content_favorite} onClick={async () => {
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
                                <img className={styles.ico} alt="favorite" src={"./ico/favorite-white-ico.svg"}/>
                            </button>
                            <button className={styles.slide_content_comparison} onClick={async () => {
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
                                <img className={styles.ico} alt="comparison" src={"./ico/scales-white-ico.svg"}/>
                            </button>
                            {product.isNew ? <div className={styles.new}>Новинка</div> : null}
                            {product.isBestseller ? <div className={styles.bestseller} style={{top: product.isNew ? "40px" : "10px"}}>Бестселлер</div> : null}
                            {product.pastPrice && product.currentPrice ? 
                                <div className={styles.discountr}>
                                    {`-${Math.floor(100 - (100 / product.pastPrice * product.currentPrice))}%`}
                                </div> : null
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProductsBlock