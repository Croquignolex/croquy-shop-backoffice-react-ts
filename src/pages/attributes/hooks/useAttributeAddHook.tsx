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
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useAttributeAddHook = ({added, finished}: AttributeAddHookProps): AttributeAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addAttributeAlertData, setAddAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, AttributeAddRequestDataType, any> = useMutation({
        mutationFn: storeAttributeRequest,
        onError: (error: AxiosError): void => {
            setAddAttributeAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AttributeAddRequestDataType): void => {
            setAddAttributeAlertData({show: false});

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
                description: `${t("attribute_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: AttributeAddFormType, next: boolean = false): void => {
        const {name, type, description}: AttributeAddFormType = values;
        setAddAttributeAlertData({show: false});
        setNext(next);

        storeAttributeResponse.mutate({name, type, description});
    }

    const handleAddAttribute = (values: AttributeAddFormType): void => save(values);
    const handleAddAttributeAndContinue = (values: AttributeAddFormType): void => save(values, true);

    const isAddAttributePending: boolean = storeAttributeResponse.isPending;

    return {
        addAttributeAlertData,
        handleAddAttribute,
        handleAddAttributeAndContinue,
        sequence,
        isAddAttributePending
    };
};

// ######################################## STATICS DATA ######################################## //

export const attributeAddInitialStaticValues: AttributeAddFormType = {
    name: '',
    type: '',
    description: ''
};

export const addAttributeSchema: Yup.ObjectSchema<AttributeAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    type: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AttributeAddFormType {
    name: string,
    type: string,
    description: string | null | undefined,
}

interface AttributeAddRequestDataType extends AttributeAddFormType {}

export interface AttributeAddHookType {
    addAttributeAlertData: ErrorAlertType,
    isAddAttributePending: boolean,
    sequence: number,
    handleAddAttribute: (a: AttributeAddFormType) => void,
    handleAddAttributeAndContinue: (a: AttributeAddFormType) => void,
}

interface AttributeAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeAttributeRequest = (values: AttributeAddRequestDataType): Promise<any> => {
    const {name, type, description}: AttributeAddRequestDataType = values;
    const url: string = v1URL(attributesApiURI.store);

    return postRequest(url, {name, type, description});
};

export default useAttributeAddHook;