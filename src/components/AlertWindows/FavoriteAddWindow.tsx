'use client'

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { setFavoriteAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const FavoriteAddWindow = () => {
    const [isHovered, setIsHovered] = useState(false)
    const favoriteAddWindowTimer = useAppSelector(state => state.alertWindowsReducer.favoriteAddWindowTimer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(favoriteAddWindowTimer !== 0){
            const interval = setInterval(() => {
                dispatch(setFavoriteAddWindowTimer(favoriteAddWindowTimer - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [favoriteAddWindowTimer])

    return(
        <div className={styles.product_add} style={{right: favoriteAddWindowTimer !== 0 || isHovered ? '40px' : '-1000px'}}>
            Товар был добавлен / удалён из избранного!
            <button className={styles.cross_button} onClick={() => {
                setIsHovered(false)
                dispatch(setFavoriteAddWindowTimer(0))
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
export default FavoriteAddWindow