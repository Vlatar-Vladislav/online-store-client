import styles from "./index.module.scss"
import { Bagel_Fat_One } from 'next/font/google'

const bagelFatOne = Bagel_Fat_One({weight: "400", style: "normal", display: "swap", fallback: ["sans-serif"], subsets: ["latin"], preload: false})

const WindowLogo = () => {
    return(
        <div className={styles.header}>
            <div className={styles.logo}>
                <h1 className={`${bagelFatOne.className} ${styles.logo_1}`}>Nenaeb</h1>
                <h1 className={`${bagelFatOne.className} ${styles.logo_2}`}>alovo</h1>
            </div>    
        </div>
    )       
}
export default WindowLogo