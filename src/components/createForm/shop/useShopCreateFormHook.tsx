import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateShopFormType,
    CreateShopRequestDataType,
    storeShopRequest,
    ShopCreateFormHookType,
    ShopCreateFormHookeProps
} from "./shopCreateFormData";

const useShopCreateFormHook = ({modal, handleFinish, handleAdd}: ShopCreateFormHookeProps): ShopCreateFormHookType => {
    const [createShopAlertData, setCreateShopAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeShopResponse: UseMutationResult<AxiosResponse, AxiosError, CreateShopRequestDataType, any> = useMutation({
        mutationFn: storeShopRequest,
        onError: (error: AxiosError): void => {
            setCreateShopAlertData(errorAlert(error));

            log("Store shop failure", storeShopResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateShopRequestDataType): void => {
            setCreateShopAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.shops.path);
            }

            log("Store shop successful", storeShopResponse);
        }
    });

    const save = ({name, slug, description}: CreateShopFormType, next: boolean = false): void => {
        setCreateShopAlertData({show: false});
        setNext(next);

        storeShopResponse.mutate({name, slug, description});
    }

    const handleCreateShop = (values: CreateShopFormType): void => save(values);
    const handleCreateShopAndContinue = (values: CreateShopFormType): void => save(values, true);

    const isCreateShopPending: boolean = storeShopResponse.isPending;

    return {createShopAlertData, handleCreateShop, handleCreateShopAndContinue, sequence, isCreateShopPending};
};

export default useShopCreateFormHook;