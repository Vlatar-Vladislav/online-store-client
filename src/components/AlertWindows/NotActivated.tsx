'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const NotActivatedWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const notActivatedWindowTimer = useAppSelector(state => state.alertWindowsReducer.notActivatedWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(notActivatedWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setNotActivatedWindowTimer(notActivatedWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [notActivatedWindowTimer])

    return(
        <div className={styles.logout} style={{right: notActivatedWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            !!!ВНИМАНИЕ!!! Требуется активация аккаунта!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setNotActivatedWindowTimer(0))
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
export default NotActivatedWindow