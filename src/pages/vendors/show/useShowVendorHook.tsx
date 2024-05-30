import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AddressType, AlertStatusEnumType, ErrorAlertType, MediaType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {DestroyVendorRequestDataType} from "../../../components/tableList/vendors/vendorsTableListData";
import {
    vendorRequest,
    VendorType,
    defaultSelectedVendor,
    destroyVendor,
    ShowVendorHookType,
    toggleVendor,
    ToggleVendorRequestDataType
} from "./showVendorData";

const useShowVendorHook = (): ShowVendorHookType => {
    let vendorAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [vendorQueryEnabled, setVendorQueryEnabled] = useState<boolean>(true);
    const [deleteVendorAlertData, setDeleteVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleVendorAlertData, setToggleVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [vendorResponseData, setVendorResponseData] = useState<VendorType>(defaultSelectedVendor);

    const vendorResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["vendor"],
        queryFn: () => vendorRequest(id || ""),
        enabled: vendorQueryEnabled,
    });

    const destroyVendorVendorResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyVendorRequestDataType, any> = useMutation({
        mutationFn: destroyVendor,
        onError: (error: AxiosError): void => {
            setDeleteVendorAlertData(errorAlert(error));

            log("Destroy vendor failure", destroyVendorVendorResponse);
        },
        onSuccess: (): void => {
            setDeleteVendorAlertData({show: false});

            const toastMessage: string = `Fournisseur ${vendorResponseData.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.vendors.path}`);

            log("Destroy vendor successful", destroyVendorVendorResponse);
        }
    });

    const toggleVendorVendorResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleVendorRequestDataType, any> = useMutation({
        mutationFn: toggleVendor,
        onError: (error: AxiosError): void => {
            setToggleVendorAlertData(errorAlert(error));

            log("Toggle vendor failure", toggleVendorVendorResponse);
        },
        onSuccess: (): void => {
            setToggleVendorAlertData({show: false});

            const toastMessage: string = `Fournisseur ${vendorResponseData.name} ${vendorResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setVendorResponseData({...vendorResponseData, enabled: !vendorResponseData.enabled});

            log("Toggle vendor successful", toggleVendorVendorResponse);
        }
    });

    if(vendorResponse.isError) {
        vendorAlertData = errorAlert(vendorResponse.error);

        log("Vendor show failure", vendorResponse);
    }

    if(vendorQueryEnabled && vendorResponse.isSuccess && !vendorResponse.isFetching) {
        setVendorQueryEnabled(false);
        setVendorResponseData(vendorResponse.data.data);

        log("Vendors list successful", vendorResponse);
    }

    const isVendorPending: boolean = vendorResponse.isFetching;
    const isDeleteVendorPending: boolean = destroyVendorVendorResponse.isPending;
    const isToggleVendorPending: boolean = toggleVendorVendorResponse.isPending;

    const handleDeleteVendor = (): void => {
        setDeleteVendorAlertData({show: false});

        destroyVendorVendorResponse.mutate({id: vendorResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteVendorAlertData({show: false});
    }

    const handleToggleVendor = (): void => {
        setToggleVendorAlertData({show: false});

        toggleVendorVendorResponse.mutate({id: vendorResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleVendorAlertData({show: false});
    }

    const handleAddressUpdate = (address: AddressType | null): void => {
        setVendorResponseData({...vendorResponseData, address});
    }

    const handleLogoUpdate = (logo: MediaType | null): void => {
        setVendorResponseData({...vendorResponseData, logo});
    }

    return {
        isVendorPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteVendorAlertData,
        isDeleteVendorPending,
        handleDeleteVendor,
        vendorAlertData,
        vendorResponseData,
        handleToggleVendor,
        isToggleVendorPending,
        toggleVendorAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleAddressUpdate,
        handleLogoUpdate
    };
};

export default useShowVendorHook;