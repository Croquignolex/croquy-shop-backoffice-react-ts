import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AttributeValueType, defaultSelectedAttributeValue, destroyAttributeValue} from "../../../pages/attributeValues/show/showAttributeValueData";
import {
    AttributeValuesResponseDataType,
    AttributeValuesTableListHookProps,
    AttributeValuesTableListHookType,
    defaultAttributeValuesResponseData,
    DestroyAttributeValueRequestDataType,
    attributeValuesRequest,
} from "./attributeValuesTableListData";

const useAttributeValuesTableListHook = ({fetchAttributeValues, attributeValuesBaseUrl}: AttributeValuesTableListHookProps): AttributeValuesTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [attributeValuesQueryEnabled, setAttributeValuesQueryEnabled] = useState<boolean>(fetchAttributeValues);
    const [attributeValuesAlertData, setAttributeValuesAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteAttributeValueAlertData, setDeleteAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedAttributeValue, setSelectedAttributeValue] = useState<AttributeValueType>(defaultSelectedAttributeValue);
    const [attributeValuesResponseData, setAttributeValuesResponseData] = useState<AttributeValuesResponseDataType>(defaultAttributeValuesResponseData);

    const attributeValuesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attributeValues"],
        queryFn: () => attributeValuesRequest(attributeValuesResponseData.number, attributeValuesResponseData.size, searchNeedle, attributeValuesBaseUrl),
        enabled: attributeValuesQueryEnabled,
    });

    const destroyAttributeValueAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyAttributeValueRequestDataType, any> = useMutation({
        mutationFn: destroyAttributeValue,
        onError: (error: AxiosError): void => {
            setDeleteAttributeValueAlertData(errorAlert(error));
            setAttributeValuesQueryEnabled(false);

            log("Destroy attributeValue failure", destroyAttributeValueAttributeValueResponse);
        },
        onSuccess: (): void => {
            setDeleteAttributeValueAlertData({show: false});
            setAttributeValuesQueryEnabled(true);

            const toastMessage: string = `Valeur d'attribut ${selectedAttributeValue.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();

            log("Destroy attributeValue successful", destroyAttributeValueAttributeValueResponse);
        }
    });

    if(attributeValuesQueryEnabled && attributeValuesResponse.isError) {
        setAttributeValuesQueryEnabled(false);
        setAttributeValuesAlertData(errorAlert(attributeValuesResponse.error));

        log("AttributeValues list failure", attributeValuesResponse);
    }

    if(attributeValuesQueryEnabled && attributeValuesResponse.isSuccess && !attributeValuesResponse.isFetching) {
        setAttributeValuesQueryEnabled(false);
        setAttributeValuesAlertData({show: false});

        setAttributeValuesResponseData(attributeValuesResponse.data.data);

        log("AttributeValues list successful", attributeValuesResponse);
    }

    const isAttributeValuesPending: boolean = attributeValuesResponse.isFetching;
    const isDeleteAttributeValuePending: boolean = destroyAttributeValueAttributeValueResponse.isPending;

    const handleDeleteAttributeValue = (): void => {
        setDeleteAttributeValueAlertData({show: false});

        destroyAttributeValueAttributeValueResponse.mutate({id: selectedAttributeValue.id});
    }

    const showDeleteModal = (attributeValue: AttributeValueType): void => {
        onDeleteModalOpen();
        setSelectedAttributeValue(attributeValue);
        setDeleteAttributeValueAlertData({show: false});
    }

    const fetchPaginatedAttributeValues = (next: boolean): void => {
        if(next && !attributeValuesResponseData.last) setAttributeValuesResponseData({...attributeValuesResponseData, number: attributeValuesResponseData.number + 1});
        else if(!next && !attributeValuesResponseData.first) setAttributeValuesResponseData({...attributeValuesResponseData, number: attributeValuesResponseData.number - 1})

        setAttributeValuesQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleAttributeValues = (needle: string): void => {
        setSearchNeedle(needle);
        setAttributeValuesResponseData({...attributeValuesResponseData, number: 0});

        setAttributeValuesQueryEnabled(true);
    }

    return {
        attributeValuesResponseData,
        isAttributeValuesPending,
        attributeValuesAlertData,
        fetchPaginatedAttributeValues,
        fetchPaginatedNeedleAttributeValues,
        onDeleteModalClose,
        selectedAttributeValue,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeValueAlertData,
        isDeleteAttributeValuePending,
        handleDeleteAttributeValue,
    };
};

export default useAttributeValuesTableListHook;