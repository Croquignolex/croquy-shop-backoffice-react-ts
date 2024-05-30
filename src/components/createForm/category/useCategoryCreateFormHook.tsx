import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateCategoryFormType,
    CreateCategoryRequestDataType,
    storeCategoryRequest,
    CategoryCreateFormHookType,
    CategoryCreateFormHookeProps
} from "./categoryCreateFormData";

const useCategoryCreateFormHook = ({modal, handleFinish, handleAdd}: CategoryCreateFormHookeProps): CategoryCreateFormHookType => {
    const [createCategoryAlertData, setCreateCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, CreateCategoryRequestDataType, any> = useMutation({
        mutationFn: storeCategoryRequest,
        onError: (error: AxiosError): void => {
            setCreateCategoryAlertData(errorAlert(error));

            log("Store category failure", storeCategoryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateCategoryRequestDataType): void => {
            setCreateCategoryAlertData({show: false});

            const toastMessage: string = `Categorie ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.categories.path);
            }

            log("Store category successful", storeCategoryResponse);
        }
    });

    const save = ({name, slug, groupId, seoTitle, seoDescription, description}: CreateCategoryFormType, next: boolean = false): void => {
        setCreateCategoryAlertData({show: false});
        setNext(next);

        storeCategoryResponse.mutate({name, slug, groupId, seoTitle, seoDescription, description});
    }

    const handleCreateCategory = (values: CreateCategoryFormType): void => save(values);
    const handleCreateCategoryAndContinue = (values: CreateCategoryFormType): void => save(values, true);

    const isCreateCategoryPending: boolean = storeCategoryResponse.isPending;

    return {createCategoryAlertData, handleCreateCategory, handleCreateCategoryAndContinue, sequence, isCreateCategoryPending};
};

export default useCategoryCreateFormHook;