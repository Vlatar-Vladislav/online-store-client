import { FC } from 'react'
import styles from './index.module.scss'


const ArrowLeftСircle: FC<{disabled: boolean}> = ({disabled}) => {
  return (
    <svg className={styles.svg} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_240_43)">
    <path className={disabled ? styles.path_fix : styles.path} fillRule="evenodd" clipRule="evenodd" d="M24 45C12.402 45 3 35.598 3 24C3 12.402 12.402 3 24 3C35.598 3 45 12.402 45 24C45 35.598 35.598 45 24 45ZM24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48ZM12.615 23.7288L28.1714 39.2852L30.9998 36.4567L15.4435 20.9004L12.615 23.7288ZM31 11L18.2721 23.7279L15.4437 20.8995L28.1716 8.17157L31 11Z" fill="rgb(224, 145, 0)"/>
    </g>
    <defs>
    <clipPath id="clip0_240_43">
    <rect width="48" height="48" fill="white" transform="matrix(-1 0 0 1 48 0)"/>
    </clipPath>
    </defs>
    </svg>
  )
}

export default ArrowLeftСircle