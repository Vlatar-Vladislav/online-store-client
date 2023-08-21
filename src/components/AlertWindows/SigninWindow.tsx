'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setSigninWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const SigninWindows = () => {
    const [isHovered, setIsHovered] = useState(false)
    const signinWindowTimer = useAppSelector(state => state.alertWindowsReducer.signinWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(signinWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setSigninWindowTimer(signinWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [signinWindowTimer])

    return(
        <div className={styles.signin} style={{right: signinWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Вы успешно вошли в аккаунт!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setSigninWindowTimer(0))
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
export default SigninWindows