import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    filters: {name: string, values: {value: string, isChecked: boolean}[]}[] | null
    price: {min: number, max: number} | null
    search: string | null
    sort: string
    products: IProduct[] | null
    currentPage: number
    limit: number
    totalProductsNumber: number
}

const initialState: ExampleState = {
    filters: null,
    price: null,
    search: null,
    sort: '',
    products: null,
    currentPage: 1,
    limit: 15,
    totalProductsNumber: 0
}

export const catalogPageSlice = createSlice({
    name: 'catalog-page',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<{name: string, values: {value: string, isChecked: boolean}[]}[] | null>){
            state.currentPage = 1
            state.filters = action.payload
        },
        setFiltersChecked(state, action: PayloadAction<{name: string, values: {value: string, isChecked: boolean}[]}[]>){
            state.currentPage = 1
            state.filters = action.payload
        },
        setProducts(state, action: PayloadAction<IProduct[] | null>){
            state.products = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>){
            state.currentPage = action.payload
        },
        setTotalProductsNumber(state, action: PayloadAction<number>){
            state.totalProductsNumber = action.payload
        },
        setPrice(state, action: PayloadAction<{min: number, max: number} | null>){
            state.currentPage = 1
            state.price = action.payload
        },
        setSearch(state, action: PayloadAction<string | null>){
            state.search = action.payload
        },
        setSort(state, action: PayloadAction<string>){
            state.sort = action.payload
        }
    },
})

export const { setFilters, setFiltersChecked, setProducts, setTotalProductsNumber, setCurrentPage, setPrice, setSearch, setSort } = catalogPageSlice.actions

export default catalogPageSlice.reducer