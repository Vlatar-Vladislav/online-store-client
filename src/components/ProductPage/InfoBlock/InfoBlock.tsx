'use client'

import { useState } from "react"
import styles from "./index.module.scss"
import ReviewsBlock from "./ReviewsBlock/ReviewsBlock"
import { useAppSelector } from "@/src/hooks/redux"
import CharacteristicsBlock from "./CharacteristicsBlock/CharacteristicsBlock"
import ReviewBlock from "./ReviewBlock/ReviewBlock"

const InfoBlock = ({product} : {product: IProduct}) => {
// const InfoBlock = () => {
    const [reviewOpen, setReviewOpen] = useState(false)
    const [reviewsOpen, setReviewsOpen] = useState(false)
    const [characteristicsOpen, setСharacteristicsOpen] = useState(true)
    // const product = useAppSelector(state => state.productReducer.selectProduct)

return(
    <div id={'reviews'} className={styles.container}>
        <div className={styles.menu}>
            <button className={styles.menu_button} onClick={() => {
                setReviewOpen(true)
                setСharacteristicsOpen(false)
                setReviewsOpen(false)                
            }}>Обзор</button>
            <button className={styles.menu_button} onClick={() => {
                setСharacteristicsOpen(true)
                setReviewOpen(false)
                setReviewsOpen(false)                
            }}>Характеристики</button>
            <button className={styles.menu_button} onClick={() => {
                setReviewsOpen(true)
                setReviewOpen(false)
                setСharacteristicsOpen(false)
            }}>Отзывы</button>
        </div>
        {reviewsOpen && <ReviewsBlock productId={product.id}/>}
        {characteristicsOpen && <CharacteristicsBlock characteristics={product.characteristics}/>}
        {reviewOpen && <ReviewBlock review={product.review}/>}
    </div>)
}
export default InfoBlock