import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {VendorType, defaultSelectedVendor, destroyVendor} from "../../../pages/vendors/show/showVendorData";
import {
    VendorsResponseDataType,
    VendorsTableListHookProps,
    VendorsTableListHookType,
    defaultVendorsResponseData,
    DestroyVendorRequestDataType,
    vendorsRequest,
} from "./vendorsTableListData";

const useVendorsTableListHook = ({fetchVendors, vendorsBaseUrl}: VendorsTableListHookProps): VendorsTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [vendorsQueryEnabled, setVendorsQueryEnabled] = useState<boolean>(fetchVendors);
    const [vendorsAlertData, setVendorsAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteVendorAlertData, setDeleteVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedVendor, setSelectedVendor] = useState<VendorType>(defaultSelectedVendor);
    const [vendorsResponseData, setVendorsResponseData] = useState<VendorsResponseDataType>(defaultVendorsResponseData);

    const vendorsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["vendors"],
        queryFn: () => vendorsRequest(vendorsResponseData.number, vendorsResponseData.size, searchNeedle, vendorsBaseUrl),
        enabled: vendorsQueryEnabled,
    });

    const destroyVendorVendorResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyVendorRequestDataType, any> = useMutation({
        mutationFn: destroyVendor,
        onError: (error: AxiosError): void => {
            setDeleteVendorAlertData(errorAlert(error));
            setVendorsQueryEnabled(false);

            log("Destroy vendor failure", destroyVendorVendorResponse);
        },
        onSuccess: (): void => {
            setDeleteVendorAlertData({show: false});
            setVendorsQueryEnabled(true);

            const toastMessage: string = `Fournisseur ${selectedVendor.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy vendor successful", destroyVendorVendorResponse);
        }
    });

    if(vendorsQueryEnabled && vendorsResponse.isError) {
        setVendorsQueryEnabled(false);
        setVendorsAlertData(errorAlert(vendorsResponse.error));

        log("Vendors list failure", vendorsResponse);
    }

    if(vendorsQueryEnabled && vendorsResponse.isSuccess && !vendorsResponse.isFetching) {
        setVendorsQueryEnabled(false);
        setVendorsAlertData({show: false});

        setVendorsResponseData(vendorsResponse.data.data);

        log("Vendors list successful", vendorsResponse);
    }

    const isVendorsPending: boolean = vendorsResponse.isFetching;
    const isDeleteVendorPending: boolean = destroyVendorVendorResponse.isPending;

    const handleDeleteVendor = (): void => {
        setDeleteVendorAlertData({show: false});

        destroyVendorVendorResponse.mutate({id: selectedVendor.id});
    }

    const showDeleteModal = (vendor: VendorType): void => {
        onDeleteModalOpen();
        setSelectedVendor(vendor);
        setDeleteVendorAlertData({show: false});
    }

    const fetchPaginatedVendors = (next: boolean): void => {
        if(next && !vendorsResponseData.last) setVendorsResponseData({...vendorsResponseData, number: vendorsResponseData.number + 1});
        else if(!next && !vendorsResponseData.first) setVendorsResponseData({...vendorsResponseData, number: vendorsResponseData.number - 1})

        setVendorsQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleVendors = (needle: string): void => {
        setSearchNeedle(needle);
        setVendorsResponseData({...vendorsResponseData, number: 0});

        setVendorsQueryEnabled(true);
    }

    return {
        vendorsResponseData,
        isVendorsPending,
        vendorsAlertData,
        fetchPaginatedVendors,
        fetchPaginatedNeedleVendors,
        onDeleteModalClose,
        selectedVendor,
        showDeleteModal,
        isDeleteModalOpen,
        deleteVendorAlertData,
        isDeleteVendorPending,
        handleDeleteVendor,
    };
};

export default useVendorsTableListHook;