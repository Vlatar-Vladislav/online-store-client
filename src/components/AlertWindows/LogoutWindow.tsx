'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setLogoutWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const LogoutWindows = () => {
    const [isHovered, setIsHovered] = useState(false)
    const logoutWindowTimer = useAppSelector(state => state.alertWindowsReducer.logoutWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(logoutWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setLogoutWindowTimer(logoutWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [logoutWindowTimer])

    return(
        <div className={styles.logout} style={{right: logoutWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Вы успешно вышли из аккаунта!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setLogoutWindowTimer(0))
            }} onMouseOverCapture ={() => {
                setIsHovered(true)
            }} onMouseOut={() => {
                setIsHovered(false)
            }}>
                <img className={styles.cross_button_img} src="/ico/cross-ico.svg"/>
            </button>
        </div>    
    )
}
export default LogoutWindows