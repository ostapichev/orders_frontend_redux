import {axiosService} from "./axios.service";
import {IResPaginate} from "../types";
import {IUser} from "../interfaces";
import {urls} from "../constants";


const userService = {
    getAll: (): IResPaginate<IUser[]> => axiosService.get(urls.userAPI.users),
};

export {
    userService
};
