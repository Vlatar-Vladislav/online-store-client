import { getProducts } from '@/src/services/productsService';
import styles from './page.module.scss'
import ProductPage from '@/src/components/ProductPage/ProductPage';
import CategoryPage from '@/src/components/CategoryPage/CategoryPage';

type Props = {
    params: {
      category: string
    };
};
// // Эта строка пока тестовая !!!!!!!!!!
// export const revalidate = 5

// export async function generateStaticParams() {
//     const ids: {id: number}[] = await getAlliD()
//     return ids.map((id) => {
//         slug: id
//     })
// }

export default async function Cateqory({params: {category}}: Props) {
    // const products = await getProducts(category, 1, 50)

    return (
        <div className={styles.page}>
            <CategoryPage category={category}/>
            {/* {products.rows.map((product, productIndex) =>
                <div>{`${productIndex} ${product.id}`}</div>
            )} */}
        </div>
    )
}
