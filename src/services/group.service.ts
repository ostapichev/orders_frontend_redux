import {axiosService} from "./axios.service";

import {IGroup} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";


const groupService = {
    getAll: (page='1'): IResPaginate<IGroup[]> => axiosService.get(urls.groupsAPI.groups, {params: {page}}),
    create: (group: IGroup): IRes<IGroup> => axiosService.post(urls.groupsAPI.groups, group),
    getTotalPages: (): IResPaginate<IGroup[]> => axiosService.get(urls.groupsAPI.groups)
};

export {
    groupService
};
