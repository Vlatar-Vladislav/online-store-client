import { isAuthWindowOpen, isComparedWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import Link from "next/link"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { addComparedProducts, getMe } from "@/src/services/userService"
import { setMaxComparedWindowTimer, setNotActivatedWindowTimer, setComparedAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const ComparedWindow = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    return(
        <div className={styles.modal} onClick={() => dispatch(isComparedWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.modal_container_content}>
                    {user.comparedProducts?.length === 0 ? <div className={styles.modal_container_content_no}>Вы не добавляли товаров для сравнения!</div> : null}
                    {user.comparedProducts?.length === 0 ? null : 
                        <div className={styles.modal_container_content_counter}>
                            <div className={styles.modal_container_content_counter_block}>{user.comparedProducts?.length ? `${user.comparedProducts.length} / 5` : `0 / 5`}</div>
                        </div>
                    }
                    <div className={styles.modal_container_content_products}>
                        {user.comparedProducts?.length === 0 ? null : user.comparedProducts?.map((product) => 
                            <div key={product.id} className={styles.product}>
                                <div className={styles.product_image}>
                                    <img className={styles.product_image_img} src={`http://localhost:7000/${product.images[0]}`}/>
                                </div>
                                <div className={styles.product_info}>
                                    <Link className={styles.product_info_link} href={`http://localhost:3000/${product.id}`}>{product.name}</Link>
                                    <div className={styles.product_info_line}>
                                        <div className={styles.product_info_line_item}>Код товара:</div>
                                        <div className={styles.product_info_line_value}>{product.id}</div>
                                    </div>
                                    <div className={styles.product_info_line}>
                                        <div className={styles.product_info_line_item}>Цена:</div>
                                        <div className={styles.product_info_line_value}>{product.currentPrice}</div>
                                    </div>
                                    <div className={styles.product_info_line}>
                                        <div className={styles.product_info_line_item}>Осталось в наличии:</div>
                                        <div className={styles.product_info_line_value}>{product.quantity} шт</div>
                                    </div>
                                </div>
                                <div className={styles.product_characteristics}>
                                    <h3 className={styles.product_characteristics_title}>Характеристики</h3>
                                    <div className={styles.product_characteristics_block}>
                                        {product.characteristics.length === 0 ? <div className={styles.product_characteristics_block_no}>Нет характеристик!</div> : product.characteristics.map((characteristic) =>
                                            characteristic.category || !characteristic.isSeeInComparison ? null : 
                                            <div className={styles.product_info_line}>
                                                <div className={styles.product_info_line_item}>{characteristic.name}:</div>
                                                <div className={styles.product_info_line_value}>{characteristic.value}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button className={styles.product_button} onClick={async () => {
                                    if(isAuth){
                                        if(user.isActivated){
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
                                        } else{
                                            dispatch(setNotActivatedWindowTimer(3))
                                            dispatch(isProfileWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(isAuthWindowOpen(true))
                                    }
                                }}>
                                    <img className={styles.svg} src="/ico/cross-ico.svg"/>
                                </button>
                            </div>
                        )}                        
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ComparedWindow