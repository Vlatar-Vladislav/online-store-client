import styles from './page.module.scss'
import ProductPage from '@/src/components/ProductPage/ProductPage';
import { getProductById } from '@/src/services/productsService';

type Props = {
    params: {
      id: number;
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

export default async function Product({params: {id}}: Props) {
    const product = await getProductById(id)

    return (
        <div className={styles.page}>
            <ProductPage product={product}/>
        </div>
    )
}
