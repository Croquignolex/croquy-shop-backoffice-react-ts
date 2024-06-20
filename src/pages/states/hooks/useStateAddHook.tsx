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
import {statesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## STATICS DATA ######################################## //

export const addStateInitialStaticValues: AddStateFormType = {
    name: '',
    countryId: '',
    description: ''
};

export const addStateSchema: Yup.ObjectSchema<AddStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AddStateFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

interface AddStateRequestDataType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

export interface StateAddHookType {
    addStateAlertData: ErrorAlertType,
    isAddStatePending: boolean,
    sequence: number,
    handleAddState: (a: AddStateFormType) => void,
    handleAddStateAndContinue: (a: AddStateFormType) => void,
}

interface StateAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeStateRequest = ({name, countryId, description}: AddStateRequestDataType): Promise<any> => {
    const url: string = v1URL(statesApiURI.store);

    return postRequest(url, {name, countryId, description});
};

// ######################################## HOOK ######################################## //

const useStateAddHook = ({added, finished}: StateAddHookProps): StateAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addStateAlertData, setAddStateAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeStateResponse: UseMutationResult<AxiosResponse, AxiosError, AddStateRequestDataType, any> = useMutation({
        mutationFn: storeStateRequest,
        onError: (error: AxiosError): void => {
            setAddStateAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AddStateRequestDataType): void => {
            setAddStateAlertData({show: false});

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
                description: `${t("state_added", {name: variables.name})}`
            });
        }
    });

    const save = ({name, countryId, description}: AddStateFormType, next: boolean = false): void => {
        setAddStateAlertData({show: false});
        setNext(next);

        storeStateResponse.mutate({name, countryId, description});
    }

    const handleAddState = (values: AddStateFormType): void => save(values);
    const handleAddStateAndContinue = (values: AddStateFormType): void => save(values, true);

    const isAddStatePending: boolean = storeStateResponse.isPending;

    return {
        addStateAlertData,
        handleAddState,
        handleAddStateAndContinue,
        sequence,
        isAddStatePending
    };
};

export default useStateAddHook;