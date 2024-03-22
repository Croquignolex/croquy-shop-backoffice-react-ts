import { AxiosError } from "axios";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useMutation, UseMutationResult} from "@tanstack/react-query";

import {deleteShop} from "../../helpers/apiRequestsHelpers";
import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {DeleteShopHookProps, DeleteShopHookType} from "./shopsData";

const useDeleteShopHook = ({selectedShop, closeModal}: DeleteShopHookProps): DeleteShopHookType => {
    let deleteShopAlertData: ErrorAlertType = {show: false};

    const toast: CreateToastFnReturn = useToast();

    const deleteShopResponse: UseMutationResult<any, AxiosError, any, any> = useMutation({mutationFn: deleteShop});

    if(deleteShopResponse.isError) {
        deleteShopAlertData = errorAlert(deleteShopResponse.error);

        closeModal();

        log("Shop delete failure", deleteShopResponse);
    }

    if(deleteShopResponse.isSuccess && !deleteShopResponse.isPending) {
        const toastMessage: string = `Boutique ${selectedShop.name} supprimée avec succès`;

        toastAlert(toast, toastMessage, AlertStatusEnumType.success);

        closeModal(true);

        log("Shop delete successful", deleteShopResponse);
    }

    const isDeleteShopPending: boolean = deleteShopResponse.isPending;

    const handleDeleteShop = (): void => deleteShopResponse.mutate(selectedShop.id);

    return {isDeleteShopPending, deleteShopAlertData, handleDeleteShop};
};

export default useDeleteShopHook;