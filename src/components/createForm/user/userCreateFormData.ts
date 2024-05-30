import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {usersApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createUserInitialStaticValues: CreateUserFormType = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    profession: "",
    birthdate: "",
    role: "",
    gender: "",
    description: "",
}

export const createUserSchema: Yup.ObjectSchema<CreateUserFormType> = Yup.object().shape({
    username: Yup.string().required(formValidationMessage.required),
    firstName: Yup.string().required(formValidationMessage.required),
    lastName: Yup.string(),
    profession: Yup.string(),
    birthdate: Yup.string(),
    role: Yup.string().required(formValidationMessage.required),
    gender: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
    password: Yup.string()
        .required(formValidationMessage.required),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,})/, formValidationMessage.password),
    confirmPassword: Yup.string()
        .required(formValidationMessage.required)
        .oneOf([Yup.ref('password')], formValidationMessage.confirm)
});

export interface CreateUserFormType {
    username: string,
    firstName: string,
    lastName: string | null | undefined,
    password: string,
    confirmPassword: string,
    profession: string | null | undefined,
    birthdate: string | null | undefined,
    role: string,
    gender: string,
    description: string | null | undefined,
}

export interface CreateUserRequestDataType {
    username: string,
    firstName: string,
    lastName: string | null | undefined,
    password: string,
    profession: string | null | undefined,
    birthdate: string | null | undefined,
    role: string,
    gender: string,
    description: string | null | undefined,
}

export interface UserCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface UserCreateFormHookType {
    createUserAlertData: ErrorAlertType,
    isCreateUserPending: boolean,
    sequence: number,
    handleCreateUser: (a: CreateUserFormType) => void,
    handleCreateUserAndContinue: (a: CreateUserFormType) => void,
}

export const storeUserRequest = (values: CreateUserRequestDataType): Promise<any> => {
    const {firstName, lastName, username, password, gender, role, birthdate, profession, description}: CreateUserRequestDataType = values;
    const url: string = v1URL(usersApiURI.store);

    return postRequest(url, {firstName, lastName, username, password, gender, role, birthdate, profession, description});
};