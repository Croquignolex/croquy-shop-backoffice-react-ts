import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {errorAlert, log} from "../../../../helpers/generalHelpers";
import {v1URL} from "../../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../../helpers/axiosHelpers";
import {defaultPaginationData} from "../../../../constants/generalConstants";
import {
    CountryType,
    defaultSelectedCountry,
    destroyCountry,
    toggleCountry,
} from "../../show/showCountryData";
import {
    ErrorAlertType,
    IDRequestDataType,
    PaginationType,
    URLParamType
} from "../../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export const defaultCountriesResponseData: CountriesResponseDataType = {
    content: [],
    ...defaultPaginationData
}

export interface CountriesResponseDataType extends PaginationType {
    content: Array<CountryType>,
}

export interface CountriesTableListHookType {
    countriesResponseData: CountriesResponseDataType,
    isCountriesPending: boolean,
    countriesAlertData: ErrorAlertType,
    fetchPaginatedCountries: (a: boolean) => void,
    fetchPaginatedNeedleCountries: (a: string) => void,
    selectedCountry: CountryType,
    showDeleteModal: (a: CountryType) => void,
    isDeleteModalOpen: boolean,
    deleteCountryAlertData: ErrorAlertType,
    isDeleteCountryPending: boolean,
    handleDeleteCountry: () => void,
    onDeleteModalClose: () => void,
}

export interface CountriesTableListHookProps {
    fetchCountries: boolean,
    countriesBaseUrl: string,
}

export const countriesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [
        {param: "page", value: page.toString()},
        {param: "size", value: size.toString()},
        {param: "needle", value: needle.toString()}
    ];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
}

// ######################################## HOOK ######################################## //

const useCountriesTableListHook = ({fetchCountries, countriesBaseUrl}: CountriesTableListHookProps): CountriesTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [countriesQueryEnabled, setCountriesQueryEnabled] = useState<boolean>(fetchCountries);
    const [countriesAlertData, setCountriesAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteCountryAlertData, setDeleteCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleCountryAlertData, setToggleCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultSelectedCountry);
    const [countriesResponseData, setCountriesResponseData] = useState<CountriesResponseDataType>(defaultCountriesResponseData);

    // ######################################## LIST ######################################## //

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries"],
        queryFn: () => countriesRequest(countriesResponseData.number, countriesResponseData.size, searchNeedle, countriesBaseUrl),
        enabled: countriesQueryEnabled,
    });

    if(countriesQueryEnabled && countriesResponse.isFetched && countriesResponse.isError) {
        setCountriesQueryEnabled(false);
        setCountriesAlertData(errorAlert(countriesResponse.error));
    }

    if(countriesQueryEnabled && countriesResponse.isFetched && countriesResponse.isSuccess) {
        setCountriesQueryEnabled(false);
        setCountriesAlertData({show: false});
        setCountriesResponseData(countriesResponse.data.data);

        log("Countries list successful", countriesResponse);
    }

    const isCountriesPending: boolean = countriesResponse.isFetching;

    // ######################################## TOGGLE ######################################## //

    const toggleCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: toggleCountry,
        onError: (error: AxiosError): void => {
            setToggleCountryAlertData(errorAlert(error));
            setCountriesQueryEnabled(false);

            log("Toggle country failure", toggleCountryCountryResponse);
        },
        onSuccess: (): void => {
            setToggleCountryAlertData({show: false});
            setCountriesQueryEnabled(true);

            toast({
                title: t("toggle"),
                description: `${t("country_toggled", {name: selectedCountry.name})}`
            });

            onToggleModalClose();
        }
    });

    const handleToggleCountry = (): void => {
        setToggleCountryAlertData({show: false});
        toggleCountryCountryResponse.mutate({id: selectedCountry.id});
    }

    const showToggleModal = (country: CountryType): void => {
        onToggleModalOpen();
        setSelectedCountry(country);
        setToggleCountryAlertData({show: false});
    }

    const isToggleCountryPending: boolean = toggleCountryCountryResponse.isPending;

    // ######################################## DELETE ######################################## //

    const destroyCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: destroyCountry,
        onError: (error: AxiosError): void => {
            setDeleteCountryAlertData(errorAlert(error));
            setCountriesQueryEnabled(false);

            log("Destroy country failure", destroyCountryCountryResponse);
        },
        onSuccess: (): void => {
            setDeleteCountryAlertData({show: false});
            setCountriesQueryEnabled(true);

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


    // ######################################## XXXXXXXXXXXXXXX ######################################## //

    const fetchPaginatedCountries = (next: boolean): void => {
        if(next && !countriesResponseData.last) setCountriesResponseData({...countriesResponseData, number: countriesResponseData.number + 1});
        else if(!next && !countriesResponseData.first) setCountriesResponseData({...countriesResponseData, number: countriesResponseData.number - 1})

        setCountriesQueryEnabled(true);
    }

    const fetchPaginatedNeedleCountries = (needle: string): void => {
        setSearchNeedle(needle);
        setCountriesResponseData({...countriesResponseData, number: 0});

        setCountriesQueryEnabled(true);
    }

    return {
        countriesResponseData,
        isCountriesPending,
        countriesAlertData,
        fetchPaginatedCountries,
        fetchPaginatedNeedleCountries,
        onDeleteModalClose,
        selectedCountry,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCountryAlertData,
        isDeleteCountryPending,
        handleDeleteCountry,
    };
};

export default useCountriesTableListHook;