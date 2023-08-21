import { FC } from 'react'
import styles from './index.module.scss'

const ArrowRightСircle: FC<{disabled: boolean}> = ({disabled}) => {
  return (
    <svg className={styles.svg} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_240_48)">
    <path className={disabled ? styles.path_fix : styles.path} fillRule="evenodd" clipRule="evenodd" d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45ZM24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM35.385 23.7288L19.8286 39.2852L17.0002 36.4567L32.5565 20.9004L35.385 23.7288ZM17 11L29.7279 23.7279L32.5563 20.8995L19.8284 8.17157L17 11Z" fill="rgb(224, 145, 0)"/>
    </g>
    <defs>
    <clipPath id="clip0_240_48">
    <rect width="48" height="48" fill="white"/>
    </clipPath>
    </defs>
    </svg>
  )
}

export default ArrowRightСircle