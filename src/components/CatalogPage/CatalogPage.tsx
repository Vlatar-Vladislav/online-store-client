import Image from "next/image"
import styles from "./index.module.scss"
import CategoryBlock from "./CategoryBlock/CategoryBlock"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"

const CatalogPage = () => {
    const hardware = {title: "Готовые сборки", description: 'Готовые сборки – это идеальное решение для тех, кто ценит своё время и хочет получить максимальную производительность без лишних хлопот. Наши сборки учитывают самые современные технологии и требования, гарантируя вам удовлетворение потребностей в высокопроизводительных компьютерных системах. От игровых монстров до творческих рабочих станций – наши готовые сборки идеально подойдут для ваших задач. Выбирайте из нашего многообразия моделей и наслаждайтесь отличной производительностью без лишних хлопот.', 
    categories: [
        {name: 'ПК', img: 'computer-1.png', link: 'pc'}, 
        {name: 'Ноутбуки', img: 'computer-2.png', link: 'laptop'}, 
        {name: 'Станции', img: 'computer-3.png', link: 'station'}
    ]}
    const parts = {title: "Комплектующие", description: 'Процессоры, видеокарты, материнские платы и множество других комплектующих – это кирпичики, из которых строится ваш идеальный компьютер. Наш магазин предоставляет вам уникальную возможность подобрать каждый элемент вашего ПК индивидуально, чтобы он полностью соответствовал вашим потребностям. Независимо от того, ищете ли вы максимальную производительность для игр, обработки медиа или повседневных задач, наши комплектующие помогут вам создать идеальную систему, а богатый выбор гарантирует, что вы найдете именно то, что нужно.', 
    categories: [
        {name: 'Процессоры', img: 'cpu-1.png', link: 'processor'},
        {name: 'Видеокарты', img: 'videocard-1.png', link: 'videocard'}, 
        {name: 'Материнские платы', img: 'cpu-1.png', link: 'motherboard'},
        {name: 'ОЗУ', img: 'videocard-1.png', link: 'ram'},
        {name: 'Озлаждение', img: 'cpu-1.png', link: 'cooling'}, 
        {name: 'Блоки питания', img: 'videocard-1.png', link: 'powerunit'},
        {name: 'Корпусы', img: 'cpu-1.png', link: 'case'},
        {name: 'SSD', img: 'videocard-1.png', link: 'ssd'}, 
        {name: 'HDD', img: 'cpu-1.png', link: 'hdd'},
        {name: 'Вентиляторы', img: 'videocard-1.png', link: 'ventilator'}
    ]}
    const accessories = {title: "Аксессуары и переферия", description: 'Детали важны, и в мире компьютерной техники это особенно верно. Наши аксессуары и периферийные устройства – это именно те маленькие вещи, которые делают ваш опыт использования компьютера по-настоящему удобным и приятным. Выбирайте из широкого спектра продуктов, включая мыши, микрофоны, наушники, мониторы и многое другое. У нас есть все, чтобы вы могли настроить свою рабочую зону так, как вам нравится, и создать идеальное рабочее или игровое пространство.', 
    categories: [
        {name: 'Компьютерные мыши', img: 'cpu-1.png', link: 'mouse'},
        {name: 'Микрофоны', img: 'videocard-1.png', link: 'microphone'}, 
        {name: 'Наушники', img: 'cpu-1.png', link: 'headphones'},
        {name: 'Мониторы', img: 'videocard-1.png', link: 'monitor'},
        {name: 'Флешки', img: 'cpu-1.png', link: 'flashDrive'}, 
        {name: 'Коврики для мыши', img: 'videocard-1.png', link: 'mousepad'},
        {name: 'Кресла', img: 'cpu-1.png', link: 'chair'},
        {name: 'Столы', img: 'videocard-1.png', link: 'table'}, 
        {name: 'Сетевые фильтры', img: 'cpu-1.png', link: 'networkfilter'}
    ]}

    return(
        <main className={styles.main}>
            <BreadCrumbs pages={[{name: 'Каталог', link: 'http://localhost:3000/catalog'}]}/>
            <CategoryBlock category={hardware}/>
            <CategoryBlock category={parts}/>
            <CategoryBlock category={accessories}/>
        </main>
    )
}
export default CatalogPage