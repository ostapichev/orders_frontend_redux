import {AxiosResponse} from "axios";
import {IPagination} from "../interfaces/pagination.interface";

export type IRes<T> = Promise<AxiosResponse<T>>
export type IResPaginate<T> = IRes<IPagination<T>>
