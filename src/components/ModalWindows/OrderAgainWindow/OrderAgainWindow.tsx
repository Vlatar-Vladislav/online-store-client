import { isAuthWindowOpen, isCartWindowOpen, isProfileWindowOpen, setIsOrderAgainWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { getMe } from "@/src/services/userService"
import { setIsAuth, setIsOpen, setUser } from "@/src/store/reducers/authSlice"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { createOrderAgain } from "@/src/services/orderService"


const OrderAgainWindow = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer)
    const { isOrderAgainWindowOpen } = useAppSelector(state => state.modalWindowsReducer)
    const dispatch = useAppDispatch()

    return(
        <div className={styles.modal} onClick={() => dispatch(setIsOrderAgainWindowOpen(null))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.contant}>
                    <span>Упс...! Некоторых товаров не хватает на складе!</span>
                    <div className={styles.products}>
                        <div className={styles.header}>
                            <span className={styles.center}>ID</span>
                            <span>Название</span>
                            <span className={styles.center}>В наличии</span>
                            <span className={styles.center}>Требуется</span>
                        </div>
                        {isOrderAgainWindowOpen?.map((product) => 
                            <div>
                                <span className={styles.center}>{product.id}</span>
                                <span>{product.name}</span>
                                <span className={styles.center}>{product.inStock}</span>
                                <span className={styles.center}>{product.needTo}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.confirmation}>
                        <span>Согласны ли вы заказать имеющееся количество?</span>
                        <button className={styles.yes} onClick={async () => {
                            if(isOrderAgainWindowOpen !== null){
                                if(isAuth){
                                    if(user.isActivated){
                                        let array: {id: number, quantity: number}[] = []
                                        for(const element of isOrderAgainWindowOpen){
                                            array.push({id: element.id, quantity: element.inStock})
                                        }
                                        const responce = await createOrderAgain(array)
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
                                        } else{
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setNotActivatedWindowTimer(3))
                                        dispatch(isProfileWindowOpen(true))
                                    }
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }    
                            }                            
                        }}>{`Да (Оформить заказ)`}</button>
                        <button className={styles.no} onClick={async () => {
                            if(isAuth){
                                const user = await getMe()
                                if(user){
                                    dispatch(setIsAuth(true))
                                    dispatch(setUser(user))
                                    if(!user.isActivated){
                                        dispatch(setNotActivatedWindowTimer(3))
                                        dispatch(isProfileWindowOpen(true))
                                    } else{
                                        dispatch(isCartWindowOpen(true))
                                    }
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }
                            } else{
                                dispatch(isAuthWindowOpen(true))
                            }
                        }}>{`Нет (Отмена)`}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderAgainWindow