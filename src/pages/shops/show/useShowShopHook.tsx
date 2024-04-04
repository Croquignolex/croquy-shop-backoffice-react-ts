import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {destroyShop, shopRequest} from "../../../helpers/apiRequestsHelpers";
import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {defaultSelectedShop, DestroyShopRequestDataType, ShopType} from "../shopsData";
import {mainRoutes} from "../../../routes/mainRoutes";
import {ShowShopHookType} from "./showShopData";

const useShowShopHook = (): ShowShopHookType => {
    let shopAlertData: ErrorAlertType = {show: false};
    let { state }:Location  = useLocation();

    const shop: ShopType = state;

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const [shopQueryEnabled, setShopQueryEnabled] = useState<boolean>(true);
    const [deleteShopAlertData, setDeleteShopAlertData] = useState<ErrorAlertType>({show: false});
    const [shopResponseData, setShopResponseData] = useState<ShopType>(defaultSelectedShop);

    const shopResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["shops"],
        queryFn: () => shopRequest(shop.id),
        enabled: shopQueryEnabled,
    });

    const destroyShopShopResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyShopRequestDataType, any> = useMutation({
        mutationFn: destroyShop,
        onError: (error: AxiosError): void => {
            setDeleteShopAlertData(errorAlert(error));
            setShopQueryEnabled(false);

            log("Destroy shop failure", destroyShopShopResponse);
        },
        onSuccess: (): void => {
            setDeleteShopAlertData({show: false});

            const toastMessage: string = `Boutique ${shopResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();
            navigate(`${mainRoutes.shops.path}`);

            log("Destroy shop successful", destroyShopShopResponse);
        }
    });

    if(shopResponse.isError) {
        shopAlertData = errorAlert(shopResponse.error);

        log("Shop show failure", shopResponse);
    }

    if(shopQueryEnabled && shopResponse.isSuccess && !shopResponse.isFetching) {
        setShopQueryEnabled(false);
        setShopResponseData(shopResponse.data.data);

        log("Shops list successful", shopResponse);
    }

    const isShopsPending: boolean = shopResponse.isFetching;
    const isDeleteShopPending: boolean = destroyShopShopResponse.isPending;

    const handleDeleteShop = (): void => {
        setDeleteShopAlertData({show: false});

        destroyShopShopResponse.mutate({id: shop.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteShopAlertData({show: false});
    }

    return {
        isShopsPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,
        handleDeleteShop, shopAlertData, shopResponseData
    };
};

export default useShowShopHook;