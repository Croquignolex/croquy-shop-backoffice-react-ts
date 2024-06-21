import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {StateType, defaultSelectedState, destroyState} from "../../../pages/states/show/showStateData";
import {
    defaultStatesResponseData,
    DestroyStateRequestDataType,
    statesRequest,
    StatesTableListHookType,
    StatesResponseDataType,
    StatesTableListHookProps
} from "./statesTableListData";

const useStatesTableListHook = ({fetchStates, statesBaseUrl}: StatesTableListHookProps): StatesTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [statesQueryEnabled, setStatesQueryEnabled] = useState<boolean>(fetchStates);
    const [statesAlertData, setStatesAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteStateAlertData, setDeleteStateAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedState, setSelectedState] = useState<StateType>(defaultSelectedState);
    const [statesResponseData, setStatesResponseData] = useState<StatesResponseDataType>(defaultStatesResponseData);

    const statesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["states"],
        queryFn: () => statesRequest(statesResponseData.number, statesResponseData.size, searchNeedle, statesBaseUrl),
        enabled: statesQueryEnabled,
    });

    const destroyStateStateResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyStateRequestDataType, any> = useMutation({
        mutationFn: destroyState,
        onError: (error: AxiosError): void => {
            setDeleteStateAlertData(errorAlert(error));
            setStatesQueryEnabled(false);

            log("Destroy state failure", destroyStateStateResponse);
        },
        onSuccess: (): void => {
            setDeleteStateAlertData({show: false});
            setStatesQueryEnabled(true);

            const toastMessage: string = `Ville ${selectedState.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy state successful", destroyStateStateResponse);
        }
    });

    if(statesQueryEnabled && statesResponse.isError) {
        setStatesQueryEnabled(false);
        setStatesAlertData(errorAlert(statesResponse.error));

        log("States list failure", statesResponse);
    }

    if(statesQueryEnabled && statesResponse.isSuccess && !statesResponse.isFetching) {
        setStatesQueryEnabled(false);
        setStatesAlertData({show: false});

        setStatesResponseData(statesResponse.data.data);

        log("States list successful", statesResponse);
    }

    const isStatesPending: boolean = statesResponse.isFetching;
    const isDeleteStatePending: boolean = destroyStateStateResponse.isPending;

    const handleDeleteState = (): void => {
        setDeleteStateAlertData({show: false});

        destroyStateStateResponse.mutate({id: selectedState.id});
    }

    const showDeleteModal = (shop: StateType): void => {
        onDeleteModalOpen();
        setSelectedState(shop);
        setDeleteStateAlertData({show: false});
    }

    const fetchPaginatedStates = (next: boolean): void => {
        if(next && !statesResponseData.last) setStatesResponseData({...statesResponseData, number: statesResponseData.number + 1});
        else if(!next && !statesResponseData.first) setStatesResponseData({...statesResponseData, number: statesResponseData.number - 1})

        setStatesQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleStates = (needle: string): void => {
        setSearchNeedle(needle);
        setStatesResponseData({...statesResponseData, number: 0});

        setStatesQueryEnabled(true);
    }

    return {
        statesResponseData,
        isStatesPending,
        statesAlertData,
        fetchPaginatedStates,
        fetchPaginatedNeedleStates,
        onDeleteModalClose,
        selectedState,
        showDeleteModal,
        isDeleteModalOpen,
        deleteStateAlertData,
        isDeleteStatePending,
        handleDeleteState,
    };
};

export default useStatesTableListHook;