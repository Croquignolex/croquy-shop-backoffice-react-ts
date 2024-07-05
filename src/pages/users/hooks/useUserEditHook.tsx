import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {usersApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {UserType} from "../show/showUserData";

// ######################################## HOOK ######################################## //

const useUserEditHook = ({selectedUser, finished}: UserEditHookProps): UserEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editUserAlertData, setEditUserAlertData] = useState<ErrorAlertType>({show: false});

    const updateUserResponse: UseMutationResult<AxiosResponse, AxiosError, UserEditRequestDataType, any> = useMutation({
        mutationFn: updateUserRequest,
        onError: (error: AxiosError): void => {
            setEditUserAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: UserEditRequestDataType): void => {
            setEditUserAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("user_edited", {name: variables.firstName})}`
            });
        }
    });

    const handleEditUser = (values: UserEditFormType): void => {
        const {firstName, lastName, gender, role, birthdate, profession, description}: UserEditFormType = values;
        updateUserResponse.mutate({firstName, lastName, gender, role, birthdate, profession, description, id: selectedUser.id});
    }

    const isEditUserPending: boolean = updateUserResponse.isPending;
    const formUser: UserEditFormType = selectedUser;

    return {
        formUser,
        editUserAlertData,
        handleEditUser,
        isEditUserPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const userEditSchema: Yup.ObjectSchema<UserEditFormType> = Yup.object().shape({
    firstName: Yup.string().required(formValidationMessage.required),
    lastName: Yup.string(),
    profession: Yup.string(),
    birthdate: Yup.string(),
    role: Yup.string().required(formValidationMessage.required),
    gender: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface UserEditFormType {
    firstName: string,
    lastName: string | null | undefined,
    profession: string | null | undefined,
    birthdate: string | null | undefined,
    role: string,
    gender: string,
    description: string | null | undefined,
}

interface UserEditRequestDataType extends UserEditFormType {
    id: string,
}

export interface UserEditHookType {
    editUserAlertData: ErrorAlertType,
    isEditUserPending: boolean,
    formUser: UserEditFormType,
    handleEditUser: (a: UserEditFormType) => void,
}

interface UserEditHookProps {
    selectedUser: UserType;
    finished: () => void;
}

const updateUserRequest = (values: UserEditRequestDataType): Promise<any> => {
    const {firstName, lastName, gender, role, birthdate, profession, description, id}: UserEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(usersApiURI.update, params);

    return putRequest(url, {firstName, lastName, gender, role, birthdate, profession, description});
};

export default useUserEditHook;