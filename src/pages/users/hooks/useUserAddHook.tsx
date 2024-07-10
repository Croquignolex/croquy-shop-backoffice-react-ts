import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import dayjs from "dayjs";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {usersApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useUserAddHook = ({added, finished}: UserAddHookProps): UserAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addUserAlertData, setAddUserAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeUserResponse: UseMutationResult<AxiosResponse, AxiosError, UserAddRequestDataType, any> = useMutation({
        mutationFn: storeUserRequest,
        onError: (error: AxiosError): void => {
            setAddUserAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: UserAddRequestDataType): void => {
            setAddUserAlertData({show: false});

            // Reload component
            if(next) {
                added();
                setSequence(sequence + 1);
            }
            else {
                finished();
            }

            toast({
                title: t("add"),
                description: `${t("user_added", {name: variables.firstName})}`
            });
        }
    });

    const save = (values: UserAddFormType, next: boolean = false): void => {
        const {firstName, lastName, username, password, gender, role, birthdate, profession, description}: UserAddFormType = values;
        setAddUserAlertData({show: false});
        setNext(next);

        storeUserResponse.mutate({firstName, lastName, username, password, gender, role, birthdate, profession, description});
    }

    const handleAddUser = (values: UserAddFormType): void => save(values);
    const handleAddUserAndContinue = (values: UserAddFormType): void => save(values, true);

    const isAddUserPending: boolean = storeUserResponse.isPending;

    return {
        addUserAlertData,
        handleAddUser,
        handleAddUserAndContinue,
        sequence,
        isAddUserPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const userAddInitialStaticValues: UserAddFormType = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    profession: "",
    birthdate: dayjs().format("YYYY/MM/DD"),
    role: "",
    gender: "",
    description: "",
};

export const userAddSchema: Yup.ObjectSchema<UserAddFormType> = Yup.object().shape({
    username: Yup.string().required(formValidationMessage.required),
    firstName: Yup.string().required(formValidationMessage.required),
    lastName: Yup.string(),
    profession: Yup.string(),
    birthdate: Yup.string()
        .test("FORMAT", formValidationMessage.passDate, (value: string | undefined): boolean => {
            return (dayjs(value).isValid() && dayjs(value).isBefore(dayjs()));
        }),
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

export interface UserAddFormType extends UserAddRequestDataType {
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

interface UserAddRequestDataType {
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

export interface UserAddHookType {
    addUserAlertData: ErrorAlertType,
    isAddUserPending: boolean,
    sequence: number,
    handleAddUser: (a: UserAddFormType) => void,
    handleAddUserAndContinue: (a: UserAddFormType) => void,
}

interface UserAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeUserRequest = (values: UserAddRequestDataType): Promise<any> => {
    const {firstName, lastName, username, password, gender, role, birthdate, profession, description}: UserAddRequestDataType = values;
    const url: string = v1URL(usersApiURI.store);

    return postRequest(url, {firstName, lastName, username, password, gender, role, birthdate, profession, description});
};

export default useUserAddHook;