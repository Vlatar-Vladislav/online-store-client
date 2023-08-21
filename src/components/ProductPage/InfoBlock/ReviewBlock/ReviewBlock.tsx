import { table } from "console"
import styles from "./index.module.scss"

const ReviewBlock = ({review}: {review: IProductReview[]}) => {
    review.sort((a: IProductReview, b: IProductReview) => {
        return a.line - b.line
    })
    console.log(review)

    let reviewBlocks: any[] = []
    review.map((part) => {
        if(part.image){
            reviewBlocks.push(
                <div key={part.id} className={styles.image_block}>
                    <img className={styles.image_block_img} src={`http://localhost:7000/${part.image}`}/>
                </div>
            )
        }
        if(part.title){
            reviewBlocks.push(
                <div key={part.id} className={styles.title_block}>
                    <h2 className={styles.title_block_text}>{part.title}</h2>
                </div>
            )
        }
        if(part.miniTitle){
            reviewBlocks.push(
                <div key={part.id} className={styles.minititle_block}>
                    <h2 className={styles.minititle_block_text}>{part.miniTitle}</h2>
                </div>
            )
        }
        if(part.text){
            reviewBlocks.push(
                <div key={part.id} className={styles.text_block}>
                    <p className={styles.text_block_content}>{part.text}</p>
                </div>
            )
        }
        if(part.textBlock){
            reviewBlocks.push(
                <div key={part.id} className={styles.textblock_block}>
                    <p className={styles.textblock_block_content}>{part.textBlock}</p>
                </div>
            )
        }
        if(part.table){
            reviewBlocks.push(
                <div key={part.id} className={styles.table}>
                    {part.table.map((line) => 
                        <div className={styles.table_line}>
                            <div className={styles.table_line_item}>{line.item}:</div>
                            <div className={styles.table_line_value}>{line.value}</div>
                        </div>)
                    }
                </div>
            )
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.container_content}>
                {reviewBlocks}
            </div>           
        </div>
    )
}
export default ReviewBlock