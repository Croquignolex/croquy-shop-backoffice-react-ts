import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AddShopFormType, AddShopRequestDataType} from "../add/addShopData";
import {mainRoutes} from "../../../routes/mainRoutes";
import {EditShopFormType, EditShopHookType, EditShopRequestDataType} from "./editShopData";
import {updateShopRequest} from "../../shops/edit/editShopData";

const useEditShopHook = (): EditShopHookType => {
    let { state }:Location  = useLocation();

    const shop: EditShopFormType = state;
    const [editShopAlertData, setEditShopAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const updateShopResponse: UseMutationResult<AxiosResponse, AxiosError, EditShopRequestDataType, any> = useMutation({
        mutationFn: updateShopRequest,
        onError: (error: AxiosError): void => {
            setEditShopAlertData(errorAlert(error));

            log("Update shop failure", updateShopResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddShopRequestDataType): void => {
            setEditShopAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.shops.path}/${shop.id}`, {state: {...shop, name: variables.name}});

            log("Update shop successful", updateShopResponse);
        }
    });

    const handleEditShop = ({name, slug, description}: AddShopFormType): void => updateShopResponse.mutate({name, slug, description, id: shop.id});

    const isEditShopPending: boolean = updateShopResponse.isPending;

    return {editShopAlertData, handleEditShop, shop, isEditShopPending};
};

export default useEditShopHook;