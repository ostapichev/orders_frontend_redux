import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IOrder} from "../interfaces";
import {urls} from "../constants";


class OrderService {
    getAll(
        page='1',
        order_by='-id',
        name_contains='',
        surname_contains='',
        email_contains='',
        manager=''
    ): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.orders, {params: {
            page, order_by, name_contains, surname_contains, email_contains, manager
        }});
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
