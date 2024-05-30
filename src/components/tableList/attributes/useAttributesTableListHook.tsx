import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AttributeType, defaultSelectedAttribute, destroyAttribute} from "../../../pages/attributes/show/showAttributeData";
import {
    AttributesResponseDataType,
    AttributesTableListHookProps,
    AttributesTableListHookType,
    defaultAttributesResponseData,
    DestroyAttributeRequestDataType,
    attributesRequest,
} from "./attributesTableListData";

const useAttributesTableListHook = ({fetchAttributes, attributesBaseUrl}: AttributesTableListHookProps): AttributesTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [attributesQueryEnabled, setAttributesQueryEnabled] = useState<boolean>(fetchAttributes);
    const [attributesAlertData, setAttributesAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteAttributeAlertData, setDeleteAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedAttribute, setSelectedAttribute] = useState<AttributeType>(defaultSelectedAttribute);
    const [attributesResponseData, setAttributesResponseData] = useState<AttributesResponseDataType>(defaultAttributesResponseData);

    const attributesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attributes"],
        queryFn: () => attributesRequest(attributesResponseData.number, attributesResponseData.size, searchNeedle, attributesBaseUrl),
        enabled: attributesQueryEnabled,
    });

    const destroyAttributeAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyAttributeRequestDataType, any> = useMutation({
        mutationFn: destroyAttribute,
        onError: (error: AxiosError): void => {
            setDeleteAttributeAlertData(errorAlert(error));
            setAttributesQueryEnabled(false);

            log("Destroy attribute failure", destroyAttributeAttributeResponse);
        },
        onSuccess: (): void => {
            setDeleteAttributeAlertData({show: false});
            setAttributesQueryEnabled(true);

            const toastMessage: string = `Attribut ${selectedAttribute.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy attribute successful", destroyAttributeAttributeResponse);
        }
    });

    if(attributesQueryEnabled && attributesResponse.isError) {
        setAttributesQueryEnabled(false);
        setAttributesAlertData(errorAlert(attributesResponse.error));

        log("Attributes list failure", attributesResponse);
    }

    if(attributesQueryEnabled && attributesResponse.isSuccess && !attributesResponse.isFetching) {
        setAttributesQueryEnabled(false);
        setAttributesAlertData({show: false});

        setAttributesResponseData(attributesResponse.data.data);

        log("Attributes list successful", attributesResponse);
    }

    const isAttributesPending: boolean = attributesResponse.isFetching;
    const isDeleteAttributePending: boolean = destroyAttributeAttributeResponse.isPending;

    const handleDeleteAttribute = (): void => {
        setDeleteAttributeAlertData({show: false});

        destroyAttributeAttributeResponse.mutate({id: selectedAttribute.id});
    }

    const showDeleteModal = (attribute: AttributeType): void => {
        onDeleteModalOpen();
        setSelectedAttribute(attribute);
        setDeleteAttributeAlertData({show: false});
    }

    const fetchPaginatedAttributes = (next: boolean): void => {
        if(next && !attributesResponseData.last) setAttributesResponseData({...attributesResponseData, number: attributesResponseData.number + 1});
        else if(!next && !attributesResponseData.first) setAttributesResponseData({...attributesResponseData, number: attributesResponseData.number - 1})

        setAttributesQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleAttributes = (needle: string): void => {
        setSearchNeedle(needle);
        setAttributesResponseData({...attributesResponseData, number: 0});

        setAttributesQueryEnabled(true);
    }

    return {
        attributesResponseData,
        isAttributesPending,
        attributesAlertData,
        fetchPaginatedAttributes,
        fetchPaginatedNeedleAttributes,
        onDeleteModalClose,
        selectedAttribute,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeAlertData,
        isDeleteAttributePending,
        handleDeleteAttribute,
    };
};

export default useAttributesTableListHook;