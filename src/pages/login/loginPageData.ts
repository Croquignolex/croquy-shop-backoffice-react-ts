import * as Yup from "yup";

import { formValidationMessage } from "../../constants/generalConstants";

export const initialValues: LoginFormType = { username: '', password: '' };

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

