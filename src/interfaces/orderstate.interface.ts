import {IOrder} from "./order.interface";

export interface IOrderState {
    orders?: IOrder[];
    nextPage?: number;
    prevPage?: number;
}
