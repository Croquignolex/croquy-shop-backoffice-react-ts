import * as Yup from "yup";

import {formValidationMessage} from "../../constants/generalConstants";

export const initialValues: LoginFormType = { email: '', password: '' };

export const loginSchema: Yup.ObjectSchema<LoginFormType> = Yup.object().shape({
    email: Yup.string().required(formValidationMessage.required).email(formValidationMessage.email),
    password: Yup.string().required(formValidationMessage.required),
});

export interface LoginRequestType {
    email: string,
    password: string
}

export interface LoginFormType extends LoginRequestType {}

