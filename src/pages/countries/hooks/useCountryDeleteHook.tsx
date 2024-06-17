import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {errorAlert} from "../../../helpers/generalHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {deleteRequest} from "../../../helpers/axiosHelpers";
import {CountryType, defaultSelectedCountry,} from "../show/showCountryData";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {
    ErrorAlertType,
    IDRequestDataType,
    URLParamType
} from "../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export interface CountryDeleteHookType {
    selectedCountry: CountryType,
    showDeleteModal: (a: CountryType) => void,
    isDeleteModalOpen: boolean,
    deleteCountryAlertData: ErrorAlertType,
    isDeleteCountryPending: boolean,
    handleDeleteCountry: () => void,
    onDeleteModalClose: () => void,
}

export interface CountryDeleteHookProps {
    deleted: () => void,
}

export const destroyCountryRequest = ({id}: IDRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.destroy, params);

    return deleteRequest(url);
};

// ######################################## HOOK ######################################## //

const useCountryDeleteHook = ({deleted}: CountryDeleteHookProps): CountryDeleteHookType => {
    const {onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose} = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [deleteCountryAlertData, setDeleteCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultSelectedCountry);

    const destroyCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: destroyCountryRequest,
        onError: (error: AxiosError): void => {
            setDeleteCountryAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setDeleteCountryAlertData({show: false});
            deleted();

            toast({
                title: t("delete"),
                description: `${t("country_deleted", {name: selectedCountry.name})}`
            });

            onDeleteModalClose();
        }
    });

    const handleDeleteCountry = (): void => {
        setDeleteCountryAlertData({show: false});
        destroyCountryCountryResponse.mutate({id: selectedCountry.id});
    }

    const showDeleteModal = (country: CountryType): void => {
        onDeleteModalOpen();
        setSelectedCountry(country);
        setDeleteCountryAlertData({show: false});
    }

    const isDeleteCountryPending: boolean = destroyCountryCountryResponse.isPending;

    return {
        onDeleteModalClose,
        selectedCountry,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCountryAlertData,
        isDeleteCountryPending,
        handleDeleteCountry,
    };
};

export default useCountryDeleteHook;