import { apiBaseURL } from "../constants/envConstants";
import { LoginRequestDataType } from "../pages/login/loginData";
import { authApiURI, shopsApiURI, usersApiURI } from "../constants/apiURIConstants";
import { postRequest, getRequest, deleteRequest, putRequest } from "./axiosHelpers";
import {AddShopRequestDataType} from "../pages/shops/add/addShopData";
import {EditShopRequestDataType} from "../pages/shops/edit/editShopData";
import {DestroyShopRequestDataType} from "../pages/shops/shopsData";

const API_V1_URL: string = `${apiBaseURL}/api/v1/backoffice`;
const API_V2_URL: string = `${apiBaseURL}/api/v2/backoffice`;

export const loginRequest = ({username, password}: LoginRequestDataType): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.login);

    return postRequest(url, {username, password}, {headers: {public: true}});
};

export const refreshTokenRequest = (token: string): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.refresh);

    return postRequest(url, {token}, {headers: {public: true}});
};

export const shopsRequest = (page: number, size: number, needle: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.index, [], queries);

    return getRequest(url);
};

export const shopRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.show, params);

    return getRequest(url);
};

export const destroyShop = ({id}: DestroyShopRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.destroy, params);

    return deleteRequest(url);
};

export const storeShopRequest = ({name, slug, description}: AddShopRequestDataType): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.store);

    return postRequest(url, {name, slug, description});
};

export const updateShopRequest = ({name, slug, description, id}: EditShopRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "id", value: id || ""}];
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.update, queries);

    return putRequest(url, {name, slug, description});
};

export const usersRequest = (): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + usersApiURI.list);

    return getRequest(url);
};

// Build complete url
const joinBaseUrlWithParams = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    if(params) {
        params.forEach((param: URLParamType): void => {
            url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
        });
    }

    if(queries) {
        let i: number = 0;

        queries.forEach((query: URLParamType): void => {
            if(i === 0) url = `${url}?${query.param}=${query.value}`;
            else url = `${url}&${query.param}=${query.value}`;
            i++;
        });
    }

    return url;
};

interface URLParamType {
    param: string;
    value: string;
}