import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {brandRequest, BrandType, defaultSelectedBrand} from "../show/showBrandData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditBrandFormType,
    EditBrandHookType,
    editBrandInitialStaticValues,
    EditBrandRequestDataType,
    updateBrandRequest
} from "./editBrandData"

const useEditBrandHook = (): EditBrandHookType => {
    let brandAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const brand: BrandType = state;

    const [editBrandAlertData, setEditBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [brandQueryEnabled, setBrandQueryEnabled] = useState<boolean>(false);
    const [brandResponseData, setBrandResponseData] = useState<BrandType>(defaultSelectedBrand);
    const [formBrand, setFormBrand] = useState<EditBrandFormType>(editBrandInitialStaticValues);

    useEffect((): void => {
        if(brand) {
            setBrandResponseData(brand);
            setFormBrand(brand);
        } else {
            setBrandQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const brandResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["brand"],
        queryFn: () => brandRequest(id || ""),
        enabled: brandQueryEnabled,
    });

    const updateBrandResponse: UseMutationResult<AxiosResponse, AxiosError, EditBrandRequestDataType, any> = useMutation({
        mutationFn: updateBrandRequest,
        onError: (error: AxiosError): void => {
            setEditBrandAlertData(errorAlert(error));

            log("Update brand failure", updateBrandResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditBrandRequestDataType): void => {
            setEditBrandAlertData({show: false});

            const toastMessage: string = `Marque ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.brands.path}/${brandResponseData.id}`);

            log("Update brand successful", updateBrandResponse);
        }
    });

    if(brandResponse.isError) {
        brandAlertData = errorAlert(brandResponse.error);

        log("Brand show failure", brandResponse);
    }

    if(brandQueryEnabled && brandResponse.isSuccess && !brandResponse.isFetching) {
        setBrandResponseData(brandResponse.data.data);
        setFormBrand(brandResponse.data.data);
        setBrandQueryEnabled(false);

        log("Brands list successful", brandResponse);
    }

    const handleEditBrand = (values: EditBrandFormType): void => {
        const {name, slug, website, seoTitle, seoDescription, description}: EditBrandFormType = values;
        updateBrandResponse.mutate({name, slug, website, seoTitle, seoDescription, description, id: brandResponseData.id});
    }

    const isEditBrandPending: boolean = updateBrandResponse.isPending;
    const isBrandPending: boolean = brandResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.brands.path, label: 'Marques'}];
    if(brandResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.brands.path}/${brandResponseData.id}`,
            label: `Détail marque ${brandResponseData.name}`,
            state: brandResponseData
        })
    }

    return {
        editBrandAlertData,
        handleEditBrand,
        brandResponseData,
        isBrandPending,
        brandAlertData,
        formBrand,
        pageHeaderItems,
        isEditBrandPending
    };
};

export default useEditBrandHook;