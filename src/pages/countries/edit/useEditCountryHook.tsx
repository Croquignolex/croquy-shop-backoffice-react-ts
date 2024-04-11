import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {AddCountryFormType, AddCountryRequestDataType} from "../add/addCountryData";
import {
    EditCountryFormType,
    EditCountryHookType,
    EditCountryRequestDataType,
    updateCountryRequest
} from "./editCountryData"

const useEditCountryHook = (): EditCountryHookType => {
    let { state }:Location  = useLocation();

    const country: EditCountryFormType = state;
    const [editCountryAlertData, setEditCountryAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const updateCountryResponse: UseMutationResult<AxiosResponse, AxiosError, EditCountryRequestDataType, any> = useMutation({
        mutationFn: updateCountryRequest,
        onError: (error: AxiosError): void => {
            setEditCountryAlertData(errorAlert(error));

            log("Update country failure", updateCountryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddCountryRequestDataType): void => {
            setEditCountryAlertData({show: false});

            const toastMessage: string = `Pays ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.countries.path}/${country.id}`, {state: {...country, name: variables.name}});

            log("Update pays successful", updateCountryResponse);
        }
    });

    const handleEditCountry = ({name, phoneCode, description}: AddCountryFormType): void => updateCountryResponse.mutate({name, phoneCode, description, id: country.id});

    const isEditCountryPending: boolean = updateCountryResponse.isPending;

    return {editCountryAlertData, handleEditCountry, country, isEditCountryPending};
};

export default useEditCountryHook;