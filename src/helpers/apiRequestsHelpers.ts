import { apiBaseURL } from "../constants/envConstants";
import { LoginRequestDataType } from "../pages/login/loginPageData";
import { authApiURI, shopsApiURI, usersApiURI } from "../constants/apiURIConstants";
import { postRequest, getRequest } from "./axiosHelpers";

const API_V1_URL: string = `${apiBaseURL}/api/v1/backoffice`;
const API_V2_URL: string = `${apiBaseURL}/api/v2/backoffice`;

export const loginRequest = ({ username, password }: LoginRequestDataType): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.login);

    return postRequest(url, { username, password }, {headers: {public: true}});
};

export const refreshTokenRequest = (token: string): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.refresh);

    return postRequest(url, { token }, {headers: {public: true}});
};

export const shopsRequest = (page: number, size: number, needle: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = joinBaseUrlWithParams(API_V1_URL + shopsApiURI.list, [], queries);

    return getRequest(url);
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