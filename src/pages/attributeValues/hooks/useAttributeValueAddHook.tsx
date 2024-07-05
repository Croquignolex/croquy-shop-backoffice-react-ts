import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useAttributeValueValueAddHook = ({added, finished}: AttributeValueAddHookProps): AttributeValueAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addAttributeValueAlertData, setAddAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, AttributeValueAddRequestDataType, any> = useMutation({
        mutationFn: storeAttributeValueRequest,
        onError: (error: AxiosError): void => {
            setAddAttributeValueAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AttributeValueAddRequestDataType): void => {
            setAddAttributeValueAlertData({show: false});

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
                description: `${t("attributeValue_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: AttributeValueAddFormType, next: boolean = false): void => {
        const {name, value, description}: AttributeValueAddFormType = values;
        setAddAttributeValueAlertData({show: false});
        setNext(next);

        storeAttributeValueResponse.mutate({name, value, description});
    }

    const handleAddAttributeValue = (values: AttributeValueAddFormType): void => save(values);
    const handleAddAttributeValueAndContinue = (values: AttributeValueAddFormType): void => save(values, true);

    const isAddAttributeValuePending: boolean = storeAttributeValueResponse.isPending;

    return {
        addAttributeValueAlertData,
        handleAddAttributeValue,
        handleAddAttributeValueAndContinue,
        sequence,
        isAddAttributeValuePending
    };
};

// ######################################## STATICS DATA ######################################## //

export const attributeValueAddInitialStaticValues: AttributeValueAddFormType = {
    name: '',
    value: '',
    description: ''
};

export const addAttributeValueSchema: Yup.ObjectSchema<AttributeValueAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    value: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AttributeValueAddFormType {
    name: string,
    value: string,
    description: string | null | undefined,
}

interface AttributeValueAddRequestDataType extends AttributeValueAddFormType {}

export interface AttributeValueAddHookType {
    addAttributeValueAlertData: ErrorAlertType,
    isAddAttributeValuePending: boolean,
    sequence: number,
    handleAddAttributeValue: (a: AttributeValueAddFormType) => void,
    handleAddAttributeValueAndContinue: (a: AttributeValueAddFormType) => void,
}

interface AttributeValueAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeAttributeValueRequest = (values: AttributeValueAddRequestDataType): Promise<any> => {
    const {name, value, description}: AttributeValueAddRequestDataType = values;
    const url: string = v1URL(attributeValuesApiURI.store);

    return postRequest(url, {name, value, description});
};

export default useAttributeValueValueAddHook;