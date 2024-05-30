import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateGroupFormType,
    CreateGroupRequestDataType,
    storeGroupRequest,
    GroupCreateFormHookType,
    GroupCreateFormHookeProps
} from "./groupCreateFormData";

const useGroupCreateFormHook = ({modal, handleFinish, handleAdd}: GroupCreateFormHookeProps): GroupCreateFormHookType => {
    const [createGroupAlertData, setCreateGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeGroupResponse: UseMutationResult<AxiosResponse, AxiosError, CreateGroupRequestDataType, any> = useMutation({
        mutationFn: storeGroupRequest,
        onError: (error: AxiosError): void => {
            setCreateGroupAlertData(errorAlert(error));

            log("Store group failure", storeGroupResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateGroupRequestDataType): void => {
            setCreateGroupAlertData({show: false});

            const toastMessage: string = `Groupe ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.groups.path);
            }

            log("Store group successful", storeGroupResponse);
        }
    });

    const save = ({name, slug, seoTitle, seoDescription, description}: CreateGroupFormType, next: boolean = false): void => {
        setCreateGroupAlertData({show: false});
        setNext(next);

        storeGroupResponse.mutate({name, slug, seoTitle, seoDescription, description});
    }

    const handleCreateGroup = (values: CreateGroupFormType): void => save(values);
    const handleCreateGroupAndContinue = (values: CreateGroupFormType): void => save(values, true);

    const isCreateGroupPending: boolean = storeGroupResponse.isPending;

    return {createGroupAlertData, handleCreateGroup, handleCreateGroupAndContinue, sequence, isCreateGroupPending};
};

export default useGroupCreateFormHook;