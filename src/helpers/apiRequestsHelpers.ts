import { apiBaseURL } from "../constants/envConstants";
import { usersApiURI } from "../constants/apiURIConstants";
import {getRequest} from "./axiosHelpers";
import {URLParamType} from "./globalTypesHelper";

const API_V1_URL: string = `${apiBaseURL}/api/v1/backoffice`;
const API_V2_URL: string = `${apiBaseURL}/api/v2/backoffice`;
export const API_MEDIA_V1_URL: string = `${apiBaseURL}/api/v1/media/`;

export const usersRequest = (): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + usersApiURI.list);

    return getRequest(url);
};

// Build v1 url
export const v1URL = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    return joinBaseUrlWithParams(API_V1_URL + url, params, queries);
};

// Build v2 url
export const v2URL = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    return joinBaseUrlWithParams(API_V2_URL + url, params, queries);
};

// Build complete url
export const joinBaseUrlWithParams = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
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