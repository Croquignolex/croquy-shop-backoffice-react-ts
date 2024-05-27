import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {attributeRequest, AttributeType, defaultSelectedAttribute} from "../show/showAttributeData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditAttributeFormType,
    EditAttributeHookType,
    editAttributeInitialStaticValues,
    EditAttributeRequestDataType,
    updateAttributeRequest
} from "./editAttributeData"

const useEditAttributeHook = (): EditAttributeHookType => {
    let attributeAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const attribute: AttributeType = state;

    const [editAttributeAlertData, setEditAttributeAlertData] = useState<ErrorAlertType>({show: false});
    const [attributeQueryEnabled, setAttributeQueryEnabled] = useState<boolean>(false);
    const [attributeResponseData, setAttributeResponseData] = useState<AttributeType>(defaultSelectedAttribute);
    const [formAttribute, setFormAttribute] = useState<EditAttributeFormType>(editAttributeInitialStaticValues);

    useEffect((): void => {
        if(attribute) {
            setAttributeResponseData(attribute);
            setFormAttribute(attribute);
        } else {
            setAttributeQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const attributeResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attribute"],
        queryFn: () => attributeRequest(id || ""),
        enabled: attributeQueryEnabled,
    });

    const updateAttributeResponse: UseMutationResult<AxiosResponse, AxiosError, EditAttributeRequestDataType, any> = useMutation({
        mutationFn: updateAttributeRequest,
        onError: (error: AxiosError): void => {
            setEditAttributeAlertData(errorAlert(error));

            log("Update attribute failure", updateAttributeResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditAttributeRequestDataType): void => {
            setEditAttributeAlertData({show: false});

            const toastMessage: string = `Attribut ${variables.name} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.attributes.path}/${attributeResponseData.id}`);

            log("Update attribute successful", updateAttributeResponse);
        }
    });

    if(attributeResponse.isError) {
        attributeAlertData = errorAlert(attributeResponse.error);

        log("Attribute show failure", attributeResponse);
    }

    if(attributeQueryEnabled && attributeResponse.isSuccess && !attributeResponse.isFetching) {
        setAttributeResponseData(attributeResponse.data.data);
        setFormAttribute(attributeResponse.data.data);
        setAttributeQueryEnabled(false);

        log("Attributes list successful", attributeResponse);
    }

    const handleEditAttribute = (values: EditAttributeFormType): void => {
        const {name, type, description}: EditAttributeFormType = values;
        updateAttributeResponse.mutate({name, type, description, id: attributeResponseData.id});
    }

    const isEditAttributePending: boolean = updateAttributeResponse.isPending;
    const isAttributePending: boolean = attributeResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.attributes.path, label: 'Attributs'}];
    if(attributeResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.attributes.path}/${attributeResponseData.id}`,
            label: `Détail attribut ${attributeResponseData.name}`,
            state: attributeResponseData
        })
    }

    return {
        editAttributeAlertData,
        handleEditAttribute,
        attributeResponseData,
        isAttributePending,
        attributeAlertData,
        formAttribute,
        pageHeaderItems,
        isEditAttributePending
    };
};

export default useEditAttributeHook;