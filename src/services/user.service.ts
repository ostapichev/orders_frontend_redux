import {axiosService} from "./axios.service";
import {IRes, IResPaginate} from "../types";
import {IUser} from "../interfaces";
import {urls} from "../constants";


class UserService {
    getAll(page='1', order_by='-id'): IResPaginate<IUser[]> {
        return axiosService.get(urls.usersAPI.users, {
            params: {page, order_by}
        });
    };
    create(user: IUser): IRes<IUser> {
        return axiosService.post(urls.usersAPI.createUser, user);
    };
    ban(id: string): IRes<IUser> {
        return axiosService.patch(urls.usersAPI.banUser(id));
    };
    unban(id: string): IRes<IUser> {
        return axiosService.patch(urls.usersAPI.unbanUser(id));
    };
    activateUser(formData: FormData): IRes<IUser> {
        return axiosService.post(urls.authAPI.activate, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    };
    getTotalPages(): IResPaginate<IUser[]> {
        return axiosService.get(urls.usersAPI.users);
    };
}

export const userService = new UserService();
