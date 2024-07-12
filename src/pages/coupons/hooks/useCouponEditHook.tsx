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
import {couponsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CouponType} from "../show/showCouponData";

// ######################################## HOOK ######################################## //

const useCouponEditHook = ({selectedCoupon, finished}: CouponEditHookProps): CouponEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editCouponAlertData, setEditCouponAlertData] = useState<ErrorAlertType>({show: false});

    const updateCouponResponse: UseMutationResult<AxiosResponse, AxiosError, CouponEditRequestDataType, any> = useMutation({
        mutationFn: updateCouponRequest,
        onError: (error: AxiosError): void => {
            setEditCouponAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: CouponEditRequestDataType): void => {
            setEditCouponAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("coupon_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditCoupon = (values: CouponEditFormType): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: CouponEditFormType = values;
        updateCouponResponse.mutate({name, slug, website, seoTitle, seoDescription, description, id: selectedCoupon.id});
    }

    const isEditCouponPending: boolean = updateCouponResponse.isPending;
    const formCoupon: CouponEditFormType = selectedCoupon;

    return {
        formCoupon,
        editCouponAlertData,
        handleEditCoupon,
        isEditCouponPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const couponEditSchema: Yup.ObjectSchema<CouponEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CouponEditFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface CouponEditRequestDataType extends CouponEditFormType {
    id: string,
}

export interface CouponEditHookType {
    editCouponAlertData: ErrorAlertType,
    isEditCouponPending: boolean,
    formCoupon: CouponEditFormType,
    handleEditCoupon: (a: CouponEditFormType) => void,
}

interface CouponEditHookProps {
    selectedCoupon: CouponType;
    finished: () => void;
}

const updateCouponRequest = (values: CouponEditRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description, id}: CouponEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(couponsApiURI.update, params);

    return putRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};

export default useCouponEditHook;