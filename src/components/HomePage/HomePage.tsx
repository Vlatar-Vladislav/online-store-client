import styles from "./index.module.scss"
import ServiceMenu from "./ServiceMenu/ServiceMenu"
import ProductsBlock from "./ProductsBlock/ProductsBlock"
import { getExclusiveProducts } from "@/src/services/productsService"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"

const HomePage = async () => {
    const hardware = await getExclusiveProducts('hardware')
    const parts = await getExclusiveProducts('parts')
    const accessories = await getExclusiveProducts('accessories')

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