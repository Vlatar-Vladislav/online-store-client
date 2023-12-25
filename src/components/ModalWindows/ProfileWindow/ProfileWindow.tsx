import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import { useEffect, useState } from "react"
import { setIsAuth, setIsOpen, setTimerSendActivationLink } from "@/src/store/reducers/authSlice"
import ProfileBlock from "./ProfileBlock/ProfileBlock"
import MyCommentsBlock from "./MyCommentsBlock/MyCommentsBlock"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { retryActivate } from "@/src/services/authService"
import OrdersBlock from "./OrdersBlock/OrdersBlock"

const ProfileWindow = () => {
    const { isAuth, user, timerSendActivationLink, open} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    return(
        <div className={styles.modal} onClick={() => dispatch(isProfileWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.modal_container_content}>
                    {!user.isActivated && 
                        <div className={styles.isNotActiveted}>
                            <div className={styles.isNotActiveted_message}><span className={styles.isNotActiveted_message_fat}>ВНИМАНИЕ!</span>Требуется активация аккаунта, ссылка для активации была выслана на ваш адрес электронной почты!</div>
                            <div className={styles.isNotActiveted_retry}><button className={styles.isNotActiveted_retry_button} disabled={timerSendActivationLink > 0 ? true : false} onClick={async () => {
                                dispatch(setTimerSendActivationLink(30))
                                const responce = await retryActivate()
                            }}>{timerSendActivationLink > 0 ? timerSendActivationLink : 'Отправить повторно'}</button></div>                      
                        </div>
                    }
                    <div className={styles.container}>
                        <div className={styles.container_menu}>
                            <button onClick={() => {
                                if(isAuth){
                                    dispatch(setIsOpen('profile'))
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }
                            }}>Профиль</button>
                            <button onClick={() => {
                                if(isAuth){
                                    if(user.isActivated){
                                        dispatch(setIsOpen('orders'))
                                    } else{
                                        dispatch(setIsOpen('profile'))
                                        dispatch(setNotActivatedWindowTimer(3))
                                    }
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }
                            }}>Заказы</button>
                            <button onClick={() => {
                                if(isAuth){
                                    if(user.isActivated){
                                        dispatch(setIsOpen('comments'))
                                    } else{
                                        dispatch(setIsOpen('profile'))
                                        dispatch(setNotActivatedWindowTimer(3))
                                    }
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }  
                            }}>Отзывы</button>
                        </div>
                        <div className={styles.container_content}>
                            {(open === 'profile' || !user.isActivated) && <ProfileBlock/>}
                            {(open === 'orders' && user.isActivated) && <OrdersBlock/>}
                            {(open === 'comments' && user.isActivated) && <MyCommentsBlock/>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProfileWindow