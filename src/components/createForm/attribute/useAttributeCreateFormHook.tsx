import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateAttributeFormType,
    CreateAttributeRequestDataType,
    storeAttributeRequest,
    AttributeCreateFormHookType,
    AttributeCreateFormHookeProps
} from "./attributeCreateFormData";

const useAttributeCreateFormHook = ({modal, handleFinish, handleAdd}: AttributeCreateFormHookeProps): AttributeCreateFormHookType => {
    const [createAttributeAlertData, setCreateAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, CreateAttributeRequestDataType, any> = useMutation({
        mutationFn: storeAttributeRequest,
        onError: (error: AxiosError): void => {
            setCreateAttributeAlertData(errorAlert(error));

            log("Store attribute failure", storeAttributeResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateAttributeRequestDataType): void => {
            setCreateAttributeAlertData({show: false});

            const toastMessage: string = `Atrribut ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.attributes.path);
            }

            log("Store attribute successful", storeAttributeResponse);
        }
    });

    const save = ({name, type, description}: CreateAttributeFormType, next: boolean = false): void => {
        setCreateAttributeAlertData({show: false});
        setNext(next);

        storeAttributeResponse.mutate({name, type, description});
    }

    const handleCreateAttribute = (values: CreateAttributeFormType): void => save(values);
    const handleCreateAttributeAndContinue = (values: CreateAttributeFormType): void => save(values, true);

    const isCreateAttributePending: boolean = storeAttributeResponse.isPending;

    return {createAttributeAlertData, handleCreateAttribute, handleCreateAttributeAndContinue, sequence, isCreateAttributePending};
};

export default useAttributeCreateFormHook;