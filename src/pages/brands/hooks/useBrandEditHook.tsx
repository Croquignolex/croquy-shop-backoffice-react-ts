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
import {brandsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {BrandType} from "../show/showBrandData";

// ######################################## STATICS DATA ######################################## //

export const editBrandSchema: Yup.ObjectSchema<EditBrandFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface EditBrandFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface EditBrandRequestDataType {
    id: string,
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface BrandEditHookType {
    editBrandAlertData: ErrorAlertType,
    isEditBrandPending: boolean,
    formBrand: EditBrandFormType,
    handleEditBrand: (a: EditBrandFormType) => void,
}

interface BrandEditHookProps {
    selectedBrand: BrandType;
    finished: () => void;
}

export const updateBrandRequest = (values: EditBrandRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description, id}: EditBrandRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(brandsApiURI.update, params);

    return putRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};

// ######################################## HOOK ######################################## //

const useBrandEditHook = ({selectedBrand, finished}: BrandEditHookProps): BrandEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editBrandAlertData, setEditBrandAlertData] = useState<ErrorAlertType>({show: false});

    const updateBrandResponse: UseMutationResult<AxiosResponse, AxiosError, EditBrandRequestDataType, any> = useMutation({
        mutationFn: updateBrandRequest,
        onError: (error: AxiosError): void => {
            setEditBrandAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: EditBrandRequestDataType): void => {
            setEditBrandAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("brand_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditBrand = (values: EditBrandFormType): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: EditBrandFormType = values;
        updateBrandResponse.mutate({name, slug, website, seoTitle, seoDescription, description, id: selectedBrand.id});
    }

    const isEditBrandPending: boolean = updateBrandResponse.isPending;
    const formBrand: EditBrandFormType = selectedBrand;

    return {
        formBrand,
        editBrandAlertData,
        handleEditBrand,
        isEditBrandPending
    };
};

export default useBrandEditHook;