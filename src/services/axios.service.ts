import axios from "axios";

import {baseURL} from "../constants";
import {authService} from "./auth.service";


const axiosService = axios.create({baseURL});
axiosService.interceptors.request.use(res => {
    const access = authService.getAccessToken();
    if (access) {
        res.headers.Authorization = `Bearer ${access}`;
    }
    return res;
});

export {
    axiosService
};
