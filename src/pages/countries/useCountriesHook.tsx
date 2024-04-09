import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {CountryType, defaultSelectedCountry, destroyCountry} from "./show/showCountryData";
import {
    defaultCountriesResponseData, DestroyCountryRequestDataType,
    CountriesHookType, CountriesResponseDataType, countriesRequest
} from "./countriesData";

const useCountriesHook = (): CountriesHookType => {
    let countriesAlertData: ErrorAlertType = {show: false};

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [countriesQueryEnabled, setCountriesQueryEnabled] = useState<boolean>(true);
    const [deleteCountryAlertData, setDeleteCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultSelectedCountry);
    const [countriesResponseData, setCountriesResponseData] = useState<CountriesResponseDataType>(defaultCountriesResponseData);

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries"],
        queryFn: () => countriesRequest(countriesResponseData.number, countriesResponseData.size, searchNeedle),
        enabled: countriesQueryEnabled,
    });

    const destroyCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyCountryRequestDataType, any> = useMutation({
        mutationFn: destroyCountry,
        onError: (error: AxiosError): void => {
            setDeleteCountryAlertData(errorAlert(error));
            setCountriesQueryEnabled(false);

            log("Destroy country failure", destroyCountryCountryResponse);
        },
        onSuccess: (): void => {
            setDeleteCountryAlertData({show: false});
            setCountriesQueryEnabled(true);

            const toastMessage: string = `Pays ${selectedCountry.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();

            log("Destroy country successful", destroyCountryCountryResponse);
        }
    });

    if(countriesResponse.isError) {
        countriesAlertData = errorAlert(countriesResponse.error);

        log("Countries list failure", countriesResponse);
    }

    if(countriesQueryEnabled && countriesResponse.isSuccess && !countriesResponse.isFetching) {
        setCountriesQueryEnabled(false);
        setCountriesResponseData(countriesResponse.data.data);

        log("Countries list successful", countriesResponse);
    }

    const isCountriesPending: boolean = countriesResponse.isFetching;
    const isDeleteCountryPending: boolean = destroyCountryCountryResponse.isPending;

    const handleDeleteCountry = (): void => {
        setDeleteCountryAlertData({show: false});

        destroyCountryCountryResponse.mutate({id: selectedCountry.id});
    }

    const showDeleteModal = (shop: CountryType): void => {
        onDeleteModalOpen();
        setSelectedCountry(shop);
        setDeleteCountryAlertData({show: false});
    }

    const fetchPaginatedCountries = (next: boolean): void => {
        if(next && !countriesResponseData.last) setCountriesResponseData({...countriesResponseData, number: countriesResponseData.number + 1});
        else if(!next && !countriesResponseData.first) setCountriesResponseData({...countriesResponseData, number: countriesResponseData.number - 1})

        setCountriesQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleCountries = (needle: string): void => {
        setSearchNeedle(needle);
        setCountriesResponseData({...countriesResponseData, number: 0});

        setCountriesQueryEnabled(true);
    }

    return {
        countriesResponseData, isCountriesPending, countriesAlertData, fetchPaginatedCountries, fetchPaginatedNeedleCountries, onDeleteModalClose,
        selectedCountry, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,  handleDeleteCountry,
    };
};

export default useCountriesHook;