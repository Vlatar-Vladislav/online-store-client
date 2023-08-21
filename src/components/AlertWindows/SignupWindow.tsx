'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setSignupWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const SignupWindows = () => {
    const [isHovered, setIsHovered] = useState(false)
    const signupWindowTimer = useAppSelector(state => state.alertWindowsReducer.signupWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(signupWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setSignupWindowTimer(signupWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [signupWindowTimer])

    return(
        <div className={styles.signup} style={{right: signupWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Вы успешно зарегестрировались и вошли!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setSignupWindowTimer(0))
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
export default SignupWindows