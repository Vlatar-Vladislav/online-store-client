import Link from "next/link"
import styles from "./index.module.scss"

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.footer_top}>
                <div className={styles.footer_top_category}>
                    <h5 className={styles.footer_top_category_name}>Компания</h5>
                    <span className={styles.footer_top_category_item}>О нас</span>
                    <span className={styles.footer_top_category_item}>Контакты</span>
                    <span className={styles.footer_top_category_item}>Почему мы</span>
                    <span className={styles.footer_top_category_item}>Вакансии</span>
                </div>
                <div className={styles.footer_top_category}>
                    <h5 className={styles.footer_top_category_name}>Услуги и товары</h5>
                    <span className={styles.footer_top_category_item}>Комплектующие</span>
                    <span className={styles.footer_top_category_item}>Готовые сборки</span>
                    <span className={styles.footer_top_category_item}>Аксессуары и переферия</span>
                    <span className={styles.footer_top_category_item}>Апргрейд</span>
                    <span className={styles.footer_top_category_item}>Ремонт диагностика</span>
                    <span className={styles.footer_top_category_item}>Сборка на заказ</span>
                    <span className={styles.footer_top_category_item}>Конфигуратор</span>
                </div>
                <div className={styles.footer_top_category}>
                    <h5 className={styles.footer_top_category_name}>Поддержка</h5>
                    <span className={styles.footer_top_category_item}>FAQ</span>
                    <span className={styles.footer_top_category_item}>Доставка</span>
                    <span className={styles.footer_top_category_item}>Оплата</span>
                    <span className={styles.footer_top_category_item}>Гарантия</span>
                </div>                
            </div>
            <div className={styles.footer_bottom}>
                <div className={styles.footer_bottom_network}>
                    <Link className={styles.footer_bottom_network_link} href="#">
                        <img className={styles.footer_bottom_network_img} src={'/social-network/facebook.svg'}/>
                    </Link>
                    <Link className={styles.footer_bottom_network_link} href="#">
                        <img className={styles.footer_bottom_network_img} src={'/social-network/instagram.svg'}/>
                    </Link>
                    <Link className={styles.footer_bottom_network_link} href="#">
                        <img className={styles.footer_bottom_network_img} src={'/social-network/whatsapp.svg'}/>
                    </Link>
                    <Link className={styles.footer_bottom_network_link} href="#">
                        <img className={styles.footer_bottom_network_img} src={'/social-network/youtube.svg'}/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer