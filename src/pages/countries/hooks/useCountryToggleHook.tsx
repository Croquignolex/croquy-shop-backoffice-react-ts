import { useState } from "react";
import {useTranslation} from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {errorAlert} from "../../../helpers/generalHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {patchRequest} from "../../../helpers/axiosHelpers";
import {CountryType, defaultSelectedCountry,} from "../show/showCountryData";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {
    ErrorAlertType,
    IDRequestDataType,
    URLParamType
} from "../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export interface CountryToggleHookType {
    selectedCountry: CountryType,
    showToggleModal: (a: CountryType) => void,
    isToggleModalOpen: boolean,
    toggleCountryAlertData: ErrorAlertType,
    isToggleCountryPending: boolean,
    handleToggleCountry: () => void,
    onToggleModalClose: () => void,
}

export interface CountryToggleHookProps {
    toggled: () => void,
}

export const toggleCountry = ({id}: IDRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.toggle, params);

    return patchRequest(url);
};

// ######################################## HOOK ######################################## //

const useCountryToggleHook = ({toggled}: CountryToggleHookProps): CountryToggleHookType => {
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const [toggleCountryAlertData, setToggleCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultSelectedCountry);

    const toggleCountryCountryResponse: UseMutationResult<AxiosResponse, AxiosError, IDRequestDataType, any> = useMutation({
        mutationFn: toggleCountry,
        onError: (error: AxiosError): void => {
            setToggleCountryAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setToggleCountryAlertData({show: false});
            toggled();

            toast({
                title: t(`toggle_${selectedCountry.enabled}`),
                description: `${t(`country_toggled_${selectedCountry.enabled}`, {name: selectedCountry.name})}`
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

    return {
        onToggleModalClose,
        selectedCountry,
        showToggleModal,
        isToggleModalOpen,
        toggleCountryAlertData,
        isToggleCountryPending,
        handleToggleCountry,
    };
};

export default useCountryToggleHook;