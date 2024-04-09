import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AddCountryFormType, AddCountryHookType, AddCountryRequestDataType, storeCountryRequest} from "./addCountryData";
import {mainRoutes} from "../../../routes/mainRoutes";

const useAddCountryHook = (): AddCountryHookType => {
    const [addCountryAlertData, setAddCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeCountryResponse: UseMutationResult<AxiosResponse, AxiosError, AddCountryRequestDataType, any> = useMutation({
        mutationFn: storeCountryRequest,
        onError: (error: AxiosError): void => {
            setAddCountryAlertData(errorAlert(error));

            log("Store shop failure", storeCountryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddCountryRequestDataType): void => {
            setAddCountryAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) setSequence(sequence + 1);
            else navigate(mainRoutes.shops.path);

            log("Store shop successful", storeCountryResponse);
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

    return {addCountryAlertData, handleAddCountry, handleAddCountryAndContinue, sequence, isAddCountryPending};
};

export default useAddCountryHook;