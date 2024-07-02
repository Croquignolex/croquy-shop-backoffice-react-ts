import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AddressType, ErrorAlertType} from "../helpers/globalTypesHelper";
import {patchRequest} from "../helpers/axiosHelpers";
import {errorAlert} from "../helpers/generalHelpers";
import {formValidationMessage} from "../constants/generalConstants";
import {v1URL} from "../helpers/apiRequestsHelpers";

// ######################################## HOOK ######################################## //

const useAddressUpdateHook = ({uri, address, finished}: AddressUpdateHookProps): AddressUpdateHookType => {
    const [updateAddressAlertData, setUpdateAddressAlertData] = useState<ErrorAlertType>({show: false});

    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const updateAddressResponse: UseMutationResult<AxiosResponse, AxiosError, AddressUpdateRequestDataType, any> = useMutation({
        mutationFn: updateAddressRequest,
        onError: (error: AxiosError): void => {
            setUpdateAddressAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AddressUpdateRequestDataType): void => {
            setUpdateAddressAlertData({show: false});

            finished();

            toast({
                title: t("update"),
                description: `${t("address_changed")}`
            });
        }
    });

    const handleUpdateAddress = (values: AddressUpdateFormType): void => {
        const {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description}: AddressUpdateFormType = values;

        updateAddressResponse.mutate({streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, uri});
    }

    const isUpdateAddressPending: boolean = updateAddressResponse.isPending;
    let formAddress: AddressUpdateFormType = {...addressUpdateInitialStaticValues};
    if(address) {
        formAddress.streetAddress = address.streetAddress;
        formAddress.stateId = address.state?.id;
        formAddress.zipcode = address.zipcode;
        formAddress.description = address.description;
        formAddress.phoneNumberTwo = address.phoneNumberTwo;
        formAddress.phoneNumberOne = address.phoneNumberOne;
    }

    return {
        formAddress,
        isUpdateAddressPending,
        handleUpdateAddress,
        updateAddressAlertData
    };
};

// ######################################## STATICS DATA ######################################## //

const addressUpdateInitialStaticValues: AddressUpdateFormType = {
    streetAddress: "",
    phoneNumberOne: "",
    stateId: "",
    zipcode: "",
    phoneNumberTwo: "",
    description: "",
};

export const addressUpdateSchema: Yup.ObjectSchema<AddressUpdateFormType> = Yup.object().shape({
    streetAddress: Yup.string().required(formValidationMessage.required),
    phoneNumberOne: Yup.string().required(formValidationMessage.required),
    stateId: Yup.string().nullable(),
    zipcode: Yup.string().nullable(),
    phoneNumberTwo: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface AddressUpdateFormType {
    streetAddress: string;
    zipcode: string | null | undefined;
    phoneNumberOne: string;
    phoneNumberTwo: string | null | undefined;
    description: string | null | undefined;
    stateId: string | null | undefined;
}

interface AddressUpdateRequestDataType extends AddressUpdateFormType {
    uri: string
}

export interface AddressUpdateHookType {
    updateAddressAlertData: ErrorAlertType,
    isUpdateAddressPending: boolean,
    formAddress: AddressUpdateFormType,
    handleUpdateAddress: (a: AddressUpdateFormType) => void,
}

interface AddressUpdateHookProps {
    address: AddressType | null,
    uri: string;
    finished: () => void;
}

export const updateAddressRequest = (values: AddressUpdateRequestDataType): Promise<any> => {
    const {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, uri}: AddressUpdateRequestDataType = values;
    const url: string = v1URL(uri);

    return patchRequest(url, {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description});
};

export default useAddressUpdateHook;