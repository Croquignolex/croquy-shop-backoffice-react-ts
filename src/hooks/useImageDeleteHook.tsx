import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {ErrorAlertType} from "../helpers/globalTypesHelper";
import {v1URL} from "../helpers/apiRequestsHelpers";
import {deleteRequest} from "../helpers/axiosHelpers";
import {DestroyImageRequestDataType} from "../components/showImage/showImageData";
import {errorAlert} from "../helpers/generalHelpers";

// ######################################## STATICS DATA ######################################## //

export interface ImageDeleteHookType {
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteImageAlertData: ErrorAlertType,
    isDeleteImagePending: boolean,
    handleDeleteImage: () => void,
    onDeleteModalClose: () => void,
}

export interface ImageDeleteHookProps {
    deleted: () => void,
    imageBaseUrl: string
}

export const destroyImageRequest = ({baseUrl}: DestroyImageRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl);

    return deleteRequest(url);
};

// ######################################## HOOK ######################################## //

const useImageDeleteHook = ({imageBaseUrl, deleted}: ImageDeleteHookProps): ImageDeleteHookType => {
    const {onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose} = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [deleteImageAlertData, setDeleteImageAlertData] = useState<ErrorAlertType>({show: false});

    const imageDestroyResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyImageRequestDataType, any> = useMutation({
        mutationFn: destroyImageRequest,
        onError: (error: AxiosError): void => {
            setDeleteImageAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setDeleteImageAlertData({show: false});
            deleted();

            toast({
                title: t("delete"),
                description: `${t("image_deleted")}`
            });

            onDeleteModalClose();
        }
    });

    const handleDeleteImage = (): void => {
        setDeleteImageAlertData({show: false});
        imageDestroyResponse.mutate({baseUrl: imageBaseUrl});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteImageAlertData({show: false});
    }

    const isDeleteImagePending: boolean = imageDestroyResponse.isPending;

    return {
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteImageAlertData,
        isDeleteImagePending,
        handleDeleteImage,
    };
};

export default useImageDeleteHook;