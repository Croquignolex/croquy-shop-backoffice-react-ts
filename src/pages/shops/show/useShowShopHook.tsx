import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AddressType, AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
// import {DestroyShopRequestDataType} from "../../../components/tableList/shops/shopsTableListData";
import {
    shopRequest,
    ShopType,
    defaultSelectedShop,
    destroyShop,
    ShowShopHookType,
    toggleShop,
    ToggleShopRequestDataType
} from "./showShopData";

const useShowShopHook = (): ShowShopHookType => {
    let shopAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [shopQueryEnabled, setShopQueryEnabled] = useState<boolean>(true);
    const [deleteShopAlertData, setDeleteShopAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleShopAlertData, setToggleShopAlertData] = useState<ErrorAlertType>({show: false});
    const [shopResponseData, setShopResponseData] = useState<ShopType>(defaultSelectedShop);

    const shopResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["shop"],
        queryFn: () => shopRequest(id || ""),
        enabled: shopQueryEnabled,
    });

    const destroyShopShopResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: destroyShop,
        onError: (error: AxiosError): void => {
            setDeleteShopAlertData(errorAlert(error));

            log("Destroy shop failure", destroyShopShopResponse);
        },
        onSuccess: (): void => {
            setDeleteShopAlertData({show: false});

            const toastMessage: string = `Boutique ${shopResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.shops.path}`);

            log("Destroy shop successful", destroyShopShopResponse);
        }
    });

    const toggleShopShopResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleShopRequestDataType, any> = useMutation({
        mutationFn: toggleShop,
        onError: (error: AxiosError): void => {
            setToggleShopAlertData(errorAlert(error));

            log("Toggle shop failure", toggleShopShopResponse);
        },
        onSuccess: (): void => {
            setToggleShopAlertData({show: false});

            const toastMessage: string = `Boutique ${shopResponseData.name} ${shopResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setShopResponseData({...shopResponseData, enabled: !shopResponseData.enabled});

            log("Toggle shop successful", toggleShopShopResponse);
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

    const isShopPending: boolean = shopResponse.isFetching;
    const isDeleteShopPending: boolean = destroyShopShopResponse.isPending;
    const isToggleShopPending: boolean = toggleShopShopResponse.isPending;

    const handleDeleteShop = (): void => {
        setDeleteShopAlertData({show: false});

        destroyShopShopResponse.mutate({id: shopResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteShopAlertData({show: false});
    }

    const handleToggleShop = (): void => {
        setToggleShopAlertData({show: false});

        toggleShopShopResponse.mutate({id: shopResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleShopAlertData({show: false});
    }

    const handleAddressUpdate = (address: AddressType | null): void => {
        setShopResponseData({...shopResponseData, address});
    }

    return {
        isShopPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteShopAlertData,
        isDeleteShopPending,
        handleDeleteShop,
        shopAlertData,
        shopResponseData,
        handleToggleShop,
        isToggleShopPending,
        toggleShopAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleAddressUpdate,
    };
};

export default useShowShopHook;