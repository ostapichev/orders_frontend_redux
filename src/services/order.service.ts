import {axiosService} from "./axios.service";
import {IOrder, IParams} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";

class OrderService {
    getAll(params: IParams): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.orders, {params});
    };

    create(groupId: string, order: IOrder): IRes<IOrder> {
        return axiosService.post(urls.groupsAPI.createOrder(groupId), order);
    };

    createExelFile(params: IParams): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.createExel, {responseType: 'blob', params});
    };

    updateById(id: string, order: IOrder): IRes<IOrder> {
        return axiosService.patch(urls.ordersAPI.byID(id), order);
    };
}

export const orderService = new OrderService();
