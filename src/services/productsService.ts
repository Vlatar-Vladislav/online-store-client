import api from "./api"

// Получить часть продуктов заданной категории
export const getProducts = async (category: string, page: number, limit: number, filters?: {name: string, values: {value: string, isChecked: boolean}[]}[] | null, price?: {min: number, max: number} | null, search?: string | null, sort?: string): Promise<{count: number, rows: IProduct[]}> => {
    const response = await fetch(`http://localhost:7000/products/get/${category}?page=${page}&limit=${limit}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({filters: filters, price: price, search: search, sort: sort})
    })
    if(!response.ok){
        throw new Error("Unable to fetch posts.")
    }
    return response.json()
}

// Получить эксклюзивные товары заданной категории
// export const getExclusiveProducts = async (category: string) => {
//     const response = await fetch(`http://localhost:7000/products/getexclusive/${category}`, {
//         method: 'get'
//     })
//     if(!response.ok){
//         throw new Error("Unable to fetch posts.")
//     }
//     return response.json()
// }

export const getExclusiveProducts = async (category: string) => {
    // const response = await fetch(`http://localhost:7000/products/getexclusive/${category}`, {
    //     method: 'get'
    // })
    // if(!response.ok){
    //     throw new Error("Unable to fetch posts.")
    // }
    try {
        const response = await api.get(`http://localhost:7000/products/getexclusive/${category}?random=${Math.random()}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
    // return response.json()
}

// Получить товар по id
export const getProductById = async (id: number) => {
    const response = await fetch(`http://localhost:7000/products/getone/${id}`, {
        method: 'get'
    })
    if(!response.ok){
        throw new Error("Unable to fetch posts.")
    }
    return response.json()
}

// Получить id всех товаров
export const getAllProductsID = async () => {
    const response = await fetch(`http://localhost:7000/products/getallid`, {
        method: 'get'
    })
    if(!response.ok){
        throw new Error("Unable to fetch posts.")
    }
    return response.json()
}


// Для получения фильтров выбранной категории
export const getFilters = async (category: string): Promise<{name: string, values: {value: string, isChecked: boolean}[]}[] | null> => {
    try {
        const response = await api.get(`/products/getFilters/${category}`)
        return response.data
    } catch (error) {
        return null
    }
}

export const getPrice = async (category: string): Promise<{constMaxPrice: number, constMinPrice: number} | null> => {
    try {
        const response = await api.get(`/products/getPrice/${category}`)
        return response.data
    } catch (error) {
        return null
    }
}