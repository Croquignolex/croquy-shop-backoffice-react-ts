import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {usersApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {UserType} from "../show/showUserData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editUserInitialStaticValues: EditUserFormType = {
    role: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
};

export const editUserSchema: Yup.ObjectSchema<EditUserFormType> = Yup.object().shape({
    role: Yup.string().required(formValidationMessage.required),
    oldPassword: Yup.string()
        .required(formValidationMessage.required),
    password: Yup.string()
        .required(formValidationMessage.required)
        .notOneOf([Yup.ref('oldPassword')], formValidationMessage.old),
    confirmPassword: Yup.string()
        .required(formValidationMessage.required)
        .oneOf([Yup.ref('password')], formValidationMessage.confirm)
});

export interface EditUserFormType {
    role: string,
    password: string,
    oldPassword: string,
    confirmPassword: string,
}

export interface EditUserRequestDataType {
    role: string,
    password: string,
    oldPassword: string,
    id: string,
}

export interface EditUserHookType {
    editUserAlertData: ErrorAlertType,
    isEditUserPending: boolean,
    isUserPending: boolean,
    userAlertData: ErrorAlertType,
    formUser: EditUserFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    userResponseData: UserType,
    handleEditUser: (a: EditUserFormType) => void,
}

export const updateUserRequest = (values: EditUserRequestDataType): Promise<any> => {
    const {password, oldPassword, role, id}: EditUserRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(usersApiURI.update, params);

    return putRequest(url, {role, oldPassword, password});
};