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
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CountryType} from "../show/showCountryData";

// ######################################## HOOK ######################################## //

const useCountryEditHook = ({selectedCountry, finished}: CountryEditHookProps): CountryEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editCountryAlertData, setEditCountryAlertData] = useState<ErrorAlertType>({show: false});

    const updateCountryResponse: UseMutationResult<AxiosResponse, AxiosError, CountryEditRequestDataType, any> = useMutation({
        mutationFn: updateCountryRequest,
        onError: (error: AxiosError): void => {
            setEditCountryAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: CountryEditRequestDataType): void => {
            setEditCountryAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("country_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditCountry = ({name, phoneCode, description}: CountryEditFormType): void =>
        updateCountryResponse.mutate({name, phoneCode, description, id: selectedCountry.id});

    const isEditCountryPending: boolean = updateCountryResponse.isPending;
    const formCountry: CountryEditFormType = selectedCountry;

    return {
        formCountry,
        editCountryAlertData,
        handleEditCountry,
        isEditCountryPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const countryEditSchema: Yup.ObjectSchema<CountryEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CountryEditFormType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

interface CountryEditRequestDataType extends CountryEditFormType {
    id: string,
}

export interface CountryEditHookType {
    editCountryAlertData: ErrorAlertType,
    isEditCountryPending: boolean,
    formCountry: CountryEditFormType,
    handleEditCountry: (a: CountryEditFormType) => void,
}

interface CountryEditHookProps {
    selectedCountry: CountryType;
    finished: () => void;
}

const updateCountryRequest = ({name, phoneCode, description, id}: CountryEditRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.update, params);

    return putRequest(url, {name, phoneCode, description});
};

export default useCountryEditHook;