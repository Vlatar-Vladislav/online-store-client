'use client'
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { isAuthWindowOpen, isCartWindowOpen, isComparedWindowOpen, isFavoritesWindowOpen, isProfileWindowOpen, setMenuWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../ModalWindows/WindowLogo/WindowLogo"
import Link from "next/link"
import { getMe } from "@/src/services/userService"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"

const Menu = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const isMenuWindowOpen = useAppSelector(state => state.modalWindowsReducer.isMenuWindowOpen)
    const dispatch = useAppDispatch()

    const profileOnClick = async () => {
        if(isAuth){
            const user = await getMe()
            if(user){
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                dispatch(isProfileWindowOpen(true))
                dispatch(setMenuWindowOpen(false))
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
                dispatch(setMenuWindowOpen(false))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
            dispatch(setMenuWindowOpen(false))
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
                    dispatch(setMenuWindowOpen(false))
                } else{
                    dispatch(isFavoritesWindowOpen(true))
                    dispatch(setMenuWindowOpen(false))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
                dispatch(setMenuWindowOpen(false))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
            dispatch(setMenuWindowOpen(false))
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
                    dispatch(setMenuWindowOpen(false))
                } else{
                    dispatch(isComparedWindowOpen(true))
                    dispatch(setMenuWindowOpen(false))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
                dispatch(setMenuWindowOpen(false))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
            dispatch(setMenuWindowOpen(false))
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
                    dispatch(setMenuWindowOpen(false))
                } else{
                    dispatch(isCartWindowOpen(true))
                    dispatch(setMenuWindowOpen(false))
                }
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
                dispatch(setMenuWindowOpen(false))
            }
        } else{
            dispatch(isAuthWindowOpen(true))
            dispatch(setMenuWindowOpen(false))
        }
    }

    return(
        <>
            <div className={styles.modal} style={{opacity: isMenuWindowOpen ? 1 : 0, pointerEvents: isMenuWindowOpen ? 'all' : 'none'}} onClick={() => {dispatch(setMenuWindowOpen(false))}}></div>
            <div className={styles.modal_container} style={{left: isMenuWindowOpen ? '0px' : '-500px'}} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.content}>
                    <div className={styles.content_group}>
                        <button className={styles.content_item} onClick={profileOnClick}>Аккаунт</button>
                        <button className={styles.content_item} onClick={cartOnClick}>Корзина</button>
                        <button className={styles.content_item} onClick={favoriteOnClick}>Избранное</button>
                        <button className={styles.content_item} onClick={comparedOnClick}>Сравнение</button>
                    </div>
                    <div className={styles.content_group}>
                        <Link className={styles.content_item} href={`http://localhost:3000`} onClick={() => {dispatch(setMenuWindowOpen(false))}}>Главная</Link>
                        <Link className={styles.content_item} href={`http://localhost:3000/catalog`} onClick={() => {dispatch(setMenuWindowOpen(false))}}>Каталог</Link>
                        <Link className={styles.content_item} href={`http://localhost:3000/catalog`}>О нас</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu