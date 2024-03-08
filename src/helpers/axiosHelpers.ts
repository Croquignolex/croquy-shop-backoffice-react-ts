import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig } from "axios";

import { getLocaleStorageItem } from "./localStorageHelpers";
import { log } from "./generalHelpers";

const axiosApiInstance: AxiosInstance = axios.create({ timeout: 30000 });

axiosApiInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    log("Axios interceptor", {config});

    config.headers["content-type"] = 'application/json';

    if(!config.headers["public"]) {
        const accessToken: string = getLocaleStorageItem('access-token');

        if(accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
    }

    return config;
}, error => Promise.reject(error));

export const getRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    log("Axios GET request", {url, config});

    return axiosApiInstance.get(url, config);
};

export const postRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    log("Axios POST request", {url, data, config});

    return axiosApiInstance.post(url, data, config);
};

export const putRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    log("Axios PUT request", {url, data, config});

    return axiosApiInstance.put(url, data, config);
};

export const patchRequest = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> => {
    log("Axios PATCH request", {url, data, config});

    return axiosApiInstance.patch(url, data, config);
};

export const deleteRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    log("Axios DELETE request", {url, config});

    return axiosApiInstance.delete(url, config);
};