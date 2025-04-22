export interface SalesOrder {
    orderId: string;
    customerId: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    status: 'pending' | 'processing' | 'shipped';
}
