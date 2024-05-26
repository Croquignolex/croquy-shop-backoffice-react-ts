import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {DestroyAttributeRequestDataType} from "../../../components/tableList/attributes/attributesTableListData";
import {
    attributeRequest,
    AttributeType,
    defaultSelectedAttribute,
    destroyAttribute,
    ShowAttributeHookType,
    toggleAttribute,
    ToggleAttributeRequestDataType
} from "./showAttributeData";

const useShowAttributeHook = (): ShowAttributeHookType => {
    let attributeAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [attributeQueryEnabled, setAttributeQueryEnabled] = useState<boolean>(true);
    const [deleteAttributeAlertData, setDeleteAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleAttributeAlertData, setToggleAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [attributeResponseData, setAttributeResponseData] = useState<AttributeType>(defaultSelectedAttribute);

    const attributeResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attribute"],
        queryFn: () => attributeRequest(id || ""),
        enabled: attributeQueryEnabled,
    });

    const destroyAttributeAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyAttributeRequestDataType, any> = useMutation({
        mutationFn: destroyAttribute,
        onError: (error: AxiosError): void => {
            setDeleteAttributeAlertData(errorAlert(error));

            log("Destroy attribute failure", destroyAttributeAttributeResponse);
        },
        onSuccess: (): void => {
            setDeleteAttributeAlertData({show: false});

            const toastMessage: string = `Attribut ${attributeResponseData.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();
            navigate(`${mainRoutes.attributes.path}`);

            log("Destroy attribute successful", destroyAttributeAttributeResponse);
        }
    });

    const toggleAttributeAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleAttributeRequestDataType, any> = useMutation({
        mutationFn: toggleAttribute,
        onError: (error: AxiosError): void => {
            setToggleAttributeAlertData(errorAlert(error));

            log("Toggle attribute failure", toggleAttributeAttributeResponse);
        },
        onSuccess: (): void => {
            setToggleAttributeAlertData({show: false});

            const toastMessage: string = `Attribut ${attributeResponseData.name} ${attributeResponseData.enabled ? "désactivé" : "activé"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onToggleModalClose();
            setAttributeResponseData({...attributeResponseData, enabled: !attributeResponseData.enabled});

            log("Toggle attribute successful", toggleAttributeAttributeResponse);
        }
    });

    if(attributeResponse.isError) {
        attributeAlertData = errorAlert(attributeResponse.error);

        log("Attribute show failure", attributeResponse);
    }

    if(attributeQueryEnabled && attributeResponse.isSuccess && !attributeResponse.isFetching) {
        setAttributeQueryEnabled(false);
        setAttributeResponseData(attributeResponse.data.data);

        log("Attributes list successful", attributeResponse);
    }

    const isAttributePending: boolean = attributeResponse.isFetching;
    const isDeleteAttributePending: boolean = destroyAttributeAttributeResponse.isPending;
    const isToggleAttributePending: boolean = toggleAttributeAttributeResponse.isPending;

    const handleDeleteAttribute = (): void => {
        setDeleteAttributeAlertData({show: false});

        destroyAttributeAttributeResponse.mutate({id: attributeResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteAttributeAlertData({show: false});
    }

    const handleToggleAttribute = (): void => {
        setToggleAttributeAlertData({show: false});

        toggleAttributeAttributeResponse.mutate({id: attributeResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleAttributeAlertData({show: false});
    }

    return {
        isAttributePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeAlertData,
        isDeleteAttributePending,
        handleDeleteAttribute,
        attributeAlertData,
        attributeResponseData,
        handleToggleAttribute,
        isToggleAttributePending,
        toggleAttributeAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    };
};

export default useShowAttributeHook;