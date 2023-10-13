import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";
import {IGroup} from "../interfaces/group.interface";
import {IRes, IResPaginate} from "../types/res.type";

const groupService = {
    getAll: (): IResPaginate<IGroup[]> => axiosService.get(urls.groupAPI.groups),
    create: (group: IGroup): IRes<IGroup> => axiosService.post(urls.groupAPI.groups, group)
};

export {
    groupService
};
