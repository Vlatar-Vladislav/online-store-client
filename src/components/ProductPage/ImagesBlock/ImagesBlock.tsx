'use client'

import { FC, useState } from "react"
import styles from "./index.module.scss"
import Image from "next/image"
import ArrowRight from "../../svg/Arrow/ArrowRight"
import ArrowLeft from "../../svg/Arrow/ArrowLeft"

interface IImagesBlock {
    images: string[]
}

const ImagesBlock: FC<IImagesBlock> = ({images}) => {
    const [slideIndex, setSlideIndex] = useState(0)

    const incrementSlideIndex = () => {
        setSlideIndex(slideIndex + 1)
    }
    const decrementSlideIndex = () => {
        setSlideIndex(slideIndex - 1)
    }

    return(
        <div className={styles.container}>
        {images.length === 1 ?
            // <div className={styles.container_carousel}>
            <div className={styles.container_carousel_slide}>
                <img src={`http://localhost:7000/${images[0]}`} className={styles.image}/>
                {/* <Image unoptimized src={`http://localhost:7000/${images[0]}`} alt={`${images[0]}`} width={150} height={150} className={styles.image}/> */}
            </div>
            // </div>
             : 
            <>
                <button disabled={slideIndex !== 0 ? false : true} className={styles.container_button_left} onClick={decrementSlideIndex}>
                    <ArrowLeft disabled={slideIndex !== 0 ? false : true}/>
                </button>
                <div className={styles.container_carousel}>
                    {images.map((image, imageIndex) => 
                        <div className={styles.container_carousel_slide} key={imageIndex} style={{transform: `translateX(${(-slideIndex)*100}%)`, transition: `transform ${1}s`}}>
                            <Image unoptimized src={`http://localhost:7000/${image}`} alt={`${images[0]}`} width={0} height={0} className={styles.image} loading="eager" priority={true}/>
                        </div>
                    )}
                </div>
                <button disabled={slideIndex < images.length-1 ? false : true} className={styles.container_button_right} onClick={incrementSlideIndex}>
                    <ArrowRight disabled={slideIndex < images.length-1 ? false : true}/>
                </button>
                <div className={styles.dot_container}>
                    {images.map((image, imageIndex) => 
                        <div key={imageIndex} className={imageIndex === slideIndex ? styles.dot_active : styles.dot} onClick={() => setSlideIndex(imageIndex)}></div>
                    )}
                </div>
            </>
        }</div>
    )
}
export default ImagesBlock