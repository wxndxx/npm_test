export interface IBasket {
    appointments: {
        id: number,
        order_true: boolean,
        quantity: number,
        service: any
    }[],
    products: any,
    appointments_sum: number,
    products_sum: number,
}