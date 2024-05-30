import {useState} from "react";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";
import {AxiosError, AxiosResponse} from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";

import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";

import {
    destroyAddressRequest,
    DestroyAddressRequestDataType,
    ShowAddressHookProps,
    ShowAddressHookType
} from "./showAddressData";

const useShowAddressHook = ({addressBaseUrl, handleAddressUpdate}: ShowAddressHookProps): ShowAddressHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [deleteAddressAlertData, setDeleteAddressAlertData] = useState<ErrorAlertType>({show: false});

    const destroyAddressResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyAddressRequestDataType, any> = useMutation({
        mutationFn: destroyAddressRequest,
        onError: (error: AxiosError): void => {
            setDeleteAddressAlertData(errorAlert(error));

            log("Destroy address failure", destroyAddressResponse);
        },
        onSuccess: (): void => {
            setDeleteAddressAlertData({show: false});

            const toastMessage: string = `Addresse supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            handleAddressUpdate(null);
            onDeleteModalClose();

            log("Destroy address successful", destroyAddressResponse);
        }
    });

    const isDeleteAddressPending: boolean = destroyAddressResponse.isPending;

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteAddressAlertData({show: false});
    }

    const handleDeleteAddress = (): void => {
        setDeleteAddressAlertData({show: false});

        destroyAddressResponse.mutate({baseUrl: addressBaseUrl});
    }

    return {
        handleDeleteAddress,
        deleteAddressAlertData,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        isDeleteAddressPending,
    };
};

export default useShowAddressHook;