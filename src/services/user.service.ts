import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IUser} from "../interfaces";
import {urls} from "../constants";


const userService = {
    getAll: (page='1', order_by='-id'): IResPaginate<IUser[]> => axiosService.get(urls.usersAPI.users, {params: {page, order_by}}),
    create: (user: IUser): IRes<IUser> => axiosService.post(urls.usersAPI.createUser, user),
    ban: (id: string): IRes<IUser> => axiosService.patch(urls.usersAPI.banUser(id)),
    unban: (id: string): IRes<IUser> => axiosService.patch(urls.usersAPI.unbanUser(id)),
    activateUser: (): IRes<IUser> => axiosService.post(urls.authAPI.auth),
    getTotalPages: (): IResPaginate<IUser[]> => axiosService.get(urls.usersAPI.users)
};

export {
    userService
};
