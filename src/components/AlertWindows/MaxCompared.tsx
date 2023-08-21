'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setMaxComparedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const MaxComparedWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const maxComparedWindowTimer = useAppSelector(state => state.alertWindowsReducer.maxComparedWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(maxComparedWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setMaxComparedWindowTimer(maxComparedWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [maxComparedWindowTimer])

    return(
        <div className={styles.logout} style={{right: maxComparedWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Достигнуто максимальное количество товаров!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setMaxComparedWindowTimer(0))
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
export default MaxComparedWindow