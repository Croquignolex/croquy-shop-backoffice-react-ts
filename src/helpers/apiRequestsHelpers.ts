import { apiBaseURL } from "../constants/envConstants";
import { LoginRequestType } from "../pages/login/loginPageData";
import { authApiURI } from "../constants/apiURIConstants";
import { postRequest } from "./axiosHelpers";

const API_V1_URL: string = `${apiBaseURL}/v1/backoffice`;
const API_V2_URL: string = `${apiBaseURL}/v2/backoffice`;

export const loginRequest = ({ email, password }: LoginRequestType): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.login);
    return postRequest(url, { email, password });
};

// Build complete url
const joinBaseUrlWithParams = (url: string, params?: URLParamType[], queries?: URLParamType[]): string => {
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
        });
    }

    return url;
};

interface URLParamType {
    param: string;
    value: string;
}