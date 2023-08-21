interface IProductReview {
    id: number
    productId: number
    line: number;
    image?: string;
    title?: string;
    miniTitle?: string
    text?: string;
    textBlock?: string
    table?: {item: string, value: string}[]
}