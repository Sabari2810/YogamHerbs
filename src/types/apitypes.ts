export interface IAddToCartRequestBody {
    productVariantId: number;
    value: number;
}

export interface IAddToCartResponseBody {
    productVariantId: string
}

export interface IGetProductsRequestBody {
    page: number
}