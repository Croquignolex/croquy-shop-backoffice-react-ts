import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {addShopRequest} from "../../helpers/apiRequestsHelpers";
import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../helpers/generalHelpers";
import {AddShopFormType, AddShopHookType, AddShopRequestDataType} from "./addShopData";

const useAddShopHook = (): AddShopHookType => {
    const [addShopAlertData, setAddShopAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const addShopResponse: UseMutationResult<AxiosResponse, AxiosError, AddShopFormType, any> = useMutation({
        mutationFn: addShopRequest,
        onError: (error: AxiosError): void => {
            setAddShopAlertData(errorAlert(error, "custom message"));

            log("Add shop failure", error);
        },
        onSuccess: (data: AxiosResponse, variables: AddShopRequestDataType): void => {
            setAddShopAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // navigate(mainRoutes.dashboard.path);

            log("Add shop successful", data);
        }
    });

    const handleAddShop = ({name, slug, description}: AddShopFormType): void => {
        setAddShopAlertData({show: false});

        addShopResponse.mutate({name, slug, description});
    }

    const isAddShopPending: boolean = addShopResponse.isPending;

    return {addShopAlertData, handleAddShop, isAddShopPending};
};

export default useAddShopHook;