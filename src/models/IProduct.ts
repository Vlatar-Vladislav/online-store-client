interface IProduct {
    id: number
    name: string
    images: string[]
    color: string
    currentPrice: number;
    pastPrice?: number;
    description?: string
    quantity: number
    globalCategory: string
    mainCategory: string
    isNew: boolean
    isBestseller: boolean
    isExclusive: boolean
    comments: IProductComment[]
    review: IProductReview[]
    characteristics: IProductCharacteristic[]
    relatedProducts: {id: number, color: string}[]
    relatedToProducts: {id: number, color: string}[]
    recommendedProducts: IProduct[];
    recommendedToProducts: IProduct[];
}