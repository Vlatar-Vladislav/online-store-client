'use client'
import { useEffect, useState } from "react"
import styles from "./index.module.scss"
import { getFilters, getPrice } from "@/src/services/productsService"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setFilters, setFiltersChecked, setPrice } from "@/src/store/reducers/catalogPageSlice"
import ReactSlider from "react-slider"

const FiltersBlock = ({category}: {category: string}) => {
    const [closed, setClosed] = useState<number[]>([])
    const [constPrice, setConstPrice] = useState<{min: number, max: number} | null>(null)
    const [priceValue, setPriceValue] = useState<{min: number, max: number} | null>(null)
    const {filters, price} = useAppSelector(state => state.catalogPageReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function getData() {
            const response = await getPrice(category)
            if(response){
                setConstPrice({min: response.constMinPrice, max: response.constMaxPrice})
                setPriceValue({min: response.constMinPrice, max: response.constMaxPrice})
            }
        }
        getData()
    }, [])

    useEffect(() => {
        async function getData() {
            const response = await getFilters(category)
            if(response){
                dispatch(setFilters(response))
            }
        }
        getData()
    }, [])

    const toggleFilter = (filterIndex: number) => {
        if (closed.includes(filterIndex)) {
            setClosed(closed.filter(index => index !== filterIndex));
        } else {
            setClosed([...closed, filterIndex]);
        }
    }

    const handleCheckboxChange = (checked: boolean, valueIndex: number, filterIndex: number) => {
        if (filters) {
            const updatedFilters = filters.map((filter, index) => {
              if (index === filterIndex) {
                const updatedValues = filter.values.map((value, valueIdx) => {
                  if (valueIdx === valueIndex) {
                    return { ...value, isChecked: checked }; // Создаем копию значения с обновленным isChecked
                  }
                  return value;
                });
                return { ...filter, values: updatedValues }; // Создаем копию фильтра с обновленными значениями
              }
              return filter;
            });
            dispatch(setFiltersChecked(updatedFilters)); // Диспатчим новый массив фильтров в Redux
        }
    }

    const onClick = () => {
        if(priceValue){
            // if(price.min !== priceValue.min || price.max !== priceValue.min){
                dispatch(setPrice({min: priceValue.min, max: priceValue.max}))                
            // }
        } else{
            dispatch(setPrice(null))
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.filter}>
                <div className={styles.filter_name} onClick={() => toggleFilter(-1)}>
                    Цена<img className={styles.filter_name_img} src={closed.length !== 0 ? closed.includes(-1) ? '/ico/closed-ico.svg' : '/ico/open-ico.svg' : '/ico/open-ico.svg'}/>
                </div>
                <div className={styles.price} style={{height: closed.length !== 0 ? closed.includes(-1) ? '0px' : 'auto' : 'auto', padding: closed.length !== 0 ? closed.includes(-1) ? '0px' : '20px 30px 10px 30px' : '20px 30px 10px 30px'}}>
                    <div className={styles.price_container}>
                        <input className={styles.price_container_input} type="number" value={priceValue?.min} onChange={(e) => {
                            if(priceValue){
                                setPriceValue({min: Number(e.target.value), max: priceValue.max})
                            }
                        }}/>
                        <span className={styles.price_container_span}>−</span>
                        <input className={styles.price_container_input} type="number" value={priceValue?.max} onChange={(e) => {
                            if(priceValue){
                                setPriceValue({min: priceValue.min, max: Number(e.target.value)})
                            }
                        }}/>
                    </div>
                    {constPrice && <ReactSlider
                        className="slider"
                        min={constPrice.min}
                        max={constPrice.max}
                        // value={priceValue ? [priceValue.min, priceValue.max] : [Number(constPrice.min.toFixed(0)), Number(constPrice.max.toFixed(0))]}
                        defaultValue={[constPrice.min, constPrice.max]}
                        renderThumb={(props, state) => 
                            <div {...props}>
                                <div className={styles.thumb_text}>{state.valueNow.toFixed(0)}$</div>
                            </div>
                        }
                        onChange={(value) => {
                            setPriceValue({min: value[0], max: value[1]})
                        }}
                        pearling
                        minDistance={500}
                    />
                    }
                    <div className={styles.price_container}>
                        <button className={styles.price_container_button} onClick={onClick} disabled={
                            (priceValue && (priceValue.max < priceValue.min || priceValue.max - priceValue.min < 500 || price?.max === priceValue.max && price.min === priceValue.min)) ? true : false
                        }>ОК</button>
                    </div>
                </div>                    
            </div>
            {filters?.map((filter, filterIndex) => 
                <div key={filterIndex} className={styles.filter}>
                    <div className={styles.filter_name} onClick={() => toggleFilter(filterIndex)}>
                        {filter.name}
                        <img className={styles.filter_name_img} src={closed.length !== 0 ? closed.includes(filterIndex) ? '/ico/closed-ico.svg' : '/ico/open-ico.svg' : '/ico/open-ico.svg'}/>
                    </div>
                    <div className={styles.filter_values} style={{height: closed.length !== 0 ? closed.includes(filterIndex) ? '0px' : 'auto' : 'auto'}}>
                        {filter.values.map((value, valueIndex) => 
                            <div className={styles.filter_values_value}>
                                <input className={styles.filter_values_value_input} checked={value.isChecked} onChange={(e) => handleCheckboxChange(e.target.checked, valueIndex, filterIndex)} id={value.value} type="checkBox"/>
                                <label className={styles.filter_values_value_label} htmlFor={value.value}>{value.value}</label>
                            </div>
                        )}
                    </div>                    
                </div>
            )}
        </div>
    )
}
export default FiltersBlock