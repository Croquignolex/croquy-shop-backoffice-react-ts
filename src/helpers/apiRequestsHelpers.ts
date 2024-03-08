import { apiBaseURL } from "../constants/envConstants";
import { LoginRequestDataType } from "../pages/login/loginPageData";
import { authApiURI } from "../constants/apiURIConstants";
import { postRequest } from "./axiosHelpers";
import { log } from "./generalHelpers";

const API_V1_URL: string = `${apiBaseURL}/api/v1/backoffice`;
const API_V2_URL: string = `${apiBaseURL}/api/v2/backoffice`;

export const loginRequest = ({ username, password }: LoginRequestDataType): Promise<any> => {
    const url: string = joinBaseUrlWithParams(API_V1_URL + authApiURI.login);

    log("Login request", {url, username, password});

    return postRequest(url, { username, password }, {headers: {public: true}});
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

    log("Build url", {url, params, queries});

    return url;
};

interface URLParamType {
    param: string;
    value: string;
}