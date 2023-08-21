import Image from "next/image"
import styles from "./index.module.scss"
import Link from "next/link"

interface ICategory {
    title: string
    description: string
    categories: {
        name: string
        img: string,
        link: string
    }[]
}

const CategoryBlock = ({category}: {category: ICategory}) => {
    return(
        <div className={styles.category}>
            <div className={styles.category_name}>{category.title}</div>
            <div className={styles.category_description}>{category.description}</div>
            <div className={styles.category_items}>
                {category.categories.map((category) =>
                    <div className={styles.category_items_slide}>
                        <Link href={`http://localhost:3000/catalog/${category.link}`} className={styles.category_item}>
                            <div className={styles.category_item_image}>
                                <img className={styles.category_item_image_img} src={`./image/${category.img}`}/>
                            </div>
                            <div className={styles.category_item_name}>
                                <span className={styles.category_item_name_text}>{category.name}</span>
                            </div>
                        </Link>
                    </div>                    
                )}
            </div>
        </div>
    )
}
export default CategoryBlock