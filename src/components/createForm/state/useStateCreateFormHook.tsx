import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateStateFormType,
    CreateStateRequestDataType,
    storeStateRequest,
    StateCreateFormHookType,
    StateCreateFormHookeProps
} from "./StateCreateFormData";

const useStateCreateFormHook = ({modal, handleFinish}: StateCreateFormHookeProps): StateCreateFormHookType => {
    const [createStateAlertData, setCreateStateAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeStateResponse: UseMutationResult<AxiosResponse, AxiosError, CreateStateRequestDataType, any> = useMutation({
        mutationFn: storeStateRequest,
        onError: (error: AxiosError): void => {
            setCreateStateAlertData(errorAlert(error));

            log("Store state failure", storeStateResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateStateRequestDataType): void => {
            setCreateStateAlertData({show: false});

            const toastMessage: string = `Ville ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) setSequence(sequence + 1);
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.states.path);
            }

            log("Store state successful", storeStateResponse);
        }
    });

    const save = ({name, countryId, description}: CreateStateFormType, next: boolean = false): void => {
        setCreateStateAlertData({show: false});
        setNext(next);

        storeStateResponse.mutate({name, countryId, description});
    }

    const handleCreateState = (values: CreateStateFormType): void => save(values);
    const handleCreateStateAndContinue = (values: CreateStateFormType): void => save(values, true);

    const isCreateStatePending: boolean = storeStateResponse.isPending;

    return {createStateAlertData, handleCreateState, handleCreateStateAndContinue, sequence, isCreateStatePending};
};

export default useStateCreateFormHook;