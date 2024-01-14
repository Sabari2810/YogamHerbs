export interface IProductList {
    total_pages: number
    products: IProduct[]
}

export interface IOrder {
    OrderId: number;
    OrderGuid: string;
    TotalPrice: number;
}

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

export interface IRazorPaymentDetails {
    entity: string
    event: string
    account_id: string
    created_at: number
    payload: {
        refund: {
            entity: {
                id: string
                entity: string
                notes: string
                created_at: number
                batch_id: string
                status: string
                speed_processed: string
                speed_requested: string
            }
        }
        payment: {
            entity: {
                id: string
                entity: string
                amount: number
                currency: string
                status: string
                method: string
                order_id: string
                description: string
                international: boolean
                refund_status: string
                amount_refunded: number
                captured: boolean
                email: string
                contact: string
                fee: number
                tax: number
                error_code: string
                error_description: string
                error_source: string
                error_step: string
                error_reason: string
                notes: string
                created_at: number
                card_id: string
                card: {
                    id: string
                    entity: string
                    name: string
                    last4: string
                    network: string
                    type: string
                    issuer: string
                    emi: boolean
                    sub_type: string
                }
                upi: {
                    payer_account_type: string
                    vpa: string
                    flow: string
                }
                bank: string
                vpa: string
                wallet: string
                acquirer_data: {
                    rrn: string
                    authentication_reference_number: string
                    bank_transaction_id: string
                },
                invoice_id: string
            }
        }
    }
}