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
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {AttributeValueType} from "../show/showAttributeValueData";

// ######################################## HOOK ######################################## //

const useAttributeValueValueEditHook = ({selectedAttributeValue, finished}: AttributeValueEditHookProps): AttributeValueEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editAttributeValueAlertData, setEditAttributeValueAlertData] = useState<ErrorAlertType>({show: false});

    const updateAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, AttributeValueEditRequestDataType, any> = useMutation({
        mutationFn: updateAttributeValueRequest,
        onError: (error: AxiosError): void => {
            setEditAttributeValueAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AttributeValueEditRequestDataType): void => {
            setEditAttributeValueAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("attributeValue_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditAttributeValue = (values: AttributeValueEditFormType): void => {
        const {name, value, description}: AttributeValueEditFormType = values;
        updateAttributeValueResponse.mutate({name, value, description, id: selectedAttributeValue.id});
    }

    const isEditAttributeValuePending: boolean = updateAttributeValueResponse.isPending;
    const formAttributeValue: AttributeValueEditFormType = selectedAttributeValue;

    return {
        formAttributeValue,
        editAttributeValueAlertData,
        handleEditAttributeValue,
        isEditAttributeValuePending
    };
};

// ######################################## STATICS DATA ######################################## //

export const attributeValueEditSchema: Yup.ObjectSchema<AttributeValueEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    value: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AttributeValueEditFormType {
    name: string,
    value: string,
    description: string | null | undefined,
}

interface AttributeValueEditRequestDataType extends AttributeValueEditFormType{
    id: string,
}

export interface AttributeValueEditHookType {
    editAttributeValueAlertData: ErrorAlertType,
    isEditAttributeValuePending: boolean,
    formAttributeValue: AttributeValueEditFormType,
    handleEditAttributeValue: (a: AttributeValueEditFormType) => void,
}

interface AttributeValueEditHookProps {
    selectedAttributeValue: AttributeValueType;
    finished: () => void;
}

const updateAttributeValueRequest = (values: AttributeValueEditRequestDataType): Promise<any> => {
    const {name, value, description, id}: AttributeValueEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributeValuesApiURI.update, params);

    return putRequest(url, {name, value, description});
};

export default useAttributeValueValueEditHook;