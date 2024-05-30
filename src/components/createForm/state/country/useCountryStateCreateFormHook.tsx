import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../../helpers/generalHelpers";
import {
    storeStateRequest,
    CountryStateCreateFormHookeProps,
    CountryStateCreateFormHookType,
    CreateCountryStateRequestDataType,
    CreateCountryStateFormType
} from "./CountryStateCreateFormData";

const useCountryStateCreateFormHook = ({countryId, handleFinish, handleAdd}: CountryStateCreateFormHookeProps): CountryStateCreateFormHookType => {
    const [createCountryStateAlertData, setCreateCountryStateAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();

    const storeCountryStateResponse: UseMutationResult<AxiosResponse, AxiosError, CreateCountryStateRequestDataType, any> = useMutation({
        mutationFn: storeStateRequest,
        onError: (error: AxiosError): void => {
            setCreateCountryStateAlertData(errorAlert(error));

            log("Store state failure", storeCountryStateResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateCountryStateRequestDataType): void => {
            setCreateCountryStateAlertData({show: false});

            const toastMessage: string = `Ville ${variables.name} ajoutée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                setSequence(sequence + 1);
                handleAdd();
            }
            else handleFinish();

            log("Store state successful", storeCountryStateResponse);
        }
    });

    const save = ({name, description}: CreateCountryStateFormType, next: boolean = false): void => {
        setCreateCountryStateAlertData({show: false});
        setNext(next);

        storeCountryStateResponse.mutate({name, description, countryId});
    }

    const handleCreateCountryState = (values: CreateCountryStateFormType): void => save(values);
    const handleCreateCountryStateAndContinue = (values: CreateCountryStateFormType): void => save(values, true);

    const isCreateCountryStatePending: boolean = storeCountryStateResponse.isPending;

    return {
        createCountryStateAlertData,
        handleCreateCountryState,
        handleCreateCountryStateAndContinue,
        sequence,
        isCreateCountryStatePending
    };
};

export default useCountryStateCreateFormHook;