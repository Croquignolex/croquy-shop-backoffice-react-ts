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
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {ShopType} from "../show/showShopData";

// ######################################## HOOK ######################################## //

const useShopEditHook = ({selectedShop, finished}: ShopEditHookProps): ShopEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editShopAlertData, setEditShopAlertData] = useState<ErrorAlertType>({show: false});

    const updateShopResponse: UseMutationResult<AxiosResponse, AxiosError, ShopEditRequestDataType, any> = useMutation({
        mutationFn: updateShopRequest,
        onError: (error: AxiosError): void => {
            setEditShopAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: ShopEditRequestDataType): void => {
            setEditShopAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("shop_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditShop = (values: ShopEditFormType): void => {
        const {name, slug, description}: ShopEditFormType = values;
        updateShopResponse.mutate({name, slug, description, id: selectedShop.id});
    }

    const isEditShopPending: boolean = updateShopResponse.isPending;
    const formShop: ShopEditFormType = selectedShop;

    return {
        formShop,
        editShopAlertData,
        handleEditShop,
        isEditShopPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const shopEditSchema: Yup.ObjectSchema<ShopEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface ShopEditFormType {
    name: string,
    slug: string,
    description: string | null | undefined,
}

interface ShopEditRequestDataType extends ShopEditFormType{
    id: string,
}

export interface ShopEditHookType {
    editShopAlertData: ErrorAlertType,
    isEditShopPending: boolean,
    formShop: ShopEditFormType,
    handleEditShop: (a: ShopEditFormType) => void,
}

interface ShopEditHookProps {
    selectedShop: ShopType;
    finished: () => void;
}

export const updateShopRequest = (values: ShopEditRequestDataType): Promise<any> => {
    const {name, slug, description, id}: ShopEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(shopsApiURI.update, params);

    return putRequest(url, {name, slug, description});
};

export default useShopEditHook;