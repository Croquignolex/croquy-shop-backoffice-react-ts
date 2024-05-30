import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AddressType, AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {
    UpdateAddressFormHookeProps,
    UpdateAddressFormHookType,
    UpdateAddressFormType,
    updateAddressRequest,
    UpdateAddressRequestDataType
} from "./updateaAdressFormData";

const useUpdateAddressFormHook = ({baseUrl, address, handleAddressUpdate}: UpdateAddressFormHookeProps): UpdateAddressFormHookType => {
    const [addAddressAlertData, setAddAddressAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();

    const updateAddressResponse: UseMutationResult<AxiosResponse, AxiosError, UpdateAddressRequestDataType, any> = useMutation({
        mutationFn: updateAddressRequest,
        onError: (error: AxiosError): void => {
            setAddAddressAlertData(errorAlert(error));

            log("Store address failure", updateAddressResponse);
        },
        onSuccess: (data: AxiosResponse<AddressType>, variables: UpdateAddressRequestDataType): void => {
            setAddAddressAlertData({show: false});

            const toastMessage: string = address ? `Addresse modifié avec succès` : `Addresse ajoutée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            handleAddressUpdate(data.data);

            log("Store address successful", updateAddressResponse);
        }
    });

    const handleAddAddress = (values: UpdateAddressFormType): void => {
        const {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description}: UpdateAddressFormType = values;
        updateAddressResponse.mutate({streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, baseUrl});
    }

    const isAddAddressPending: boolean = updateAddressResponse.isPending;

    return {addAddressAlertData, isAddAddressPending, handleAddAddress};
};

export default useUpdateAddressFormHook;