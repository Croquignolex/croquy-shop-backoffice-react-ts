import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import {getLocaleStorageItem, setLocaleStorageItem, removeAllLocaleStorageItems} from "./localStorageHelpers";
import {LoginResponseDataType} from "../pages/login/loginData";
import {log} from "./generalHelpers";
import {refreshTokenRequest} from "./apiRequestsHelpers";

const axiosApiInstance: AxiosInstance = axios.create({ timeout: 30000 });

axiosApiInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    config.headers["content-type"] = 'application/json';

    if(!config.headers["public"]) {
        const accessToken: string = getLocaleStorageItem("access-token");

        if(accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
    }

    return config;
}, error => Promise.reject(error));

axiosApiInstance.interceptors.response.use((response: AxiosResponse<any, any>) => {
    return response
}, async (error: any): Promise<AxiosResponse<any, any>> => {
    if(error.response) {
        const originalRequest: any = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken: string = getLocaleStorageItem("refresh-token");

                if(refreshToken) {
                    const response: AxiosResponse<any, any> = await refreshTokenRequest(refreshToken);

                    if(response.data) {
                        const accessToken: string = response.data?.accessToken;
                        const refreshToken: string = response.data?.refreshToken;
                        const responseData: LoginResponseDataType = response.data;

                        setLocaleStorageItem('user', responseData);
                        setLocaleStorageItem('access-token', accessToken);
                        setLocaleStorageItem('refresh-token', refreshToken);

                        return axiosApiInstance(originalRequest);
                    }
                }
            } catch (e) {
                log("Xhr refresh token request error", {e});

                removeAllLocaleStorageItems();

                window.location.reload();
            }
        }
    }
    return Promise.reject(error);
});

export const getRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.get(url, config);
};

export const postRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.post(url, data, config);
};

export const putRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.put(url, data, config);
};

export const patchRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.patch(url, data, config);
};

export const deleteRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.delete(url, config);
};