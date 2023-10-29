export interface IAddToCartRequestBody {
    productVariantId: number;
    action: "INCREMENT" | "DECREMENT"
}

export interface IAddToCartResponseBody {
    productVariantId: string
}