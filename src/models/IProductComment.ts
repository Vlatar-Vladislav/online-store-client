interface IProductComment {
    id: number
    userId: number;
    productId: number;
    productName: string,
    rating: number;
    comment: string;
    advantages: string
    disadvantages: string
    updatedAt: any
    createdAt: any
}