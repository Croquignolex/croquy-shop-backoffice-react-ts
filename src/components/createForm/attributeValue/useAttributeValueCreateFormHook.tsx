import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateAttributeValueFormType,
    CreateAttributeValueRequestDataType,
    storeAttributeValueRequest,
    AttributeValueCreateFormHookType,
    AttributeValueCreateFormHookeProps
} from "./attributeValueCreateFormData";

const useAttributeValueCreateFormHook = ({modal, handleFinish, handleAdd}: AttributeValueCreateFormHookeProps): AttributeValueCreateFormHookType => {
    const [createAttributeValueAlertData, setCreateAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, CreateAttributeValueRequestDataType, any> = useMutation({
        mutationFn: storeAttributeValueRequest,
        onError: (error: AxiosError): void => {
            setCreateAttributeValueAlertData(errorAlert(error));

            log("Store attributeValue failure", storeAttributeValueResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateAttributeValueRequestDataType): void => {
            setCreateAttributeValueAlertData({show: false});

            const toastMessage: string = `Valeur d'attribut ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.attributeValues.path);
            }

            log("Store attributeValue successful", storeAttributeValueResponse);
        }
    });

    const save = ({name, value, description}: CreateAttributeValueFormType, next: boolean = false): void => {
        setCreateAttributeValueAlertData({show: false});
        setNext(next);

        storeAttributeValueResponse.mutate({name, value, description});
    }

    const handleCreateAttributeValue = (values: CreateAttributeValueFormType): void => save(values);
    const handleCreateAttributeValueAndContinue = (values: CreateAttributeValueFormType): void => save(values, true);

    const isCreateAttributeValuePending: boolean = storeAttributeValueResponse.isPending;

    return {createAttributeValueAlertData, handleCreateAttributeValue, handleCreateAttributeValueAndContinue, sequence, isCreateAttributeValuePending};
};

export default useAttributeValueCreateFormHook;