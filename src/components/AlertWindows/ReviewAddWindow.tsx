'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setReviewAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const ReviewAddWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const reviewAddWindowTimer = useAppSelector(state => state.alertWindowsReducer.reviewAddWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(reviewAddWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setReviewAddWindowTimer(reviewAddWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [reviewAddWindowTimer])

    return(
        <div className={styles.product_add} style={{right: reviewAddWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Отзыв был добавлен / изменён!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setReviewAddWindowTimer(0))
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
export default ReviewAddWindow