import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IOrder} from "../interfaces";
import {urls} from "../constants";


const orderService = {
    getAll: (page='1'): IResPaginate<IOrder[]> => axiosService.get(urls.orderAPI.orders, {params: {page}}),
    getById: (id: string): IRes<IOrder> => axiosService.get(urls.orderAPI.byID(id)),
    updateById: (id: string, order: IOrder): IRes<IOrder> => axiosService.patch(urls.orderAPI.byID(id), order),
}

export {
    orderService
};
