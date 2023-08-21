import Link from "next/link"
import styles from "./index.module.scss"

const BreadCrumbs = ({pages}: {pages?: {name: string, link: string}[]}) => {

    let list: any[] = []
    pages?.map((page, pageIndex) => {
        list.push(
            <li>
                {pageIndex === pages.length-1 ? 
                    <span className={styles.breadcrumb_text_active}>{page.name}</span> :
                    <Link className={styles.breadcrumb_text} href={page.link}>{page.name}</Link>
                }
            </li>
        )
    })

    return(
        <div className={styles.container}>
            <ul className={styles.breadcrumb}>
                <li><Link className={styles.breadcrumb_home} href={`http://localhost:3000`}><img className={styles.ico} src="/ico/home-ico.svg"/></Link></li>
                {list}
            </ul>
        </div>
    )
}

export default BreadCrumbs