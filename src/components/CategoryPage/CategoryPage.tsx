import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"
import FiltersBlock from "./FiltersBlock/FiltersBlock"
import FiltersInfoBlock from "./FiltersInfoBlock/FiltersInfoBlock"
import PaginationBlock from "./PaginationBlock/PaginationBlock"
import SearchBlock from "./SearchBlock/SearchBlock"
import styles from "./index.module.scss"

const CategoryPage = ({category}: {category: string}) => {
    let breadCrumb;
    switch (category) {
        case 'pc':
            breadCrumb = 'ПК';
            break;
        case 'laptop':
            breadCrumb = 'Ноутбуки';
            break;
        case 'station':
            breadCrumb = 'Станции';
            break;
        case 'processor':
            breadCrumb = 'Процессоры';
            break;
        case 'videocard':
            breadCrumb = 'Видеокарты';
            break;
        case 'motherboard':
            breadCrumb = 'Материнские платы';
            break;
        case 'ram':
            breadCrumb = 'Оперативная память';
            break;
        case 'cooling':
            breadCrumb = 'Охлаждение';
            break;
        case 'powerunit':
            breadCrumb = 'Блоки питания';
            break;
        case 'case':
            breadCrumb = 'Корпусы';
            break;
        case 'ssd':
            breadCrumb = 'SSD';
            break;
        case 'hdd':
            breadCrumb = 'HDD';
            break;
        case 'ventilator':
            breadCrumb = 'Вентиляторы';
            break;
        case 'mouse':
            breadCrumb = 'Компьютерные мыши';
            break;
        case 'microphone':
            breadCrumb = 'Микрофоны';
            break;
        case 'headphones':
            breadCrumb = 'Наушники';
            break;
        case 'monitor':
            breadCrumb = 'Мониторы';
            break;
        case 'flashDrive':
            breadCrumb = 'Флешки';
            break;
        case 'mousepad':
            breadCrumb = 'Коврики для мыши';
            break;
        case 'chair':
            breadCrumb = 'Кресла';
            break;
        case 'table':
            breadCrumb = 'Столы';
            break;
        case 'networkfilter':
            breadCrumb = 'Сетевые фильтры';
            break;
        default:
            breadCrumb = 'Главная';
            break;
    }

    return(
        <main className={styles.main}>
            <BreadCrumbs pages={[{name: 'Каталог', link: 'http://localhost:3000/catalog'}, {name: breadCrumb, link: `http://localhost:3000/catalog/${category}`}]}/>
            <SearchBlock/>
            <FiltersInfoBlock/>
            <div className={styles.main_products}>
                <FiltersBlock category={category}/>
                <PaginationBlock category={category}/>
            </div>            
        </main>
    )
}
export default CategoryPage