'use client'
import { useEffect, useState } from "react"
import styles from "./index.module.scss"
import { getFilters, getProducts } from "@/src/services/productsService"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setCurrentPage, setFilters, setFiltersChecked, setProducts, setTotalProductsNumber } from "@/src/store/reducers/catalogPageSlice"
import Link from "next/link"
import { setAddToCartProductId, setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { addComparedProducts, addFavoriteProducts, getMe } from "@/src/services/userService"
import { isAddToCartWindowOpen, isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setComparedAddWindowTimer, setFavoriteAddWindowTimer, setMaxComparedWindowTimer, setNotActivatedWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import Description from "./Description/Description"

const PaginationBlock = ({category}: {category: string}) => {
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    const {currentPage, totalProductsNumber, limit, products, filters, price, search, sort} = useAppSelector(state => state.catalogPageReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function getData() {
            if(filters){
                const response = await getProducts(category, currentPage, limit, filters, price, search, sort)
                if(response){
                    dispatch(setTotalProductsNumber(response.count))
                    dispatch(setProducts(response.rows))
                }
            }
        }
        getData()
    }, [currentPage, filters, price, search, sort])

    const totalPages = Math.ceil(totalProductsNumber / limit);
    let buttons = [];

    const addButton = (text: string | number, page: number, isActive: boolean) => (
        <button
            key={text}
            className={isActive ? styles.pagination_button_activated : styles.pagination_button}
            onClick={() => dispatch(setCurrentPage(page))}
        >
            {text}
        </button>
    );

    if(totalPages < 9){
        for (let p = 1; p <= totalPages; p++) {
            buttons.push(addButton(p, p, currentPage === p));
        }
    } else {
        buttons.push(addButton(1, 1, currentPage === 1));
        if(currentPage > totalPages - 5 || (currentPage >= 6 && currentPage <= totalPages - 5)){
            buttons.push(<button key={'1...'} className={styles.pagination_button} onClick={() => {
                dispatch(setCurrentPage(currentPage - 3))
            }}>...</button>);
        }

        if(currentPage <= 5){
            for(let p = 2; p < 8; p++){
                buttons.push(addButton(p, p, currentPage === p));
            }
        } else if(currentPage > totalPages - 5){
            for(let p = totalPages - 6; p <= totalPages - 1; p++){
                buttons.push(addButton(p, p, currentPage === p));
            }
        } else if(currentPage > 5 || currentPage <= totalPages - 5){
            for(let p = currentPage - 2; p <= currentPage + 2; p++){
                buttons.push(addButton(p, p, currentPage === p));
            }
        }

        if (currentPage <= 5 || (currentPage > 5 && currentPage <= totalPages - 5)) {
            buttons.push(<button key={'2...'} className={styles.pagination_button} onClick={() => {
                dispatch(setCurrentPage(currentPage + 3))
            }}>...</button>);
        }
        buttons.push(addButton(totalPages, totalPages, currentPage === totalPages));
    }

    return(
        <div className={styles.container}>
            <Description category={category}/>
            {products && (products?.length === 0 ? <div className={styles.container_no}>Товаров не найдено!</div> : products.map((product, productIndex) => 
                <div className={styles.product}>
                    <Link className={styles.product_image} href={`/${product.id}`}>
                        <img className={styles.product_image_img} src={`http://localhost:7000/${product.images[0]}`}/>
                    </Link>                    
                    <Link className={styles.product_name_link} href={`/${product.id}`}>
                        <h1 className={styles.product_name}>{product.name}</h1>
                    </Link>
                    <div className={styles.product_description}>
                        <div className={styles.product_description_price}>
                            {product.pastPrice && <h3 className={styles.product_description_price_past}>{product.pastPrice}$</h3>}
                            <h3 className={styles.product_description_price_current}>{product.currentPrice}$</h3>
                        </div>
                        <button className={styles.product_description_buy} onClick={async () => {
                            if(isAuth){
                                if(user.isActivated){
                                    const user = await getMe()
                                    if(user){
                                        dispatch(setIsAuth(true))                                    
                                        dispatch(setUser(user))
                                        dispatch(setAddToCartProductId(product.id))
                                        dispatch(isAddToCartWindowOpen(true))
                                    } else {
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }                                        
                                } else{
                                    dispatch(setNotActivatedWindowTimer(3))
                                    dispatch(isProfileWindowOpen(true))
                                }
                            } else{
                                dispatch(isAuthWindowOpen(true))
                            }
                        }}>
                            корзина
                        </button>
                    </div>

                    <button className={styles.favorite} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                const message = await addFavoriteProducts(product.id)
                                if(message === 'Ok'){
                                    const user = await getMe()
                                    if(user){
                                        dispatch(setIsAuth(true))                                    
                                        dispatch(setUser(user))
                                        dispatch(setFavoriteAddWindowTimer(3))
                                    } else {
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }
                                } else {
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }                                        
                            } else{
                                dispatch(setNotActivatedWindowTimer(3))
                                dispatch(isProfileWindowOpen(true))
                            }
                        } else{
                            dispatch(isAuthWindowOpen(true))
                        }
                    }}>
                        <img className={styles.favorite_ico} src='/ico/favorite-white-ico.svg'/>
                    </button>
                    <button className={styles.comparison} onClick={async () => {
                        if(isAuth){
                            if(user.isActivated){
                                if(user.comparedProducts?.length && user.comparedProducts?.length >= 5){
                                    dispatch(setMaxComparedWindowTimer(3))
                                } else {
                                    const message = await addComparedProducts(product.id)
                                    if(message === 'Ok'){
                                        const data = await getMe()
                                        if(data){
                                            dispatch(setIsAuth(true))                                    
                                            dispatch(setUser(data))
                                            dispatch(setComparedAddWindowTimer(3))
                                        } else {
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else if(message === 'Max'){
                                        dispatch(setMaxComparedWindowTimer(3))
                                    } else {
                                        dispatch(setIsAuth(false))
                                        dispatch(isAuthWindowOpen(true))
                                    }                                            
                                }
                            } else{
                                dispatch(setNotActivatedWindowTimer(3))
                                dispatch(isProfileWindowOpen(true))
                            }
                        } else{
                            dispatch(isAuthWindowOpen(true))
                        }
                    }}>
                        <img className={styles.comparison_ico} src='/ico/scales-white-ico.svg'/>
                    </button>
                    {product.pastPrice && <div className={styles.discountr}>{`-${Math.floor(100 - (100 / product.pastPrice * product.currentPrice))}%`}</div>}
                    {product.isBestseller && <div className={styles.bestseller} style={{top: product.isNew ? "40px" : "10px"}}>Бестселлер</div>}
                    {product.isNew && <div className={styles.new}>Новинка</div>}
                </div>
            ))}
            {products?.length !== 0 && <div className={styles.pagination}>
                <button disabled={currentPage === 1 ? true : false} className={styles.pagination_button_arrow} onClick={() => dispatch(setCurrentPage(currentPage-1))}>{"<"}</button>
                {buttons}
                <button disabled={currentPage === totalPages ? true : false} className={styles.pagination_button_arrow} onClick={() => dispatch(setCurrentPage(currentPage+1))}>{">"}</button>
            </div>
            }
        </div>
    )
}
export default PaginationBlock