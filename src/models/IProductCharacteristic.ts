interface IProductCharacteristic {
    id: number
    productId: number
    line: number
    isSeeInComparison: boolean
    category: boolean
    name: string
    value?: string
    link?: string
}