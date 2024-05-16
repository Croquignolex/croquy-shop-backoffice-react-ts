import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {
    AddAddressFormHookeProps,
    AddressAddFormHookType,
    AddAddressRequestDataType,
    storeAddressRequest,
    AddAddressFormType
} from "./addressAddFormData";

const useAddressAddFormHook = ({baseUrl, handleFinish}: AddAddressFormHookeProps): AddressAddFormHookType => {
    const [addAddressAlertData, setAddAddressAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();

    const storeAddressResponse: UseMutationResult<AxiosResponse, AxiosError, AddAddressRequestDataType, any> = useMutation({
        mutationFn: storeAddressRequest,
        onError: (error: AxiosError): void => {
            setAddAddressAlertData(errorAlert(error));

            log("Store address failure", storeAddressResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddAddressRequestDataType): void => {
            setAddAddressAlertData({show: false});

            const toastMessage: string = `Address ajoutée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            handleFinish();

            log("Store address successful", storeAddressResponse);
        }
    });

    const handleAddAddress = (values: AddAddressFormType): void => {
        const {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description}: AddAddressFormType = values;
        storeAddressResponse.mutate({streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, baseUrl});
    }

    const isAddAddressPending: boolean = storeAddressResponse.isPending;

    return {addAddressAlertData, isAddAddressPending, handleAddAddress};
};

export default useAddressAddFormHook;