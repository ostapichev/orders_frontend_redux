import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IOrder} from "../interfaces";
import {urls} from "../constants";


const orderService = {
    getAll: (page='1', order_by='-id'): IResPaginate<IOrder[]> => axiosService.get(urls.ordersAPI.orders, {params: {page, order_by}}),
    create: (groupId: string, order: IOrder): IRes<IOrder> => axiosService.post(urls.groupsAPI.createOrder(groupId), order),
    updateById: (id: string, order: IOrder): IRes<IOrder> => axiosService.patch(urls.ordersAPI.byID(id), order),
    getTotalPages: (): IResPaginate<IOrder[]> => axiosService.get(urls.ordersAPI.orders)
}

export {
    orderService
};
