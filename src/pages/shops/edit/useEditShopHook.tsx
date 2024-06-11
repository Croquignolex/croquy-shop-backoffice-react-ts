import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {shopRequest, ShopType, defaultSelectedShop} from "../show/showShopData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";
import {
    EditShopFormType,
    EditShopHookType,
    editShopInitialStaticValues,
    EditShopRequestDataType,
    updateShopRequest
} from "./editShopData"

const useEditShopHook = (): EditShopHookType => {
    let shopAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const shop: ShopType = state;

    const [editShopAlertData, setEditShopAlertData] = useState<ErrorAlertType>({show: false});
    const [shopQueryEnabled, setShopQueryEnabled] = useState<boolean>(false);
    const [shopResponseData, setShopResponseData] = useState<ShopType>(defaultSelectedShop);
    const [formShop, setFormShop] = useState<EditShopFormType>(editShopInitialStaticValues);

    useEffect((): void => {
        if(shop) {
            setShopResponseData(shop);
            setFormShop(shop);
        } else {
            setShopQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const shopResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["shop"],
        queryFn: () => shopRequest(id || ""),
        enabled: shopQueryEnabled,
    });

    const updateShopResponse: UseMutationResult<AxiosResponse, AxiosError, EditShopRequestDataType, any> = useMutation({
        mutationFn: updateShopRequest,
        onError: (error: AxiosError): void => {
            setEditShopAlertData(errorAlert(error));

            log("Update shop failure", updateShopResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditShopRequestDataType): void => {
            setEditShopAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.shops.path}/${shopResponseData.id}`);

            log("Update shop successful", updateShopResponse);
        }
    });

    if(shopResponse.isError) {
        shopAlertData = errorAlert(shopResponse.error);

        log("Shop show failure", shopResponse);
    }

    if(shopQueryEnabled && shopResponse.isSuccess && !shopResponse.isFetching) {
        setShopResponseData(shopResponse.data.data);
        setFormShop(shopResponse.data.data);
        setShopQueryEnabled(false);

        log("Shops list successful", shopResponse);
    }

    const handleEditShop = ({name, slug, description}: EditShopFormType): void =>
        updateShopResponse.mutate({name, slug, description, id: shopResponseData.id});

    const isEditShopPending: boolean = updateShopResponse.isPending;
    const isShopPending: boolean = shopResponse.isFetching;

    const pageHeaderItems: Array<any> = [{path: mainRoutes.shops.path, label: 'Boutiques'}];
    if(shopResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.shops.path}/${shopResponseData.id}`,
            label: `Détail boutique ${shopResponseData.name}`,
            state: shopResponseData
        })
    }

    return {
        editShopAlertData,
        handleEditShop,
        shopResponseData,
        isShopPending,
        shopAlertData,
        formShop,
        pageHeaderItems,
        isEditShopPending
    };
};

export default useEditShopHook;