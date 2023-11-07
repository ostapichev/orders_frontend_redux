import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IUser} from "../interfaces";
import {urls} from "../constants";
import {IOrderStatistic, IUserStatistic} from "../interfaces/statistic.interface";


class AdminService {
    getAll(page='1', order_by='-id'): IResPaginate<IUser[]> {
        return axiosService.get(urls.usersAPI.users, {
            params: {page, order_by}
        });
    };
    create(user: IUser): IRes<IUser> {
        return axiosService.post(urls.adminAPI.createUser, user);
    };
    ban(id: string): IRes<IUser> {
        return axiosService.patch(urls.adminAPI.banUser(id));
    };
    unban(id: string): IRes<IUser> {
        return axiosService.patch(urls.adminAPI.unbanUser(id));
    };
    getStatisticOrder(): IRes<IOrderStatistic> {
        return axiosService.get(urls.adminAPI.orderStatistic);
    };
    getStatisticUser(id: string): IRes<IUserStatistic> {
        return axiosService.get(urls.adminAPI.userStatistic(id));
    };
    getTotalPages(): IResPaginate<IUser[]> {
        return axiosService.get(urls.usersAPI.users);
    };
}

export const adminService = new AdminService();