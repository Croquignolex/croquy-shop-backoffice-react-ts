import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AddStateFormType, AddStateHookType, AddStateRequestDataType, storeStateRequest} from "./addStateData";

const useAddStateHook = (): AddStateHookType => {
    let { state }:Location  = useLocation();

    const [addStateAlertData, setAddStateAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeStateResponse: UseMutationResult<AxiosResponse, AxiosError, AddStateRequestDataType, any> = useMutation({
        mutationFn: storeStateRequest,
        onError: (error: AxiosError): void => {
            setAddStateAlertData(errorAlert(error));

            log("Store state failure", storeStateResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddStateRequestDataType): void => {
            setAddStateAlertData({show: false});

            const toastMessage: string = `Ville ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) setSequence(sequence + 1);
            else navigate(state?.previousPath);

            log("Store state successful", storeStateResponse);
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

    return {isAddStatePending, handleAddState, handleAddStateAndContinue, sequence, addStateAlertData};
};

export default useAddStateHook;