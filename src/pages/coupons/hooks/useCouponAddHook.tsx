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
import {couponsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useCouponAddHook = ({added, finished}: CouponAddHookProps): CouponAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addCouponAlertData, setAddCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeCouponResponse: UseMutationResult<AxiosResponse, AxiosError, CouponAddRequestDataType, any> = useMutation({
        mutationFn: storeCouponRequest,
        onError: (error: AxiosError): void => {
            setAddCouponAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: CouponAddRequestDataType): void => {
            setAddCouponAlertData({show: false});

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
                description: `${t("coupon_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: CouponAddFormType, next: boolean = false): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: CouponAddFormType = values;
        setAddCouponAlertData({show: false});
        setNext(next);

        storeCouponResponse.mutate({name, slug, website, seoTitle, seoDescription, description});
    }

    const handleAddCoupon = (values: CouponAddFormType): void => save(values);
    const handleAddCouponAndContinue = (values: CouponAddFormType): void => save(values, true);

    const isAddCouponPending: boolean = storeCouponResponse.isPending;

    return {
        addCouponAlertData,
        handleAddCoupon,
        handleAddCouponAndContinue,
        sequence,
        isAddCouponPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const couponAddInitialStaticValues: CouponAddFormType = {
    name: "",
    slug: "",
    website: "",
    seoTitle: "",
    seoDescription: "",
    description: ""
};

export const couponAddSchema: Yup.ObjectSchema<CouponAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CouponAddFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface CouponAddRequestDataType extends CouponAddFormType {}

export interface CouponAddHookType {
    addCouponAlertData: ErrorAlertType,
    isAddCouponPending: boolean,
    sequence: number,
    handleAddCoupon: (a: CouponAddFormType) => void,
    handleAddCouponAndContinue: (a: CouponAddFormType) => void,
}

interface CouponAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeCouponRequest = (values: CouponAddRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description}: CouponAddRequestDataType = values;
    const url: string = v1URL(couponsApiURI.store);

    return postRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};

export default useCouponAddHook;