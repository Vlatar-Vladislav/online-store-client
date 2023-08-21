'use client'

import { useState } from "react"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setFiltersChecked, setPrice, setSearch, setSort } from "@/src/store/reducers/catalogPageSlice"

const FiltersInfoBlock = () => {
    const {sort, products, filters, price, search, totalProductsNumber} = useAppSelector(state => state.catalogPageReducer)
    const dispatch = useAppDispatch()

    let characteristicFilters: {name: string, value: string}[] = []
    if(filters){
        for(let x = 0; x < filters.length; x++){
            const filter = filters[x]
            filter.values.filter(value => value.isChecked).map((value, valueIndex) => {
                characteristicFilters.push({name: filter.name, value: value.value})
            });
        }
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.info}>
                    <span className={styles.info_quantity}>{totalProductsNumber !== 0 ? `Товаров найдено: ${totalProductsNumber}` : `Товаров не найдено`}</span>
                </div>
                <select className={styles.select} value={sort} onChange={e => dispatch(setSort(e.target.value))}>
                    <option className={styles.select_op} value=''>Не сортировать</option>
                    <option className={styles.select_op} value='minMax'>От дешёвых к дорогим</option>
                    <option className={styles.select_op}value='maxMin'>От дорогих к дешёвым</option>
                    <option className={styles.select_op} value='new'>Новинки</option>
                </select>
            </div>
            {(price || characteristicFilters.length !== 0 || search) && 
                <div className={styles.filters}>
                    <button className={styles.filters_delete} onClick={() => {
                        if(price){
                            dispatch(setPrice(null))
                        }
                        if(search){
                            dispatch(setSearch(null))
                        }
                        if(characteristicFilters && characteristicFilters.length !== 0){
                            if(filters){
                                const updatedFilters = filters.map(filter => {
                                    const updatedValues = filter.values.map(value => {
                                        return { ...value, isChecked: false };
                                    });
                                    return { ...filter, values: updatedValues };
                                });
                                dispatch(setFiltersChecked(updatedFilters));
                            }                        
                        }
                    }}>
                        <img className={styles.filters_delete_ico} src="/ico/cross-ico.svg"/>
                    </button>
                    {price && 
                        <div className={styles.filters_filter}>
                            {`Цена ${price.min}$ - ${price.max}$`}
                        </div>
                    }
                    {search && 
                        <div className={styles.filters_filter}>
                            {`Поиск`}
                        </div>
                    }
                    {characteristicFilters && (characteristicFilters.length !== 0 ? characteristicFilters.map((characteristic, characteristicIndex) => 
                        <div key={characteristicIndex} className={styles.filters_filter}>
                            {`${characteristic.name}: ${characteristic.value}`}
                        </div>) : null
                    )}
                </div>
            } 
        </>
    )
} 
export default FiltersInfoBlock