export interface IProduct {
    product_id: number;
    product_guid: string;
    variant_id: number;
    variant_guid: string;
    title: string;
    description: string;
    discount_price: number;
    discount_value: number;
    discount_id: number;
    price: number;
    in_stocks: number;
}

export interface IProductVariant {
    product_id: number;
    product_guid: string;
    product_variant_id: number;
    product_variant_guid: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    discount_value: number;
    unit: string;
    volume: number;
    is_default: boolean;
}

export interface ICategory {
    guid: string,
    title: string
}

export interface ICartItem {
    title: string;
    product_id: number;
    product_guid: string;
    product_variant_id: number;
    product_variant_guid: string;
    price: number;
    discount_price: number;
    discount_value: number;
    unit: string;
    volume: number;
    quantity: number;
    total_price: number;
}

export interface IUpdateCartItem {
    product_variant_id: number
    action: "INCREMENT" | "DECREMENT"
}