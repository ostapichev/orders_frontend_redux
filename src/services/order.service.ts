import {axiosService} from "./axios.service";
import {IOrder} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";


class OrderService {
    getAll(
        page='1',
        order_by='-id',
        name_contains='',
        surname_contains='',
        email_contains='',
        phone_contains='',
        age_in='',
        course='',
        course_format='',
        course_type='',
        status='',
        group='',
        created_at_after='',
        created_at_before='',
        manager=''
    ): IResPaginate<IOrder[]> {
        return axiosService.get(urls.ordersAPI.orders, {
            params: {
                page,
                order_by,
                name_contains,
                surname_contains,
                email_contains,
                phone_contains,
                age_in,
                course,
                course_format,
                course_type,
                status,
                group,
                created_at_after,
                created_at_before,
                manager
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
