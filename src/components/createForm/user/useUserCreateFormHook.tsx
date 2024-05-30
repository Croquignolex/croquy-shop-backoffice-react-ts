import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateUserFormType,
    CreateUserRequestDataType,
    storeUserRequest,
    UserCreateFormHookType,
    UserCreateFormHookeProps
} from "./userCreateFormData";

const useUserCreateFormHook = ({modal, handleFinish, handleAdd}: UserCreateFormHookeProps): UserCreateFormHookType => {
    const [createUserAlertData, setCreateUserAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeUserResponse: UseMutationResult<AxiosResponse, AxiosError, CreateUserRequestDataType, any> = useMutation({
        mutationFn: storeUserRequest,
        onError: (error: AxiosError): void => {
            setCreateUserAlertData(errorAlert(error));

            log("Store user failure", storeUserResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateUserRequestDataType): void => {
            setCreateUserAlertData({show: false});

            const toastMessage: string = `Utilisateur ${variables.firstName} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.users.path);
            }

            log("Store user successful", storeUserResponse);
        }
    });

    const save = (values: CreateUserFormType, next: boolean = false): void => {
        const {firstName, lastName, username, password, gender, role, birthdate, profession, description}: CreateUserFormType = values;
        setCreateUserAlertData({show: false});
        setNext(next);

        storeUserResponse.mutate({firstName, lastName, username, gender, role, birthdate, password, profession, description});
    }

    const handleCreateUser = (values: CreateUserFormType): void => save(values);
    const handleCreateUserAndContinue = (values: CreateUserFormType): void => save(values, true);

    const isCreateUserPending: boolean = storeUserResponse.isPending;

    return {createUserAlertData, handleCreateUser, handleCreateUserAndContinue, sequence, isCreateUserPending};
};

export default useUserCreateFormHook;