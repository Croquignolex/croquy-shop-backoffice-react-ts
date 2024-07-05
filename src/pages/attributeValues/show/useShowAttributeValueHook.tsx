import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
// import {DestroyAttributeValueRequestDataType} from "../../../components/tableList/attributeValues/attributeValuesTableListData";
import {
    attributeValueRequest,
    AttributeValueType,
    defaultSelectedAttributeValue,
    destroyAttributeValue,
    ShowAttributeValueHookType,
    toggleAttributeValue,
    ToggleAttributeValueRequestDataType
} from "./showAttributeValueData";

const useShowAttributeValueHook = (): ShowAttributeValueHookType => {
    let attributeValueAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [attributeValueQueryEnabled, setAttributeValueQueryEnabled] = useState<boolean>(true);
    const [deleteAttributeValueAlertData, setDeleteAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleAttributeValueAlertData, setToggleAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [attributeValueResponseData, setAttributeValueResponseData] = useState<AttributeValueType>(defaultSelectedAttributeValue);

    const attributeValueResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attributeValue"],
        queryFn: () => attributeValueRequest(id || ""),
        enabled: attributeValueQueryEnabled,
    });

    const destroyAttributeValueAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: destroyAttributeValue,
        onError: (error: AxiosError): void => {
            setDeleteAttributeValueAlertData(errorAlert(error));

            log("Destroy attributeValue failure", destroyAttributeValueAttributeValueResponse);
        },
        onSuccess: (): void => {
            setDeleteAttributeValueAlertData({show: false});

            const toastMessage: string = `Valeur d'attribut ${attributeValueResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.attributeValues.path}`);

            log("Destroy attributeValue successful", destroyAttributeValueAttributeValueResponse);
        }
    });

    const toggleAttributeValueAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleAttributeValueRequestDataType, any> = useMutation({
        mutationFn: toggleAttributeValue,
        onError: (error: AxiosError): void => {
            setToggleAttributeValueAlertData(errorAlert(error));

            log("Toggle attributeValue failure", toggleAttributeValueAttributeValueResponse);
        },
        onSuccess: (): void => {
            setToggleAttributeValueAlertData({show: false});

            const toastMessage: string = `Valeur d'attribut ${attributeValueResponseData.name} ${attributeValueResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setAttributeValueResponseData({...attributeValueResponseData, enabled: !attributeValueResponseData.enabled});

            log("Toggle attributeValue successful", toggleAttributeValueAttributeValueResponse);
        }
    });

    if(attributeValueResponse.isError) {
        attributeValueAlertData = errorAlert(attributeValueResponse.error);

        log("AttributeValue show failure", attributeValueResponse);
    }

    if(attributeValueQueryEnabled && attributeValueResponse.isSuccess && !attributeValueResponse.isFetching) {
        setAttributeValueQueryEnabled(false);
        setAttributeValueResponseData(attributeValueResponse.data.data);

        log("AttributeValues list successful", attributeValueResponse);
    }

    const isAttributeValuePending: boolean = attributeValueResponse.isFetching;
    const isDeleteAttributeValuePending: boolean = destroyAttributeValueAttributeValueResponse.isPending;
    const isToggleAttributeValuePending: boolean = toggleAttributeValueAttributeValueResponse.isPending;

    const handleDeleteAttributeValue = (): void => {
        setDeleteAttributeValueAlertData({show: false});

        destroyAttributeValueAttributeValueResponse.mutate({id: attributeValueResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteAttributeValueAlertData({show: false});
    }

    const handleToggleAttributeValue = (): void => {
        setToggleAttributeValueAlertData({show: false});

        toggleAttributeValueAttributeValueResponse.mutate({id: attributeValueResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleAttributeValueAlertData({show: false});
    }

    return {
        isAttributeValuePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeValueAlertData,
        isDeleteAttributeValuePending,
        handleDeleteAttributeValue,
        attributeValueAlertData,
        attributeValueResponseData,
        handleToggleAttributeValue,
        isToggleAttributeValuePending,
        toggleAttributeValueAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    };
};

export default useShowAttributeValueHook;