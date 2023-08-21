'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setComparedAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const ComparedAddWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const comparedAddWindowTimer = useAppSelector(state => state.alertWindowsReducer.comparedAddWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(comparedAddWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setComparedAddWindowTimer(comparedAddWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [comparedAddWindowTimer])

    return(
        <div className={styles.product_add} style={{right: comparedAddWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Товар был добавлен / удалён из сравнения!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setComparedAddWindowTimer(0))
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
export default ComparedAddWindow