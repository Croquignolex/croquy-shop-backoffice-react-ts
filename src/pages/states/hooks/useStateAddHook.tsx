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
import {CountryType} from "../../countries/show/showCountryData";

// ######################################## HOOK ######################################## //

const useStateAddHook = ({selectedCountry, added, finished}: StateAddHookProps): StateAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addStateAlertData, setAddStateAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeStateResponse: UseMutationResult<AxiosResponse, AxiosError, StateAddRequestDataType, any> = useMutation({
        mutationFn: storeStateRequest,
        onError: (error: AxiosError): void => {
            setAddStateAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: StateAddRequestDataType): void => {
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

    const save = ({name, countryId, description}: StateAddFormType, next: boolean = false): void => {
        setAddStateAlertData({show: false});
        setNext(next);

        storeStateResponse.mutate({name, countryId, description});
    }

    const handleAddState = (values: StateAddFormType): void => save(values);
    const handleAddStateAndContinue = (values: StateAddFormType): void => save(values, true);

    const isAddStatePending: boolean = storeStateResponse.isPending;
    const formState: StateAddFormType = {...stateAddInitialStaticValues, countryId: selectedCountry?.id || ""};

    return {
        addStateAlertData,
        handleAddState,
        handleAddStateAndContinue,
        sequence,
        formState,
        isAddStatePending
    };
};

// ######################################## STATICS DATA ######################################## //

const stateAddInitialStaticValues: StateAddFormType = {
    name: "",
    countryId: "",
    description: ""
};

export const stateAddSchema: Yup.ObjectSchema<StateAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface StateAddFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

interface StateAddRequestDataType extends StateAddFormType {}

export interface StateAddHookType {
    addStateAlertData: ErrorAlertType,
    isAddStatePending: boolean,
    sequence: number,
    formState: StateAddFormType,
    handleAddState: (a: StateAddFormType) => void,
    handleAddStateAndContinue: (a: StateAddFormType) => void,
}

interface StateAddHookProps {
    added: () => void;
    finished: () => void;
    selectedCountry?: CountryType;
}

const storeStateRequest = ({name, countryId, description}: StateAddRequestDataType): Promise<any> => {
    const url: string = v1URL(statesApiURI.store);

    return postRequest(url, {name, countryId, description});
};

export default useStateAddHook;