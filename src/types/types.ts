export interface IProduct {
    ProductId: number;
    ProductGuid: string;
    VariantId: number;
    VariantGuid: string;
    Title: string;
    Description: string;
    DiscountPrice: number;
    DiscountValue: number;
    DiscountId: number;
    Price: number;
    StockCount: number;
}

export interface IProductVariant {
    ProductId: number;
    ProductGuid: string;
    ProductVariantId: number;
    ProductVariantGuid: string;
    Title: string;
    Description: string;
    Price: number;
    DiscountPrice: number;
    DiscountValue: number;
    Unit: string;
    Volume: number;
    IsDefault: boolean;
}

export interface ICategory {
    Guid: string,
    Title: string
}

export interface ICartItem {
    Title: string;
    ProductId: number;
    ProductGuid: string;
    ProductVariantId: number;
    ProductVariantGuid: string;
    Price: number;
    DiscountPrice: number;
    DiscountValue: number;
    Unit: string;
    Volume: number;
    Quantity: number;
    TotalPrice: number;
}

export interface IUpdateCartItem {
    product_variant_id: number
    action: "INCREMENT" | "DECREMENT"
}