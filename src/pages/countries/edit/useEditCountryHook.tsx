import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {countryRequest, CountryType, defaultSelectedCountry} from "../show/showCountryData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditCountryFormType,
    EditCountryHookType,
    editCountryInitialStaticValues,
    EditCountryRequestDataType,
    updateCountryRequest
} from "./editCountryData"

const useEditCountryHook = (): EditCountryHookType => {
    let countryAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const country: CountryType = state;

    const [editCountryAlertData, setEditCountryAlertData] = useState<ErrorAlertType>({show: false});
    const [countryQueryEnabled, setCountryQueryEnabled] = useState<boolean>(false);
    const [countryResponseData, setCountryResponseData] = useState<CountryType>(defaultSelectedCountry);
    const [formCountry, setFormCountry] = useState<EditCountryFormType>(editCountryInitialStaticValues);

    useEffect((): void => {
        if(country) {
            setCountryResponseData(country);
            setFormCountry(country);
        } else {
            setCountryQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const countryResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["country"],
        queryFn: () => countryRequest(id || ""),
        enabled: countryQueryEnabled,
    });

    const updateCountryResponse: UseMutationResult<AxiosResponse, AxiosError, EditCountryRequestDataType, any> = useMutation({
        mutationFn: updateCountryRequest,
        onError: (error: AxiosError): void => {
            setEditCountryAlertData(errorAlert(error));

            log("Update country failure", updateCountryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditCountryRequestDataType): void => {
            setEditCountryAlertData({show: false});

            const toastMessage: string = `Pays ${variables.name} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.countries.path}/${countryResponseData.id}`);

            log("Update country successful", updateCountryResponse);
        }
    });

    if(countryResponse.isError) {
        countryAlertData = errorAlert(countryResponse.error);

        log("Country show failure", countryResponse);
    }

    if(countryQueryEnabled && countryResponse.isSuccess && !countryResponse.isFetching) {
        setCountryResponseData(countryResponse.data.data);
        setFormCountry(countryResponse.data.data);
        setCountryQueryEnabled(false);

        log("Countries list successful", countryResponse);
    }

    const handleEditCountry = ({name, phoneCode, description}: EditCountryFormType): void =>
        updateCountryResponse.mutate({name, phoneCode, description, id: countryResponseData.id});

    const isEditCountryPending: boolean = updateCountryResponse.isPending;
    const isCountryPending: boolean = countryResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.countries.path, label: 'Pays'}];
    if(countryResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.countries.path}/${countryResponseData.id}`,
            label: `Détail pays ${countryResponseData.name}`,
            state: countryResponseData
        })
    }

    return {
        editCountryAlertData,
        handleEditCountry,
        countryResponseData,
        isCountryPending,
        countryAlertData,
        formCountry,
        pageHeaderItems,
        isEditCountryPending
    };
};

export default useEditCountryHook;