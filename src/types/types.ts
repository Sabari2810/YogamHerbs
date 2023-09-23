export interface IProduct {
    id: string;
    title: string;
    description: string;
    discount_price: number;
    ProductVariant: IProductVariant[];
    discount: {
        value: string,
        discount_type: "offer" | "coupon"
    }
}

export interface IProductVariant {
    id: string,
    price: string,
    stock_quantity: string
}