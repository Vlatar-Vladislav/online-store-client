'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setReviewDeleteWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const ReviewDeleteWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const reviewDeleteWindowTimer = useAppSelector(state => state.alertWindowsReducer.reviewDeleteWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(reviewDeleteWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setReviewDeleteWindowTimer(reviewDeleteWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [reviewDeleteWindowTimer])

    return(
        <div className={styles.product_add} style={{right: reviewDeleteWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Отзыв был удалён!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setReviewDeleteWindowTimer(0))
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
export default ReviewDeleteWindow