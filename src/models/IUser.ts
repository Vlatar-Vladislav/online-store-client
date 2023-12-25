interface IUser {
    id: number | null
    email: number | null
    isBanned: boolean | null
    isActivated: boolean | null
    cartItems: ICartItem[] | null
    orders: IOrder[] | null
    comments: IProductComment[] | null
    favoriteProducts: IProduct[] | null
    comparedProducts: IProduct[] | null
    updatedAt: any | null
    createdAt: any | null
}