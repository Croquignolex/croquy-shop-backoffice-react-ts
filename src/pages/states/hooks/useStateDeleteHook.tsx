import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {errorAlert} from "../../../helpers/generalHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {deleteRequest} from "../../../helpers/axiosHelpers";
import {StateType, defaultSelectedState,} from "../show/showStateData";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {
    ErrorAlertType,
    IDRequestDataType,
    URLParamType
} from "../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export interface StateDeleteHookType {
    selectedState: StateType,
    showDeleteModal: (a: StateType) => void,
    isDeleteModalOpen: boolean,
    deleteStateAlertData: ErrorAlertType,
    isDeleteStatePending: boolean,
    handleDeleteState: () => void,
    onDeleteModalClose: () => void,
}

export interface StateDeleteHookProps {
    deleted: () => void,
}

export const destroyStateRequest = ({id}: IDRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.destroy, params);

    return deleteRequest(url);
};

// ######################################## HOOK ######################################## //

const useStateDeleteHook = ({deleted}: StateDeleteHookProps): StateDeleteHookType => {
    const {onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose} = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [deleteStateAlertData, setDeleteStateAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedState, setSelectedState] = useState<StateType>(defaultSelectedState);

    const destroyStateStateResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: destroyStateRequest,
        onError: (error: AxiosError): void => {
            setDeleteStateAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setDeleteStateAlertData({show: false});
            deleted();

            toast({
                title: t("delete"),
                description: `${t("state_deleted", {name: selectedState.name})}`
            });

            onDeleteModalClose();
        }
    });

    const handleDeleteState = (): void => {
        setDeleteStateAlertData({show: false});
        destroyStateStateResponse.mutate({id: selectedState.id});
    }

    const showDeleteModal = (state: StateType): void => {
        onDeleteModalOpen();
        setSelectedState(state);
        setDeleteStateAlertData({show: false});
    }

    const isDeleteStatePending: boolean = destroyStateStateResponse.isPending;

    return {
        onDeleteModalClose,
        selectedState,
        showDeleteModal,
        isDeleteModalOpen,
        deleteStateAlertData,
        isDeleteStatePending,
        handleDeleteState,
    };
};

export default useStateDeleteHook;