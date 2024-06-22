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

// ######################################## HOOK ######################################## //

const useBrandAddHook = ({added, finished}: BrandAddHookProps): BrandAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addBrandAlertData, setAddBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeBrandResponse: UseMutationResult<AxiosResponse, AxiosError, BrandAddRequestDataType, any> = useMutation({
        mutationFn: storeBrandRequest,
        onError: (error: AxiosError): void => {
            setAddBrandAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: BrandAddRequestDataType): void => {
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

    const save = (values: BrandAddFormType, next: boolean = false): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: BrandAddFormType = values;
        setAddBrandAlertData({show: false});
        setNext(next);

        storeBrandResponse.mutate({name, slug, website, seoTitle, seoDescription, description});
    }

    const handleAddBrand = (values: BrandAddFormType): void => save(values);
    const handleAddBrandAndContinue = (values: BrandAddFormType): void => save(values, true);

    const isAddBrandPending: boolean = storeBrandResponse.isPending;

    return {
        addBrandAlertData,
        handleAddBrand,
        handleAddBrandAndContinue,
        sequence,
        isAddBrandPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const brandAddInitialStaticValues: BrandAddFormType = {
    name: "",
    slug: "",
    website: "",
    seoTitle: "",
    seoDescription: "",
    description: ""
};

export const brandAddSchema: Yup.ObjectSchema<BrandAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface BrandAddFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface BrandAddRequestDataType extends BrandAddFormType {}

export interface BrandAddHookType {
    addBrandAlertData: ErrorAlertType,
    isAddBrandPending: boolean,
    sequence: number,
    handleAddBrand: (a: BrandAddFormType) => void,
    handleAddBrandAndContinue: (a: BrandAddFormType) => void,
}

interface BrandAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeBrandRequest = (values: BrandAddRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description}: BrandAddRequestDataType = values;
    const url: string = v1URL(brandsApiURI.store);

    return postRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};

export default useBrandAddHook;