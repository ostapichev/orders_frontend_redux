import {axiosService} from "./axios.service";

import {IGroup} from "../interfaces";
import {IRes, IResPaginate} from "../types";
import {urls} from "../constants";


const groupService = {
    getAll: (): IResPaginate<IGroup[]> => axiosService.get(urls.groupAPI.groups),
    create: (group: IGroup): IRes<IGroup> => axiosService.post(urls.groupAPI.groups, group)
};

export {
    groupService
};
