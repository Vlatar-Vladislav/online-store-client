'use client'

import React, { FC, useEffect } from "react"
import styles from "./index.module.scss"
import { Bagel_Fat_One } from 'next/font/google'
import { isAuthWindowOpen, isCartWindowOpen, isComparedWindowOpen, isFavoritesWindowOpen, isProfileWindowOpen, setMenuWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setIsAuth, setTimerSendActivationLink, setUser } from "@/src/store/reducers/authSlice"
import Link from "next/link"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { getMe } from "@/src/services/userService"

const bagelFatOne = Bagel_Fat_One({weight: "400", style: "normal", display: "swap", fallback: ["sans-serif"], subsets: ["latin"], preload: false})

const Header: FC = () => {
    const { isAuth, user, timerSendActivationLink } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch();

    // Таймер для кнопки повторной отправки письма
    useEffect(() => {
        if(timerSendActivationLink > 0){
            const interval = setInterval(() => {
                dispatch(setTimerSendActivationLink(timerSendActivationLink - 1))
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [timerSendActivationLink])

    // Получение пользователя при старте приложения
    useEffect(() => {
        async function getData() {
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
            } else{
                dispatch(setIsAuth(false))
            }
        }
        getData()
    }, [])

    useEffect(() => {
        async function getData() {
            if(isAuth){                
                const user = await getMe()
                if(user){
                    dispatch(setIsAuth(true))
                    dispatch(setUser(user))
                } else{
                    dispatch(setIsAuth(false))
                }
            }
            
        }
        const interval = setInterval(() => {
            getData()
        }, 600000)
        return () => {
            clearInterval(interval)
        }
    })

    // const [scroll, setScroll] = React.useState(0);
    // const handleScroll = () => {
    //     setScroll(window.scrollY);
    // };
    // React.useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    const profileOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                dispatch(isProfileWindowOpen(true))
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    const favoriteOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                if(!user.isActivated){
                    dispatch(setNotActivatedWindowTimer(3))
                    dispatch(isProfileWindowOpen(true))
                } else{
                    dispatch(isFavoritesWindowOpen(true))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    const comparedOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                if(!user.isActivated){
                    dispatch(setNotActivatedWindowTimer(3))
                    dispatch(isProfileWindowOpen(true))
                } else{
                    dispatch(isComparedWindowOpen(true))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    const cartOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                if(!user.isActivated){
                    dispatch(setNotActivatedWindowTimer(3))
                    dispatch(isProfileWindowOpen(true))
                } else{
                    dispatch(isCartWindowOpen(true))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    return(      
        <header className={styles.header}>
            <div style={{height: 50, backgroundColor: "rgb(9, 9, 9)"}}></div>
            <div className={styles.header_top}>
                {/* <div className={styles.header_top_logo}> */}
                <Link href={'/'} className={styles.header_top_logo}>
                    <h1 className={`${bagelFatOne.className} ${styles.logo_1}`}>Nenaeb</h1>
                    <h1 className={`${bagelFatOne.className} ${styles.logo_2}`}>alovo</h1>
                </Link>
                {/* </div> */}
                <div className={styles.header_top_menu}>
                    <button className={styles.header_top_menu_button} onClick={favoriteOnClick}>
                        <img className={styles.svg}src={"/ico/favorite-ico.svg"}/>
                        {isAuth && <div className={styles.favorite_number}>{user.favoriteProducts?.length === 0 || !user.favoriteProducts?.length ? 0 : user.favoriteProducts?.length}</div>}
                    </button>
                    <button className={styles.header_top_menu_button} onClick={comparedOnClick}>
                        <img className={styles.svg}src={"/ico/scales-ico.svg"}/>
                        {isAuth && <div className={styles.favorite_number}>{user.comparedProducts?.length === 0 || !user.comparedProducts?.length ? 0 : user.comparedProducts?.length}</div>}
                    </button>                    
                    <button className={styles.header_top_menu_button} onClick={profileOnClick}>
                        <img className={styles.svg}src={"/ico/profile-ico.svg"}/>
                    </button>
                    <button className={styles.header_top_menu_button} onClick={cartOnClick}>
                        <img className={styles.svg} src={"/ico/cart-ico.svg"}/>
                        {isAuth && <div className={styles.favorite_number}>{user.cartItems?.length === 0 || !user.cartItems?.length ? 0 : user.cartItems?.length}</div>}
                    </button>
                </div>                
            </div>
            <div className={styles.header_bottom}>
                <button className={`${styles.header_bottom_button} ${bagelFatOne.className}`} onClick={() => {
                    dispatch(setMenuWindowOpen(true))
                }}>Меню</button>
                <Link href={`/`} className={`${styles.header_bottom_button} ${bagelFatOne.className}`}>Главная</Link>
                <Link href={`/catalog`} className={`${styles.header_bottom_button} ${bagelFatOne.className}`}>Каталог</Link>
                <Link href={`/catalog`} className={`${styles.header_bottom_button} ${bagelFatOne.className}`}>Конфигуратор</Link>
            </div>
        </header>
    )
}
export default Header