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

// ######################################## HOOK ######################################## //

const useStateEditHook = ({selectedState, finished}: StateEditHookProps): StateEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editStateAlertData, setEditStateAlertData] = useState<ErrorAlertType>({show: false});

    const updateStateResponse: UseMutationResult<AxiosResponse, AxiosError, StateEditRequestDataType, any> = useMutation({
        mutationFn: updateStateRequest,
        onError: (error: AxiosError): void => {
            setEditStateAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: StateEditRequestDataType): void => {
            setEditStateAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("state_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditState = ({name, countryId, description}: StateEditFormType): void =>
        updateStateResponse.mutate({name, countryId, description, id: selectedState.id});

    const isEditStatePending: boolean = updateStateResponse.isPending;
    const formState: StateEditFormType = {...selectedState, countryId: selectedState.country?.id || ""};

    return {
        formState,
        editStateAlertData,
        handleEditState,
        isEditStatePending
    };
};

// ######################################## STATICS DATA ######################################## //

export const stateEditSchema: Yup.ObjectSchema<StateEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface StateEditFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

interface StateEditRequestDataType extends StateEditFormType{
    id: string,
}

export interface StateEditHookType {
    editStateAlertData: ErrorAlertType,
    isEditStatePending: boolean,
    formState: StateEditFormType,
    handleEditState: (a: StateEditFormType) => void,
}

interface StateEditHookProps {
    selectedState: StateType;
    finished: () => void;
}

export const updateStateRequest = ({name, countryId, description, id}: StateEditRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.update, params);

    return putRequest(url, {name, countryId, description});
};

export default useStateEditHook;