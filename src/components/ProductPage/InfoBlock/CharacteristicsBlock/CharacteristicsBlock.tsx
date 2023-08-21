import styles from "./index.module.scss"
import Link from "next/link"

const CharacteristicsBlock = ({characteristics} : {characteristics: IProductCharacteristic[]}) => {

    characteristics.sort((a: IProductCharacteristic, b: IProductCharacteristic) => {
        return a.line - b.line
    })

    let characteristicsBlocks: any[] = []
    characteristics.map((characteristic) => {
        if(characteristic.category){
            characteristicsBlocks.push(
                <div key={characteristic.id} className={styles.characteristics_category}>
                    {characteristic.name}
                </div>
            )
        } else{
            characteristicsBlocks.push(
                <div key={characteristic.id} className={styles.characteristics_item}>
                    <div className={styles.characteristics_item_name}>{characteristic.name}:</div>
                    <div className={styles.characteristics_item_value}>
                        {characteristic.link ? 
                            <Link className={styles.characteristics_item_value_link} href={characteristic.link}>{characteristic.value}</Link>: 
                            <span className={styles.characteristics_item_value_static}>{characteristic.value}</span>
                        }
                    </div>
                </div>
            )
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.characteristics}>
                {characteristicsBlocks}
            </div>
        </div>
    )
}
export default CharacteristicsBlock