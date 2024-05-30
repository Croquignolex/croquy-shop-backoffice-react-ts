import {useState} from "react";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";
import {AxiosError, AxiosResponse} from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";

import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {AlertStatusEnumType, defaultMedia, ErrorAlertType, MediaType} from "../../helpers/globalTypesHelper";
import {
    ChangeImageFormType,
    changeImageRequest,
    ChangeImageRequestDataType,
    destroyImageRequest,
    DestroyImageRequestDataType,
    ShowImageHookProps,
    ShowImageHookType
} from "./showImageData";

const useShowImageHook = ({imageBaseUrl, image, handleImageUpdate}: ShowImageHookProps): ShowImageHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [changeImageAlertData, setChangeImageAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteImageAlertData, setDeleteImageAlertData] = useState<ErrorAlertType>({show: false});

    const changeImageResponse: UseMutationResult<AxiosResponse, AxiosError, ChangeImageRequestDataType, any> = useMutation({
        mutationFn: changeImageRequest,
        onError: (error: AxiosError): void => {
            setChangeImageAlertData(errorAlert(error));

            log("Destroy country failure", changeImageResponse);
        },
        onSuccess: (data: AxiosResponse<MediaType>): void => {
            setChangeImageAlertData({show: false});

            const toastMessage: string = `Image mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            if(image === null) handleImageUpdate({...defaultMedia, path: data.data?.path});
            else handleImageUpdate({...image, path: data.data?.path});

            log("Destroy country successful", changeImageResponse);
        }
    });

    const destroyImageResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyImageRequestDataType, any> = useMutation({
        mutationFn: destroyImageRequest,
        onError: (error: AxiosError): void => {
            setDeleteImageAlertData(errorAlert(error));

            log("Destroy image failure", destroyImageResponse);
        },
        onSuccess: (): void => {
            setDeleteImageAlertData({show: false});

            const toastMessage: string = `Image supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            handleImageUpdate(null);
            onDeleteModalClose();

            log("Destroy image successful", destroyImageResponse);
        }
    });

    const isChangeImagePending: boolean = changeImageResponse.isPending;
    const isDeleteImagePending: boolean = destroyImageResponse.isPending;

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteImageAlertData({show: false});
    }

    const handleDeleteImage = (): void => {
        setDeleteImageAlertData({show: false});

        destroyImageResponse.mutate({baseUrl: imageBaseUrl});
    }

    const handleChangeImage = ({image}: ChangeImageFormType): void => {
        if(image instanceof File) {
            changeImageResponse.mutate({image, baseUrl: imageBaseUrl});
        } else {
            setChangeImageAlertData({show: true, status: AlertStatusEnumType.ERROR, message: "Erreur de lecture de l'image"});
        }
    };

    return {
        changeImageAlertData,
        handleChangeImage,
        deleteImageAlertData,
        handleDeleteImage,
        isChangeImagePending,
        showDeleteModal,
        isDeleteModalOpen,
        isDeleteImagePending,
        onDeleteModalClose
    };
};

export default useShowImageHook;