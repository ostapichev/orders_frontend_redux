import {AxiosResponse} from "axios";

import {axiosService} from "./axios.service";
import {IAuth, ITokens, IUser} from "../interfaces";
import {IRes} from "../types";
import {urls} from "../constants";


class AuthService {
    private readonly accessKey = 'access';
    private readonly refreshKey = 'refresh';

    async login(user: IAuth): Promise<IUser>{
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.authAPI.login, user);
        this.setTokens(data);
        const {data: me}: AxiosResponse<IUser> = await this.me();
        return me;
    }

    me(): IRes<IUser> {
        return axiosService.get(urls.authAPI.me);
    }

    private setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(this.accessKey, access);
        localStorage.setItem(this.refreshKey, refresh);
    };

    getAccessToken(): string {
        return localStorage.getItem(this.accessKey);
    };

    deleteTokens(): void {
        localStorage.removeItem(this.accessKey);
        localStorage.removeItem(this.refreshKey);
    };
}

export const authService = new AuthService();
