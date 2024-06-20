import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {errorAlert} from "../../../helpers/generalHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {patchRequest} from "../../../helpers/axiosHelpers";
import {StateType, defaultSelectedState,} from "../show/showStateData";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {
    ErrorAlertType,
    IDRequestDataType,
    URLParamType
} from "../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export interface StateToggleHookType {
    selectedState: StateType,
    showToggleModal: (a: StateType) => void,
    isToggleModalOpen: boolean,
    toggleStateAlertData: ErrorAlertType,
    isToggleStatePending: boolean,
    handleToggleState: () => void,
    onToggleModalClose: () => void,
}

export interface StateToggleHookProps {
    toggled: () => void,
}

export const toggleStateRequest = ({id}: IDRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.toggle, params);

    return patchRequest(url);
};

// ######################################## HOOK ######################################## //

const useStateToggleHook = ({toggled}: StateToggleHookProps): StateToggleHookType => {
    const {onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose} = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [toggleStateAlertData, setToggleStateAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedState, setSelectedState] = useState<StateType>(defaultSelectedState);

    const toggleStateStateResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: toggleStateRequest,
        onError: (error: AxiosError): void => {
            setToggleStateAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setToggleStateAlertData({show: false});
            toggled();

            toast({
                title: t(`toggle_${selectedState.enabled}`),
                description: `${t(`state_toggled_${selectedState.enabled}`, {name: selectedState.name})}`
            });

            onToggleModalClose();
        }
    });

    const handleToggleState = (): void => {
        setToggleStateAlertData({show: false});
        toggleStateStateResponse.mutate({id: selectedState.id});
    }

    const showToggleModal = (state: StateType): void => {
        onToggleModalOpen();
        setSelectedState(state);
        setToggleStateAlertData({show: false});
    }

    const isToggleStatePending: boolean = toggleStateStateResponse.isPending;

    return {
        onToggleModalClose,
        selectedState,
        showToggleModal,
        isToggleModalOpen,
        toggleStateAlertData,
        isToggleStatePending,
        handleToggleState,
    };
};

export default useStateToggleHook;