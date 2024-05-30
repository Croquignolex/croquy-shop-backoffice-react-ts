import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateBrandFormType,
    CreateBrandRequestDataType,
    storeBrandRequest,
    BrandCreateFormHookType,
    BrandCreateFormHookeProps
} from "./brandCreateFormData";

const useBrandCreateFormHook = ({modal, handleFinish, handleAdd}: BrandCreateFormHookeProps): BrandCreateFormHookType => {
    const [createBrandAlertData, setCreateBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeBrandResponse: UseMutationResult<AxiosResponse, AxiosError, CreateBrandRequestDataType, any> = useMutation({
        mutationFn: storeBrandRequest,
        onError: (error: AxiosError): void => {
            setCreateBrandAlertData(errorAlert(error));

            log("Store brand failure", storeBrandResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateBrandRequestDataType): void => {
            setCreateBrandAlertData({show: false});

            const toastMessage: string = `Marque ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.brands.path);
            }

            log("Store brand successful", storeBrandResponse);
        }
    });

    const save = ({name, slug, website, seoTitle, seoDescription, description}: CreateBrandFormType, next: boolean = false): void => {
        setCreateBrandAlertData({show: false});
        setNext(next);

        storeBrandResponse.mutate({name, slug, website, seoTitle, seoDescription, description});
    }

    const handleCreateBrand = (values: CreateBrandFormType): void => save(values);
    const handleCreateBrandAndContinue = (values: CreateBrandFormType): void => save(values, true);

    const isCreateBrandPending: boolean = storeBrandResponse.isPending;

    return {createBrandAlertData, handleCreateBrand, handleCreateBrandAndContinue, sequence, isCreateBrandPending};
};

export default useBrandCreateFormHook;