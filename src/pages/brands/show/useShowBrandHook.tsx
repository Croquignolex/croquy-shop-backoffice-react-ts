import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType, MediaType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {DestroyBrandRequestDataType} from "../../../components/tableList/brands/brandsTableListData";
import {
    brandRequest,
    BrandType,
    defaultSelectedBrand,
    destroyBrand,
    ShowBrandHookType,
    toggleBrand,
    ToggleBrandRequestDataType
} from "./showBrandData";

const useShowBrandHook = (): ShowBrandHookType => {
    let brandAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [brandQueryEnabled, setBrandQueryEnabled] = useState<boolean>(true);
    const [deleteBrandAlertData, setDeleteBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleBrandAlertData, setToggleBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [brandResponseData, setBrandResponseData] = useState<BrandType>(defaultSelectedBrand);

    const brandResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["brand"],
        queryFn: () => brandRequest(id || ""),
        enabled: brandQueryEnabled,
    });

    const destroyBrandBrandResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyBrandRequestDataType, any> = useMutation({
        mutationFn: destroyBrand,
        onError: (error: AxiosError): void => {
            setDeleteBrandAlertData(errorAlert(error));

            log("Destroy brand failure", destroyBrandBrandResponse);
        },
        onSuccess: (): void => {
            setDeleteBrandAlertData({show: false});

            const toastMessage: string = `Marque ${brandResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.brands.path}`);

            log("Destroy brand successful", destroyBrandBrandResponse);
        }
    });

    const toggleBrandBrandResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleBrandRequestDataType, any> = useMutation({
        mutationFn: toggleBrand,
        onError: (error: AxiosError): void => {
            setToggleBrandAlertData(errorAlert(error));

            log("Toggle brand failure", toggleBrandBrandResponse);
        },
        onSuccess: (): void => {
            setToggleBrandAlertData({show: false});

            const toastMessage: string = `Marque ${brandResponseData.name} ${brandResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setBrandResponseData({...brandResponseData, enabled: !brandResponseData.enabled});

            log("Toggle brand successful", toggleBrandBrandResponse);
        }
    });

    if(brandResponse.isError) {
        brandAlertData = errorAlert(brandResponse.error);

        log("Brand show failure", brandResponse);
    }

    if(brandQueryEnabled && brandResponse.isSuccess && !brandResponse.isFetching) {
        setBrandQueryEnabled(false);
        setBrandResponseData(brandResponse.data.data);

        log("Brands list successful", brandResponse);
    }

    const isBrandPending: boolean = brandResponse.isFetching;
    const isDeleteBrandPending: boolean = destroyBrandBrandResponse.isPending;
    const isToggleBrandPending: boolean = toggleBrandBrandResponse.isPending;

    const handleDeleteBrand = (): void => {
        setDeleteBrandAlertData({show: false});

        destroyBrandBrandResponse.mutate({id: brandResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteBrandAlertData({show: false});
    }

    const handleToggleBrand = (): void => {
        setToggleBrandAlertData({show: false});

        toggleBrandBrandResponse.mutate({id: brandResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleBrandAlertData({show: false});
    }

    const handleLogoUpdate = (logo: MediaType | null): void => {
        setBrandResponseData({...brandResponseData, logo});
    }

    return {
        isBrandPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteBrandAlertData,
        isDeleteBrandPending,
        handleDeleteBrand,
        brandAlertData,
        brandResponseData,
        handleToggleBrand,
        isToggleBrandPending,
        toggleBrandAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate
    };
};

export default useShowBrandHook;