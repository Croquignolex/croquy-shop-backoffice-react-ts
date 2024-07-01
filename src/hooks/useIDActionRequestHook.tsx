import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {useDisclosure} from "@chakra-ui/react";

import {patchRequest, deleteRequest, postRequest} from "../helpers/axiosHelpers";
import {ErrorAlertType} from "../helpers/globalTypesHelper";
import {v1URL} from "../helpers/apiRequestsHelpers";
import {errorAlert} from "../helpers/generalHelpers";

// ######################################## HOOK ######################################## //

const useIDActionRequestHook = ({done, uri, type}: IDActionRequestHookProps): IDActionRequestHookType => {
    const {onOpen: onModalOpen, isOpen: isModalOpen, onClose: onModalClose} = useDisclosure();

    const [alertData, setAlertData] = useState<ErrorAlertType>({show: false});

    const response: UseMutationResult<AxiosResponse, AxiosError, IDActionRequestDataType, any> = useMutation({
        mutationFn: request,
        onError: (error: AxiosError): void => {
            setAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setAlertData({show: false});
            onModalClose();
            done();
        }
    });

    const handleRequest = (): void => {
        setAlertData({show: false});
        response.mutate({uri, type});
    }

    const showModal = (): void => {
        onModalOpen();
        setAlertData({show: false});
    }

    const isPending: boolean = response.isPending;

    return {
        onModalClose,
        showModal,
        isModalOpen,
        alertData,
        isPending,
        handleRequest,
    };
};

// ######################################## STATICS DATA ######################################## //

export enum IDActionRequestType {
    DELETE = "DELETE",
    TOGGLE = "TOGGLE",
}

export interface IDActionRequestHookType {
    showModal: () => void,
    isModalOpen: boolean,
    alertData: ErrorAlertType,
    isPending: boolean,
    handleRequest: () => void,
    onModalClose: () => void,
}

interface IDActionRequestHookProps {
    done: () => void,
    type: IDActionRequestType,
    uri: string,
}

interface IDActionRequestDataType {
    id?: string,
    uri: string,
    type: IDActionRequestType
}

const request = ({uri, type}: IDActionRequestDataType): Promise<any> => {
    const url: string = v1URL(uri);

    switch (type) {
        case IDActionRequestType.DELETE: return deleteRequest(url);
        case IDActionRequestType.TOGGLE: return patchRequest(url);
        default: return postRequest(url);
    }
};

export default useIDActionRequestHook;