import {axiosService} from "./axios.service";

import {IGroup} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";


const groupService = {
    getAll: (): IRes<IGroup[]> => axiosService.get(urls.groupsAPI.groups),
    create: (group: IGroup): IRes<IGroup> => axiosService.post(urls.groupsAPI.groups, group),
    getTotalPages: (): IResPaginate<IGroup[]> => axiosService.get(urls.groupsAPI.groups)
};

export {
    groupService
};
