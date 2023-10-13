import {IOrder} from "../interfaces/order.interface";
import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";
import {IRes, IResPaginate} from "../types/res.type";

const orderService = {
    getAll: (): IResPaginate<IOrder[]> => axiosService.get(urls.orderAPI.orders),
    getById: (id: string): IRes<IOrder> => axiosService.get(urls.orderAPI.byID(id)),
    updateById: (id: string, order: IOrder): IRes<IOrder> => axiosService.patch(urls.orderAPI.byID(id), order),
}

export {
    orderService
};
