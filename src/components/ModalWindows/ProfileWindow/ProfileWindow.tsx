import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import { useState } from "react"
import { setIsAuth, setTimerSendActivationLink } from "@/src/store/reducers/authSlice"
import ProfileBlock from "./ProfileBlock/ProfileBlock"
import MyCommentsBlock from "./MyCommentsBlock/MyCommentsBlock"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { retryActivate } from "@/src/services/authService"

const ProfileWindow = () => {
    const { isAuth, user, timerSendActivationLink } = useAppSelector(state => state.authReducer)
    const [ profileOpen, setProfileOpen] = useState(true)
    const [ commentsOpen, setCommentsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const openProfile = () => {
        setProfileOpen(true)
        setCommentsOpen(false)
    }

    const openComments = () => {
        if(isAuth){
            if(user.isActivated){
                setProfileOpen(false)
                setCommentsOpen(true)
            } else{
                setProfileOpen(true)
                setCommentsOpen(false)
                dispatch(setNotActivatedWindowTimer(3))
            }
        } else{
            dispatch(setIsAuth(false))
            dispatch(isAuthWindowOpen(true))
        }

    }

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
                                console.log(responce)                                
                            }}>{timerSendActivationLink > 0 ? timerSendActivationLink : 'Отправить повторно'}</button></div>                      
                        </div>
                    }
                    <div className={styles.container}>
                        <div className={styles.container_menu}>
                            <ul className={styles.container_menu_list}>
                                <li className={styles.container_menu_list_item}>
                                    <button className={styles.container_menu_list_item_button} onClick={openProfile}>Профиль</button>
                                </li>
                                <li className={styles.container_menu_list_item}>
                                    <button className={styles.container_menu_list_item_button}>Заказы</button>
                                </li>
                                <li className={styles.container_menu_list_item}>
                                    <button className={styles.container_menu_list_item_button} onClick={openComments}>Отзывы</button>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.container_content}>
                            {profileOpen && <ProfileBlock/>}
                            {commentsOpen && <MyCommentsBlock/>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProfileWindow