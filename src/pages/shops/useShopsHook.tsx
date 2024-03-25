import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {deleteShop, shopsRequest} from "../../helpers/apiRequestsHelpers";
import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {
    defaultSelectedShop, defaultShopsResponseData,
    ShopsHookType, ShopsResponseDataType, ShopType
} from "./shopsData";
import {mainRoutes} from "../../routes/mainRoutes";

const useShopsHook = (): ShopsHookType => {
    let shopsAlertData: ErrorAlertType = {show: false};

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [shopsQueryEnabled, setShopsQueryEnabled] = useState<boolean>(true);
    const [deleteShopAlertData, setDeleteShopAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedShop, setSelectedShop] = useState<ShopType>(defaultSelectedShop);
    const [shopsResponseData, setShopsResponseData] = useState<ShopsResponseDataType>(defaultShopsResponseData);

    const shopsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["shops"],
        queryFn: () => shopsRequest(shopsResponseData.number, shopsResponseData.size, searchNeedle),
        enabled: shopsQueryEnabled,
    });

    const deleteShopResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: deleteShop,
        onError: (error: AxiosError): void => {
            setDeleteShopAlertData(errorAlert(error));
            setShopsQueryEnabled(false);

            log("Shop delete failure", deleteShopResponse);
        },
        onSuccess: (): void => {
            setDeleteShopAlertData({show: false});
            setShopsQueryEnabled(true);

            const toastMessage: string = `Boutique ${selectedShop.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();

            log("Shop delete successful", deleteShopResponse);
        }
    });

    if(shopsResponse.isError) {
        shopsAlertData = errorAlert(shopsResponse.error);

        log("Shops list failure", shopsResponse);
    }

    if(shopsQueryEnabled && shopsResponse.isSuccess && !shopsResponse.isFetching) {
        setShopsQueryEnabled(false);
        setShopsResponseData(shopsResponse.data.data);

        log("Shops list successful", shopsResponse);
    }

    const isShopsPending: boolean = shopsResponse.isFetching;
    const isDeleteShopPending: boolean = deleteShopResponse.isPending;

    const handleDeleteShop = (): void => {
        setDeleteShopAlertData({show: false});

        deleteShopResponse.mutate(selectedShop.id);
    }

    const showDeleteModal = (shop: ShopType): void => {
        onDeleteModalOpen();
        setSelectedShop(shop);
        setDeleteShopAlertData({show: false});
    }

    const fetchPaginatedShops = (next: boolean): void => {
        if(next && !shopsResponseData.last) setShopsResponseData({...shopsResponseData, number: shopsResponseData.number + 1});
        else if(!next && !shopsResponseData.first) setShopsResponseData({...shopsResponseData, number: shopsResponseData.number - 1})

        setShopsQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleShops = (needle: string): void => {
        setSearchNeedle(needle);
        setShopsResponseData({...shopsResponseData, number: 0});

        setShopsQueryEnabled(true);
    }

    const navigateToAddShop = (): void => navigate(mainRoutes.addShop.path);

    return {
        shopsResponseData, isShopsPending, shopsAlertData, fetchPaginatedShops, fetchPaginatedNeedleShops, onDeleteModalClose,
        selectedShop, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,  handleDeleteShop, navigateToAddShop,
    };
};

export default useShopsHook;