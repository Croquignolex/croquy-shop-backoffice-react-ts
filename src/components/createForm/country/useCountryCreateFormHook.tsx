import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateCountryFormType,
    CreateCountryRequestDataType,
    storeCountryRequest,
    CountryCreateFormHookType,
    CountryCreateFormHookeProps
} from "./countryCreateFormData";

const useCountryCreateFormHook = ({modal, handleFinish, handleAdd}: CountryCreateFormHookeProps): CountryCreateFormHookType => {
    const [createCountryAlertData, setCreateCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeCountryResponse: UseMutationResult<AxiosResponse, AxiosError, CreateCountryRequestDataType, any> = useMutation({
        mutationFn: storeCountryRequest,
        onError: (error: AxiosError): void => {
            setCreateCountryAlertData(errorAlert(error));

            log("Store country failure", storeCountryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateCountryRequestDataType): void => {
            setCreateCountryAlertData({show: false});

            const toastMessage: string = `Pays ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.countries.path);
            }

            log("Store country successful", storeCountryResponse);
        }
    });

    const save = ({name, phoneCode, description}: CreateCountryFormType, next: boolean = false): void => {
        setCreateCountryAlertData({show: false});
        setNext(next);

        storeCountryResponse.mutate({name, phoneCode, description});
    }

    const handleCreateCountry = (values: CreateCountryFormType): void => save(values);
    const handleCreateCountryAndContinue = (values: CreateCountryFormType): void => save(values, true);

    const isCreateCountryPending: boolean = storeCountryResponse.isPending;

    return {createCountryAlertData, handleCreateCountry, handleCreateCountryAndContinue, sequence, isCreateCountryPending};
};

export default useCountryCreateFormHook;