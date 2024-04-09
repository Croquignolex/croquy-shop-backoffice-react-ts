import * as Yup from "yup";

import { formValidationMessage } from "../../constants/generalConstants";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";
import {authApiURI} from "../../constants/apiURIConstants";
import {postRequest} from "../../helpers/axiosHelpers";
import {v1URL} from "../../helpers/apiRequestsHelpers";

export const loginInitialStaticValues: LoginFormType = { username: '', password: '' };

export const loginSchema: Yup.ObjectSchema<LoginFormType> = Yup.object().shape({
    username: Yup.string().required(formValidationMessage.required),
    password: Yup.string().required(formValidationMessage.required),
});

export interface LoginResponseDataType {
    firstName: string;
    username: string;
    role: string;
}

export interface LoginFormType extends LoginRequestDataType {}

export interface LoginHookType {
    handleLogin: (a: LoginFormType) => void,
    isLoginPending: boolean,
    loginAlertData: ErrorAlertType
}

export interface LoginRequestDataType {
    username: string,
    password: string
}

export const loginRequest = ({username, password}: LoginRequestDataType): Promise<any> => {
    const url: string = v1URL(authApiURI.login);

    return postRequest(url, {username, password}, {headers: {public: true}});
};