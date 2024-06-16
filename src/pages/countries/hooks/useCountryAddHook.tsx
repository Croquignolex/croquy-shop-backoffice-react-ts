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
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## STATICS DATA ######################################## //

export const addCountryInitialStaticValues: AddCountryFormType = {
    name: '',
    phoneCode: '',
    description: ''
};

export const addCountrySchema: Yup.ObjectSchema<AddCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface AddCountryFormType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

interface AddCountryRequestDataType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

export interface CountryAddHookType {
    addCountryAlertData: ErrorAlertType,
    isAddCountryPending: boolean,
    sequence: number,
    handleAddCountry: (a: AddCountryFormType) => void,
    handleAddCountryAndContinue: (a: AddCountryFormType) => void,
}

interface CountryAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeCountryRequest = ({name, phoneCode, description}: AddCountryRequestDataType): Promise<any> => {
    const url: string = v1URL(countriesApiURI.store);

    return postRequest(url, {name, phoneCode, description});
};

// ######################################## HOOK ######################################## //

const useCountryAddHook = ({added, finished}: CountryAddHookProps): CountryAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addCountryAlertData, setAddCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeCountryResponse: UseMutationResult<AxiosResponse, AxiosError, AddCountryRequestDataType, any> = useMutation({
        mutationFn: storeCountryRequest,
        onError: (error: AxiosError): void => {
            setAddCountryAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AddCountryRequestDataType): void => {
            setAddCountryAlertData({show: false});

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
                description: `${t("country_added", {name: variables.name})}`
            });
        }
    });

    const save = ({name, phoneCode, description}: AddCountryFormType, next: boolean = false): void => {
        setAddCountryAlertData({show: false});
        setNext(next);

        storeCountryResponse.mutate({name, phoneCode, description});
    }

    const handleAddCountry = (values: AddCountryFormType): void => save(values);
    const handleAddCountryAndContinue = (values: AddCountryFormType): void => save(values, true);

    const isAddCountryPending: boolean = storeCountryResponse.isPending;

    return {
        addCountryAlertData,
        handleAddCountry,
        handleAddCountryAndContinue,
        sequence,
        isAddCountryPending
    };
};

export default useCountryAddHook;