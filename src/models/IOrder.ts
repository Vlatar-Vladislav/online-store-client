interface IOrder {
    id: string
    userId: number
    totalPrice: number
    items: {id: number, price: number, name: string, quantity: number}[]
    status: string
    createdAt: string
    updatedAt: string
}