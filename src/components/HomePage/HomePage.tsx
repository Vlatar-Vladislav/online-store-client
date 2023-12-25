'use client'

import styles from "./index.module.scss"
import ServiceMenu from "./ServiceMenu/ServiceMenu"
import ProductsBlock from "./ProductsBlock/ProductsBlock"
import { getExclusiveProducts } from "@/src/services/productsService"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"
import { useEffect, useState } from "react"

const HomePage = async () => {
    const hardware = await getExclusiveProducts('hardware')
    const parts = await getExclusiveProducts('parts')
    const accessories = await getExclusiveProducts('accessories')
    // const [parts, setParts] = useState<any>()
    // const [hardware, setHardware] = useState<any>()
    // const [accessories, setAccessories] = useState<any>()

    // useEffect(() => {
    //     const getData = async () => {
    //         setParts(await getExclusiveProducts('parts'))
    //         setHardware(await getExclusiveProducts('hardware'))
    //         setAccessories(await getExclusiveProducts('accessories'))
    //     }
    //     getData()
    // }, [])

    return(
        <main className={styles.main}>
            <BreadCrumbs/>
            <ProductsBlock header={"Готовые сборки"} link={"/catalog/"} description={"Твой тостер ничего не тянет? Не беда! Купи у нас другой, и всё будет так же хреново!"} products={hardware}/>
            <ProductsBlock header={"Комплектующие"} link={"/catalog/"} description={"Любые запчасти для вашей печки"} products={parts}/>
            <ProductsBlock header={"Переферия и аксессуары"} link={"/catalog/"} description={"Хочешь 999FPS в косынке? Накупи всякого барахла для своего тостера!"} products={accessories}/>
            <ServiceMenu/>
        </main>
    )
}
export default HomePage