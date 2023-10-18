import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IUser} from "../interfaces";
import {urls} from "../constants";


const userService = {
    getAll: (page='1'): IResPaginate<IUser[]> => axiosService.get(urls.userAPI.users, {params: {page}}),
    create: (user: IUser): IRes<IUser> => axiosService.post(urls.userAPI.createUser, user),
    ban: (id: string): IRes<IUser> => axiosService.patch(urls.userAPI.banUser(id)),
    unban: (id: string): IRes<IUser> => axiosService.patch(urls.userAPI.unbanUser(id)),
    getTotalPages: (): IResPaginate<IUser[]> => axiosService.get(urls.userAPI.users)
};

export {
    userService
};
