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
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useShopAddHook = ({added, finished}: ShopAddHookProps): ShopAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addShopAlertData, setAddShopAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeShopResponse: UseMutationResult<AxiosResponse, AxiosError, ShopAddRequestDataType, any> = useMutation({
        mutationFn: storeShopRequest,
        onError: (error: AxiosError): void => {
            setAddShopAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: ShopAddRequestDataType): void => {
            setAddShopAlertData({show: false});

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
                description: `${t("shop_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: ShopAddFormType, next: boolean = false): void => {
        const {name, slug, description}: ShopAddFormType = values;
        setAddShopAlertData({show: false});
        setNext(next);

        storeShopResponse.mutate({name, slug, description});
    }

    const handleAddShop = (values: ShopAddFormType): void => save(values);
    const handleAddShopAndContinue = (values: ShopAddFormType): void => save(values, true);

    const isAddShopPending: boolean = storeShopResponse.isPending;

    return {
        addShopAlertData,
        handleAddShop,
        handleAddShopAndContinue,
        sequence,
        isAddShopPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const shopAddInitialStaticValues: ShopAddFormType = {
    name: "",
    slug: "",
    description: ""
};

export const addShopSchema: Yup.ObjectSchema<ShopAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface ShopAddFormType {
    name: string,
    slug: string,
    description: string | null | undefined,
}

interface ShopAddRequestDataType extends ShopAddFormType {}

export interface ShopAddHookType {
    addShopAlertData: ErrorAlertType,
    isAddShopPending: boolean,
    sequence: number,
    handleAddShop: (a: ShopAddFormType) => void,
    handleAddShopAndContinue: (a: ShopAddFormType) => void,
}

interface ShopAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeShopRequest = (values: ShopAddRequestDataType): Promise<any> => {
    const {name, slug, description}: ShopAddRequestDataType = values;
    const url: string = v1URL(shopsApiURI.store);

    return postRequest(url, {name, slug, description});
};

export default useShopAddHook;