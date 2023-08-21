import { FC } from 'react'
import styles from './index.module.scss'

const ArrowLeft: FC<{disabled: boolean}> = ({disabled}) => {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={disabled ? styles.path_fix : styles.path} fillRule="evenodd" clipRule="evenodd" d="M9.00043 23.6272L9.00021 23.6274L11.8286 26.4558L11.8289 26.4556L31.6276 46.2544L34.456 43.4259L14.6573 23.6272L34.4561 3.82843L31.6276 1L11.8289 20.7988L11.8286 20.7985L9.00019 23.627L9.00043 23.6272Z" fill="rgb(224, 145, 0)"/>
    </svg>
  )
}

export default ArrowLeft