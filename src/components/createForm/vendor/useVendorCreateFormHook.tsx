import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateVendorFormType,
    CreateVendorRequestDataType,
    storeVendorRequest,
    VendorCreateFormHookType,
    VendorCreateFormHookeProps
} from "./vendorCreateFormData";

const useVendorCreateFormHook = ({modal, handleFinish, handleAdd}: VendorCreateFormHookeProps): VendorCreateFormHookType => {
    const [createVendorAlertData, setCreateVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeVendorResponse: UseMutationResult<AxiosResponse, AxiosError, CreateVendorRequestDataType, any> = useMutation({
        mutationFn: storeVendorRequest,
        onError: (error: AxiosError): void => {
            setCreateVendorAlertData(errorAlert(error));

            log("Store vendor failure", storeVendorResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateVendorRequestDataType): void => {
            setCreateVendorAlertData({show: false});

            const toastMessage: string = `Founisseur ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.vendors.path);
            }

            log("Store vendor successful", storeVendorResponse);
        }
    });

    const save = ({name, description}: CreateVendorFormType, next: boolean = false): void => {
        setCreateVendorAlertData({show: false});
        setNext(next);

        storeVendorResponse.mutate({name, description});
    }

    const handleCreateVendor = (values: CreateVendorFormType): void => save(values);
    const handleCreateVendorAndContinue = (values: CreateVendorFormType): void => save(values, true);

    const isCreateVendorPending: boolean = storeVendorResponse.isPending;

    return {createVendorAlertData, handleCreateVendor, handleCreateVendorAndContinue, sequence, isCreateVendorPending};
};

export default useVendorCreateFormHook;