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
import {brandsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## STATICS DATA ######################################## //

export const addBrandInitialStaticValues: AddBrandFormType = {
    name: "",
    slug: "",
    website: "",
    seoTitle: "",
    seoDescription: "",
    description: ""
};

export const addBrandSchema: Yup.ObjectSchema<AddBrandFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface AddBrandFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface AddBrandRequestDataType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface BrandAddHookType {
    addBrandAlertData: ErrorAlertType,
    isAddBrandPending: boolean,
    sequence: number,
    handleAddBrand: (a: AddBrandFormType) => void,
    handleAddBrandAndContinue: (a: AddBrandFormType) => void,
}

interface BrandAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeBrandRequest = (values: AddBrandRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description}: AddBrandRequestDataType = values;
    const url: string = v1URL(brandsApiURI.store);

    return postRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};

// ######################################## HOOK ######################################## //

const useBrandAddHook = ({added, finished}: BrandAddHookProps): BrandAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addBrandAlertData, setAddBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeBrandResponse: UseMutationResult<AxiosResponse, AxiosError, AddBrandRequestDataType, any> = useMutation({
        mutationFn: storeBrandRequest,
        onError: (error: AxiosError): void => {
            setAddBrandAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: AddBrandRequestDataType): void => {
            setAddBrandAlertData({show: false});

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
                description: `${t("brand_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: AddBrandFormType, next: boolean = false): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: AddBrandFormType = values;
        setAddBrandAlertData({show: false});
        setNext(next);

        storeBrandResponse.mutate({name, slug, website, seoTitle, seoDescription, description});
    }

    const handleAddBrand = (values: AddBrandFormType): void => save(values);
    const handleAddBrandAndContinue = (values: AddBrandFormType): void => save(values, true);

    const isAddBrandPending: boolean = storeBrandResponse.isPending;

    return {
        addBrandAlertData,
        handleAddBrand,
        handleAddBrandAndContinue,
        sequence,
        isAddBrandPending
    };
};

export default useBrandAddHook;