import {axiosService} from "./axios.service";

import {urls} from "../constants/urls";
import {IResPaginate} from "../types/res.type";
import {IUser} from "../interfaces/user.interface";


const userService = {
    getAll: (): IResPaginate<IUser[]> => axiosService.get(urls.userAPI.users),
};

export {
    userService
};
