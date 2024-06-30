import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useVendorAddHook = ({added, finished}: VendorAddHookProps): VendorAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addVendorAlertData, setAddVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeVendorResponse: UseMutationResult<AxiosResponse, AxiosError, VendorAddRequestDataType, any> = useMutation({
        mutationFn: storeVendorRequest,
        onError: (error: AxiosError): void => {
            setAddVendorAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: VendorAddRequestDataType): void => {
            setAddVendorAlertData({show: false});

            // Reload component
            if(next) {
                added();
                setSequence(sequence + 1);
            }
            else {
                finished();
            }

            toast({
                title: t("add"),
                description: `${t("vendor_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: VendorAddFormType, next: boolean = false): void => {
        const {name, description}: VendorAddFormType = values;
        setAddVendorAlertData({show: false});
        setNext(next);

        storeVendorResponse.mutate({name, description});
    }

    const handleAddVendor = (values: VendorAddFormType): void => save(values);
    const handleAddVendorAndContinue = (values: VendorAddFormType): void => save(values, true);

    const isAddVendorPending: boolean = storeVendorResponse.isPending;

    return {
        addVendorAlertData,
        handleAddVendor,
        handleAddVendorAndContinue,
        sequence,
        isAddVendorPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const vendorAddInitialStaticValues: VendorAddFormType = {
    name: '',
    description: ''
};

export const addVendorSchema: Yup.ObjectSchema<VendorAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface VendorAddFormType {
    name: string,
    description: string | null | undefined,
}

interface VendorAddRequestDataType extends VendorAddFormType {}

export interface VendorAddHookType {
    addVendorAlertData: ErrorAlertType,
    isAddVendorPending: boolean,
    sequence: number,
    handleAddVendor: (a: VendorAddFormType) => void,
    handleAddVendorAndContinue: (a: VendorAddFormType) => void,
}

interface VendorAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeVendorRequest = (values: VendorAddRequestDataType): Promise<any> => {
    const {name, description}: VendorAddRequestDataType = values;
    const url: string = v1URL(vendorsApiURI.store);

    return postRequest(url, {name, description});
};

export default useVendorAddHook;