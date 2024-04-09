import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    countryRequest,
    CountryType,
    destroyCountry,
    ShowCountryHookType, toggleCountry,
    ToggleCountryRequestDataType
} from "./showCountryData";
import {DestroyCountryRequestDataType} from "../countriesData";

const useShowCountryHook = (): ShowCountryHookType => {
    let countryAlertData: ErrorAlertType = {show: false};
    let { state }:Location  = useLocation();

    const country: CountryType = state;

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const [countryQueryEnabled, setCountryQueryEnabled] = useState<boolean>(true);
    const [deleteCountryAlertData, setDeleteCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleCountryAlertData, setToggleCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [countryResponseData, setCountryResponseData] = useState<CountryType>(country);

    const countryResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries"],
        queryFn: () => countryRequest(country.id),
        enabled: countryQueryEnabled,
    });

    const destroyCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyCountryRequestDataType, any> = useMutation({
        mutationFn: destroyCountry,
        onError: (error: AxiosError): void => {
            setDeleteCountryAlertData(errorAlert(error));

            log("Destroy country failure", destroyCountryCountryResponse);
        },
        onSuccess: (): void => {
            setDeleteCountryAlertData({show: false});

            const toastMessage: string = `Boutique ${countryResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();
            navigate(`${mainRoutes.countries.path}`);

            log("Destroy country successful", destroyCountryCountryResponse);
        }
    });

    const toggleCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleCountryRequestDataType, any> = useMutation({
        mutationFn: toggleCountry,
        onError: (error: AxiosError): void => {
            setToggleCountryAlertData(errorAlert(error));

            log("Toggle country failure", toggleCountryCountryResponse);
        },
        onSuccess: (): void => {
            setToggleCountryAlertData({show: false});

            const toastMessage: string = `Boutique ${countryResponseData.name} ${countryResponseData.enabled ? "Désactivée" : "Activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onToggleModalClose();
            setCountryResponseData({...countryResponseData, enabled: !countryResponseData.enabled})

            log("Toggle country successful", toggleCountryCountryResponse);
        }
    });

    if(countryResponse.isError) {
        countryAlertData = errorAlert(countryResponse.error);

        log("Country show failure", countryResponse);
    }

    if(countryQueryEnabled && countryResponse.isSuccess && !countryResponse.isFetching) {
        setCountryQueryEnabled(false);
        setCountryResponseData(countryResponse.data.data);

        log("Countries list successful", countryResponse);
    }

    const isCountryPending: boolean = countryResponse.isFetching;
    const isDeleteCountryPending: boolean = destroyCountryCountryResponse.isPending;
    const isToggleCountryPending: boolean = toggleCountryCountryResponse.isPending;

    const handleDeleteCountry = (): void => {
        setDeleteCountryAlertData({show: false});

        destroyCountryCountryResponse.mutate({id: country.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteCountryAlertData({show: false});
    }

    const handleToggleCountry = (): void => {
        setToggleCountryAlertData({show: false});

        toggleCountryCountryResponse.mutate({id: country.id});
    }

    const showToggleModal = (): void => {
        console.log('toogle')
        onToggleModalOpen();
        setToggleCountryAlertData({show: false});
    }

    return {
        isCountryPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,
        handleDeleteCountry, countryAlertData, countryResponseData, handleToggleCountry, isToggleCountryPending, toggleCountryAlertData,
        isToggleModalOpen, onToggleModalClose, showToggleModal
    };
};

export default useShowCountryHook;