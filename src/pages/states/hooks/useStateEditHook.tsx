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
import {statesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {StateType} from "../show/showStateData";

// ######################################## STATICS DATA ######################################## //

export const editStateSchema: Yup.ObjectSchema<EditStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditStateFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

interface EditStateRequestDataType {
    id: string,
    name: string,
    countryId: string,
    description: string | null | undefined,
}

export interface StateEditHookType {
    editStateAlertData: ErrorAlertType,
    isEditStatePending: boolean,
    formState: EditStateFormType,
    handleEditState: (a: EditStateFormType) => void,
}

interface StateEditHookProps {
    selectedState: StateType;
    finished: () => void;
}

export const updateStateRequest = ({name, countryId, description, id}: EditStateRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.update, params);

    return putRequest(url, {name, countryId, description});
};

// ######################################## HOOK ######################################## //

const useStateEditHook = ({selectedState, finished}: StateEditHookProps): StateEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editStateAlertData, setEditStateAlertData] = useState<ErrorAlertType>({show: false});

    const updateStateResponse: UseMutationResult<AxiosResponse, AxiosError, EditStateRequestDataType, any> = useMutation({
        mutationFn: updateStateRequest,
        onError: (error: AxiosError): void => {
            setEditStateAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: EditStateRequestDataType): void => {
            setEditStateAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("state_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditState = ({name, countryId, description}: EditStateFormType): void =>
        updateStateResponse.mutate({name, countryId, description, id: selectedState.id});

    const isEditStatePending: boolean = updateStateResponse.isPending;
    const formState: EditStateFormType = {...selectedState, countryId: selectedState.country?.id || ""};

    return {
        formState,
        editStateAlertData,
        handleEditState,
        isEditStatePending
    };
};

export default useStateEditHook;