import { FC } from "react"
import styles from "./index.module.scss"
import Link from "next/link"

const ServiceMenu: FC = () => {
    return(
        <div className={styles.container}>
            <h1 className={styles.container_title}>Наши товары и услуги</h1>
            <div className={styles.service}>
                <div className={styles.service_title}>
                    <Link href={`/catalog`}>
                        <img className={styles.service_title_ico} src={'/service-ico/accessories-ico.svg'}/>
                    </Link>                    
                    <Link className={styles.service_title_name} href={`/catalog`}>Соберите своего монстра или выберите из имеющихся!</Link>
                </div>
                <div className={styles.service_description}>
                    Ищете идеальные комплектующие для своего компьютера или мечтаете о новом устройстве? Добро пожаловать в наш отдел продаж комплектующих и компьютеров! У нас вы найдете широкий ассортимент качественных компонентов: мощные процессоры, передовые видеокарты, быстрые накопители и многое другое. Если вы хотите обновить старое устройство, наши эксперты помогут вам выбрать оптимальные детали. А если вы готовы к новому компьютеру, мы предлагаем разнообразные модели для всех целей: от игр до работы.
                </div>
            </div>
            <div className={styles.service}>
                <div className={styles.service_title}>
                    <Link href={`/catalog`}>
                        <img className={styles.service_title_ico} src={'/service-ico/upgrade-ico.svg'}/>
                    </Link>                    
                    <Link className={styles.service_title_name} href={`/catalog`}>Апгрейд. Вдохните Новую Жизнь в Ваш Компьютер!</Link>
                </div>
                <div className={styles.service_description}>
                    Готовы дать вашему старому компьютеру второе дыхание? Добро пожаловать в отдел апгрейда ПК! Если ваше устройство начало подводить или вы хотите улучшить его производительность, то мы здесь, чтобы помочь. Наши специалисты помогут вам выбрать оптимальные обновления, будь то добавление большей памяти, установка быстрого SSD или улучшение графики. Мы понимаем, что каждый ПК уникален, поэтому предложим индивидуальные решения, подходящие именно вам. Восстановите быстроту и эффективность вашего компьютера с нашим отделом апгрейда ПК уже сегодня!
                </div>
            </div>
            <div className={styles.service}>
                <div className={styles.service_title}>
                    <Link href={`/catalog`}>
                        <img className={styles.service_title_ico} src={'/service-ico/diagnostics-ico.svg'}/>
                    </Link>                    
                    <Link className={styles.service_title_name} href={`/catalog`}>Ремонт и Диагностика. Быстрая и Профессиональная Помощь!</Link>
                </div>
                <div className={styles.service_description}>
                    Ищете идеальные комплектующие для своего компьютера или мечтаете о новом устройстве? Добро пожаловать в наш отдел продаж комплектующих и компьютеров! У нас вы найдете широкий ассортимент качественных компонентов: мощные процессоры, передовые видеокарты, быстрые накопители и многое другое. Если вы хотите обновить старое устройство, наши эксперты помогут вам выбрать оптимальные детали. А если вы готовы к новому компьютеру, мы предлагаем разнообразные модели для всех целей: от игр до работы.
                </div>
            </div>
            <div className={styles.service}>
                <div className={styles.service_title}>
                    <Link href={`/catalog`}>
                        <img className={styles.service_title_ico} src={'/service-ico/configurator-ico.svg'}/>
                    </Link>                    
                    <Link className={styles.service_title_name} href={`/catalog`}>Конфигуратор. Ваш верный помошник при сборе ПК!</Link>
                </div>
                <div className={styles.service_description}>
                Добро пожаловать в мир бесконечных возможностей с нашим конфигуратором ПК! Здесь вы можете создать компьютер своей мечты, абсолютно соответствующий вашим требованиям. Наш интуитивно понятный конфигуратор позволяет вам не только выбирать комплектующие, но и автоматически проверять их совместимость. Мощный процессор, невероятная графика, большой объем памяти — все в ваших руках. А если у вас возникли вопросы или вы хотите консультации, наши профессионалы всегда готовы помочь. Создайте свой уникальный ПК прямо сейчас и погрузитесь в мир высокой производительности и безграничных возможностей!
                </div>
            </div>
        </div>
    )
}
export default ServiceMenu