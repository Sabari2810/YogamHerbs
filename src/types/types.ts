export interface IProduct {
    id: string;
    title: string;
    description: string;
    ProductVariant: [{
        id: string,
        price: string,
        stock_quantity: string
    }]
}