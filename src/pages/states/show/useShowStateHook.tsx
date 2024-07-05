import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
// import {DestroyStateRequestDataType} from "../../../components/tableList/states/statesTableListData";
import {
    stateRequest,
    StateType,
    defaultSelectedState,
    destroyState,
    ShowStateHookType,
    toggleState,
    ToggleStateRequestDataType
} from "./showStateData";

const useShowStateHook = (): ShowStateHookType => {
    let stateAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [stateQueryEnabled, setStateQueryEnabled] = useState<boolean>(true);
    const [deleteStateAlertData, setDeleteStateAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleStateAlertData, setToggleStateAlertData] = useState<ErrorAlertType>({show: false});
    const [stateResponseData, setStateResponseData] = useState<StateType>(defaultSelectedState);

    const stateResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["state"],
        queryFn: () => stateRequest(id || ""),
        enabled: stateQueryEnabled,
    });

    const destroyStateStateResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: destroyState,
        onError: (error: AxiosError): void => {
            setDeleteStateAlertData(errorAlert(error));

            log("Destroy state failure", destroyStateStateResponse);
        },
        onSuccess: (): void => {
            setDeleteStateAlertData({show: false});

            const toastMessage: string = `Ville ${stateResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.states.path}`);

            log("Destroy state successful", destroyStateStateResponse);
        }
    });

    const toggleStateStateResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleStateRequestDataType, any> = useMutation({
        mutationFn: toggleState,
        onError: (error: AxiosError): void => {
            setToggleStateAlertData(errorAlert(error));

            log("Toggle state failure", toggleStateStateResponse);
        },
        onSuccess: (): void => {
            setToggleStateAlertData({show: false});

            const toastMessage: string = `Ville ${stateResponseData.name} ${stateResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setStateResponseData({...stateResponseData, enabled: !stateResponseData.enabled});

            log("Toggle state successful", toggleStateStateResponse);
        }
    });

    if(stateResponse.isError) {
        stateAlertData = errorAlert(stateResponse.error);

        log("State show failure", stateResponse);
    }

    if(stateQueryEnabled && stateResponse.isSuccess && !stateResponse.isFetching) {
        setStateQueryEnabled(false);
        setStateResponseData(stateResponse.data.data);

        log("States list successful", stateResponse);
    }

    const isStatePending: boolean = stateResponse.isFetching;
    const isDeleteStatePending: boolean = destroyStateStateResponse.isPending;
    const isToggleStatePending: boolean = toggleStateStateResponse.isPending;

    const handleDeleteState = (): void => {
        setDeleteStateAlertData({show: false});

        destroyStateStateResponse.mutate({id: stateResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteStateAlertData({show: false});
    }

    const handleToggleState = (): void => {
        setToggleStateAlertData({show: false});

        toggleStateStateResponse.mutate({id: stateResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleStateAlertData({show: false});
    }

    return {
        isStatePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteStateAlertData,
        isDeleteStatePending,
        handleDeleteState,
        stateAlertData,
        stateResponseData,
        handleToggleState,
        isToggleStatePending,
        toggleStateAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    };
};

export default useShowStateHook;