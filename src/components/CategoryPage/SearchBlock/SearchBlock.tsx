'use client'
import { useEffect, useState } from "react"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setSearch } from "@/src/store/reducers/catalogPageSlice"

const SearchBlock = () => {
    const {search} = useAppSelector(state => state.catalogPageReducer)
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(search === null){
            setValue('')
        }
    }, [search])

    const onClick = () => {
        dispatch(setSearch(value === '' ? null : value))
    }

    return(
        <div className={styles.container}>
            <div className={styles.search}>
                <input className={styles.search_input} placeholder="Я ищу..." value={value} onChange={e => setValue(e.target.value)}/>
                <button className={styles.search_send} onClick={onClick}>Поиск</button>
            </div>
        </div>
    )
} 
export default SearchBlock