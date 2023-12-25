import { FC } from "react"
import styles from "./index.module.scss"
import ImagesBlock from "./ImagesBlock/ImagesBlock"
import DescriptionBlock from "./DescriptionBlock/DescriptionBlock"
import 'moment/locale/ru'
import InfoBlock from "./InfoBlock/InfoBlock"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"
import ProductsBlock from "../HomePage/ProductsBlock/ProductsBlock"
import { getProducts } from "@/src/services/productsService"

interface IProductPage {
    product: any
}

const ProductPage: FC<IProductPage> = async ({product}: {product: IProduct}) => {
    const stars = ['★', '★', '★', '★', '★']
    let sum = 0
    let one = 0
    let two = 0
    let three = 0
    let four = 0
    let five = 0

    product.comments.map((comment: IProductComment) => {
        switch (comment.rating) {
            case 5:
                five += 1
                sum += 5
                break;
            case 4:
                four += 1
                sum += 4
                break; 
            case 3:
                three += 1
                sum += 3
                break;
            case 2:
                two += 1
                sum += 2
                break;
            case 1:
                one += 1
                sum += 1
                break; 
            default:
                break;
        }
    })

    const products = await getProducts(product.mainCategory, 1, 10, null, null, null, '')

    return(
        <main className={styles.main}>
            <BreadCrumbs pages={[{name: product.name, link: `/${product.id}`}]}/>
            <div className={styles.information_block}>
                <ImagesBlock images={product.images}/>
                <DescriptionBlock product={product}/>
            </div>
            <InfoBlock product={product}/>
            <ProductsBlock header={"Также рекомендуемые товары"} link={`/catalog`} products={product.recommendedProducts}/>
            <ProductsBlock header={"Другие товары из данной категории"} link={`/catalog/${product.mainCategory}`} products={products.rows}/>
        </main>
    )
}
export default ProductPage
