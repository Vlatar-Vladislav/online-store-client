'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { getMe } from "@/src/services/userService";
import styles from './index.module.scss'
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice";
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice";
import { isAuthWindowOpen, isChatWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice";

const ChatButton = () => {
    const { isAuth } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch();

    const chatOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                if(!user.isActivated){
                    dispatch(setNotActivatedWindowTimer(3))
                    dispatch(isProfileWindowOpen(true))
                } else{
                    dispatch(isChatWindowOpen(true))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    return(      
        <button className={styles.chat_button} onClick={chatOnClick}>
            <img src='/ico/message-ico.svg'/>
        </button>
    )
}
export default ChatButton