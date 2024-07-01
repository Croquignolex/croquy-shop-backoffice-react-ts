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
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {AttributeType} from "../show/showAttributeData";

// ######################################## HOOK ######################################## //

const useAttributeEditHook = ({selectedAttribute, finished}: AttributeEditHookProps): AttributeEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editAttributeAlertData, setEditAttributeAlertData] = useState<ErrorAlertType>({show: false});

    const updateAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, AttributeEditRequestDataType, any> = useMutation({
        mutationFn: updateAttributeRequest,
        onError: (error: AxiosError): void => {
            setEditAttributeAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AttributeEditRequestDataType): void => {
            setEditAttributeAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("attribute_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditAttribute = (values: AttributeEditFormType): void => {
        const {name, type, description}: AttributeEditFormType = values;
        updateAttributeResponse.mutate({name, type, description, id: selectedAttribute.id});
    }

    const isEditAttributePending: boolean = updateAttributeResponse.isPending;
    const formAttribute: AttributeEditFormType = selectedAttribute;

    return {
        formAttribute,
        editAttributeAlertData,
        handleEditAttribute,
        isEditAttributePending
    };
};

// ######################################## STATICS DATA ######################################## //

export const attributeEditSchema: Yup.ObjectSchema<AttributeEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    type: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AttributeEditFormType {
    name: string,
    type: string,
    description: string | null | undefined,
}

interface AttributeEditRequestDataType extends AttributeEditFormType{
    id: string,
}

export interface AttributeEditHookType {
    editAttributeAlertData: ErrorAlertType,
    isEditAttributePending: boolean,
    formAttribute: AttributeEditFormType,
    handleEditAttribute: (a: AttributeEditFormType) => void,
}

interface AttributeEditHookProps {
    selectedAttribute: AttributeType;
    finished: () => void;
}

const updateAttributeRequest = (values: AttributeEditRequestDataType): Promise<any> => {
    const {name, type, description, id}: AttributeEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributesApiURI.update, params);

    return putRequest(url, {name, type, description});
};

export default useAttributeEditHook;