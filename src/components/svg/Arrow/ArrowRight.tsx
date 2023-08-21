import { FC } from 'react'
import styles from './index.module.scss'

const ArrowRight: FC<{disabled: boolean}> = ({disabled}) => {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={disabled ? styles.path_fix : styles.path} fillRule="evenodd" clipRule="evenodd" d="M38.9996 23.6272L38.9998 23.6274L36.1714 26.4558L36.1711 26.4556L16.3724 46.2544L13.544 43.4259L33.3427 23.6272L13.5439 3.82843L16.3724 1L36.1711 20.7988L36.1714 20.7985L38.9998 23.627L38.9996 23.6272Z" fill="rgb(224, 145, 0)"/>
    </svg>
  )
}

export default ArrowRight