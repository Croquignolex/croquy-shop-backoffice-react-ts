import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {vendorRequest, VendorType, defaultSelectedVendor} from "../show/showVendorData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditVendorFormType,
    EditVendorHookType,
    editVendorInitialStaticValues,
    EditVendorRequestDataType,
    updateVendorRequest
} from "./editVendorData"

const useEditVendorHook = (): EditVendorHookType => {
    let vendorAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const vendor: VendorType = state;

    const [editVendorAlertData, setEditVendorAlertData] = useState<ErrorAlertType>({show: false});
    const [vendorQueryEnabled, setVendorQueryEnabled] = useState<boolean>(false);
    const [vendorResponseData, setVendorResponseData] = useState<VendorType>(defaultSelectedVendor);
    const [formVendor, setFormVendor] = useState<EditVendorFormType>(editVendorInitialStaticValues);

    useEffect((): void => {
        if(vendor) {
            setVendorResponseData(vendor);
            setFormVendor(vendor);
        } else {
            setVendorQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const vendorResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["vendor"],
        queryFn: () => vendorRequest(id || ""),
        enabled: vendorQueryEnabled,
    });

    const updateVendorResponse: UseMutationResult<AxiosResponse, AxiosError, EditVendorRequestDataType, any> = useMutation({
        mutationFn: updateVendorRequest,
        onError: (error: AxiosError): void => {
            setEditVendorAlertData(errorAlert(error));

            log("Update vendor failure", updateVendorResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditVendorRequestDataType): void => {
            setEditVendorAlertData({show: false});

            const toastMessage: string = `Fournisseur ${variables.name} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.vendors.path}/${vendorResponseData.id}`);

            log("Update vendor successful", updateVendorResponse);
        }
    });

    if(vendorResponse.isError) {
        vendorAlertData = errorAlert(vendorResponse.error);

        log("Vendor show failure", vendorResponse);
    }

    if(vendorQueryEnabled && vendorResponse.isSuccess && !vendorResponse.isFetching) {
        setVendorResponseData(vendorResponse.data.data);
        setFormVendor(vendorResponse.data.data);
        setVendorQueryEnabled(false);

        log("Vendors list successful", vendorResponse);
    }

    const handleEditVendor = ({name, description}: EditVendorFormType): void =>
        updateVendorResponse.mutate({name, description, id: vendorResponseData.id});

    const isEditVendorPending: boolean = updateVendorResponse.isPending;
    const isVendorPending: boolean = vendorResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.vendors.path, label: 'Fournisseurs'}];
    if(vendorResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.vendors.path}/${vendorResponseData.id}`,
            label: `Détail fournisseur ${vendorResponseData.name}`,
            state: vendorResponseData
        })
    }

    return {
        editVendorAlertData,
        handleEditVendor,
        vendorResponseData,
        isVendorPending,
        vendorAlertData,
        formVendor,
        pageHeaderItems,
        isEditVendorPending
    };
};

export default useEditVendorHook;