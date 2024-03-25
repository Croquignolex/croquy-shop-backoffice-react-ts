import * as Yup from "yup";

import { formValidationMessage } from "../../constants/generalConstants";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";

export const loginInitialValues: LoginFormType = { username: '', password: '' };

export const loginSchema: Yup.ObjectSchema<LoginFormType> = Yup.object().shape({
    username: Yup.string().required(formValidationMessage.required),
    password: Yup.string().required(formValidationMessage.required),
});

export interface LoginRequestDataType {
    username: string,
    password: string
}

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