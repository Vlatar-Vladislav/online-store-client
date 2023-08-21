import { isAuthWindowOpen, isFavoritesWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { useEffect } from "react"
import Link from "next/link"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { setNotActivatedWindowTimer, setFavoriteAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { addFavoriteProducts, getMe } from "@/src/services/userService"

const FavoritesWindow = () => {
    const { isAuth, user} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    return(
        <div className={styles.modal} onClick={() => dispatch(isFavoritesWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.modal_container_content}>
                    <div className={styles.modal_container_content_scroll}>
                        {user.favoriteProducts?.length === 0 ? <div className={styles.no_favorites}>Вы не добавляли товары в избранное!</div> : 
                            user.favoriteProducts?.map((product) => 
                                <div key={product.id} className={styles.product}>
                                    <div className={styles.product_image}>
                                        <img className={styles.img} src={`http://localhost:7000/${product.images[0]}`}/>
                                    </div>
                                    <div className={styles.product_info}>
                                        <div className={styles.product_info_name}>{product.name}</div>
                                        <div className={styles.product_info_code}>Код товара:<span className={styles.product_info_code_id}>{product.id}</span></div>
                                        <div className={styles.product_info_price}>
                                            {product.pastPrice && <div className={styles.product_info_price_past}>
                                                {product.pastPrice}$
                                                <div className={styles.product_info_price_discount}>{`-${Math.floor(100 - (100 / product.pastPrice * product.currentPrice))}%`}</div>
                                            </div>}
                                            <div className={styles.product_info_price_current}>{product.currentPrice}$</div>
                                        </div>
                                        <Link href={`http://localhost:3000/${product.id}`} className={styles.product_info_button} onClick={() => {
                                            dispatch(isFavoritesWindowOpen(false))
                                        }}>
                                            Перейти
                                        </Link>
                                    </div>
                                    <button className={styles.button} onClick={async () => {
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
                                        <img className={styles.button_ico} src="/ico/cross-ico.svg"/>
                                    </button>
                                </div>
                            )
                        }
                    </div>                    
                </div>
            </div>
        </div>
    )
}
export default FavoritesWindow