import axios from "axios";

import {baseURL} from "../constants";
import {authService} from "./auth.service";


const axiosService = axios.create({baseURL});
axiosService.interceptors.request.use(response => {
    const access = authService.getAccessToken();
    if (access) {
        response.headers.Authorization = `Bearer ${access}`;
    }
    return response;
});

axiosService.interceptors.response.use(response => {
    return response;
    },
    async error => {
        const request = error.config;
        if (error.response.status === 401 && !request._isRefreshing) {
            request._isRefreshing = true;
            try {
                await authService.refresh();
                return axiosService(request);
            } catch (e) {
                authService.deleteTokens();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export {
    axiosService
};
