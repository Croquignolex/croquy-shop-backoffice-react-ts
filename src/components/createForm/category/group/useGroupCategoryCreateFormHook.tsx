import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../../helpers/generalHelpers";
import {
    storeCategoryRequest,
    GroupCategoryCreateFormHookeProps,
    GroupCategoryCreateFormHookType,
    CreateGroupCategoryRequestDataType,
    CreateGroupCategoryFormType,
} from "./groupCategoryCreateFormData";

const useGroupCategoryCreateFormHook = ({groupId, handleFinish, handleAdd}: GroupCategoryCreateFormHookeProps): GroupCategoryCreateFormHookType => {
    const [createGroupCategoryAlertData, setCreateGroupCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();

    const storeGroupCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, CreateGroupCategoryRequestDataType, any> = useMutation({
        mutationFn: storeCategoryRequest,
        onError: (error: AxiosError): void => {
            setCreateGroupCategoryAlertData(errorAlert(error));

            log("Store category failure", storeGroupCategoryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateGroupCategoryRequestDataType): void => {
            setCreateGroupCategoryAlertData({show: false});

            const toastMessage: string = `Catégorie ${variables.name} ajoutée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) {
                setSequence(sequence + 1);
                handleAdd();
            }
            else handleFinish();

            log("Store category successful", storeGroupCategoryResponse);
        }
    });

    const save = (values: CreateGroupCategoryFormType, next: boolean = false): void => {
        const {name, seoTitle, seoDescription, slug, description}:CreateGroupCategoryFormType = values;
        setCreateGroupCategoryAlertData({show: false});
        setNext(next);

        storeGroupCategoryResponse.mutate({name, seoTitle, seoDescription, slug, description, groupId});
    }

    const handleCreateGroupCategory = (values: CreateGroupCategoryFormType): void => save(values);
    const handleCreateGroupCategoryAndContinue = (values: CreateGroupCategoryFormType): void => save(values, true);

    const isCreateGroupCategoryPending: boolean = storeGroupCategoryResponse.isPending;

    return {
        createGroupCategoryAlertData,
        handleCreateGroupCategory,
        handleCreateGroupCategoryAndContinue,
        sequence,
        isCreateGroupCategoryPending
    };
};

export default useGroupCategoryCreateFormHook;