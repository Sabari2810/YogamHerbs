export interface IProduct {
    id: string;
    title: string;
    description: string;
    discount_price: number;
    ProductVariant: [{
        id: string,
        price: string,
        stock_quantity: string
    }];
    discount: {
        value: string,
        discount_type: "offer" | "coupon"
    }
}