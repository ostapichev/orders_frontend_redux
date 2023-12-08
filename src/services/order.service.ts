import {axiosService} from "./axios.service";
import {IFilterOrder, IOrder} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";


class OrderService {
    getAll(filteredParams: IFilterOrder): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.orders, {params: filteredParams});
    };

    create(groupId: string, order: IOrder): IRes<IOrder> {
        return axiosService.post(urls.groupsAPI.createOrder(groupId), order);
    };

    createExelFile(): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.createExel, {
            responseType: 'blob'
        });
    };

    updateById(id: string, order: IOrder): IRes<IOrder> {
        return axiosService.patch(urls.ordersAPI.byID(id), order);
    };

    getTotalPages(): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.orders);
    };
}

export const orderService = new OrderService();
