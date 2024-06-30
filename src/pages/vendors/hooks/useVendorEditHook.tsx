import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {VendorType} from "../show/showVendorData";

// ######################################## HOOK ######################################## //

const useVendorEditHook = ({selectedVendor, finished}: VendorEditHookProps): VendorEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editVendorAlertData, setEditVendorAlertData] = useState<ErrorAlertType>({show: false});

    const updateVendorResponse: UseMutationResult<AxiosResponse, AxiosError, VendorEditRequestDataType, any> = useMutation({
        mutationFn: updateVendorRequest,
        onError: (error: AxiosError): void => {
            setEditVendorAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: VendorEditRequestDataType): void => {
            setEditVendorAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("vendor_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditVendor = (values: VendorEditFormType): void => {
        const {name, description}: VendorEditFormType = values;
        updateVendorResponse.mutate({name, description, id: selectedVendor.id});
    }

    const isEditVendorPending: boolean = updateVendorResponse.isPending;
    const formVendor: VendorEditFormType = selectedVendor;

    return {
        formVendor,
        editVendorAlertData,
        handleEditVendor,
        isEditVendorPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const vendorEditSchema: Yup.ObjectSchema<VendorEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface VendorEditFormType {
    name: string,
    description: string | null | undefined,
}

interface VendorEditRequestDataType extends VendorEditFormType{
    id: string,
}

export interface VendorEditHookType {
    editVendorAlertData: ErrorAlertType,
    isEditVendorPending: boolean,
    formVendor: VendorEditFormType,
    handleEditVendor: (a: VendorEditFormType) => void,
}

interface VendorEditHookProps {
    selectedVendor: VendorType;
    finished: () => void;
}

const updateVendorRequest = (values: VendorEditRequestDataType): Promise<any> => {
    const {name, description, id}: VendorEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(vendorsApiURI.update, params);

    return putRequest(url, {name, description});
};

export default useVendorEditHook;