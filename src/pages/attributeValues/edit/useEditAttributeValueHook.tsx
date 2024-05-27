import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {attributeValueRequest, AttributeValueType, defaultSelectedAttributeValue} from "../show/showAttributeValueData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditAttributeValueFormType,
    EditAttributeValueHookType,
    editAttributeValueInitialStaticValues,
    EditAttributeValueRequestDataType,
    updateAttributeValueRequest
} from "./editAttributeValueData"

const useEditAttributeValueHook = (): EditAttributeValueHookType => {
    let attributeValueAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const attributeValue: AttributeValueType = state;

    const [editAttributeValueAlertData, setEditAttributeValueAlertData] = useState<ErrorAlertType>({show: false});
    const [attributeValueQueryEnabled, setAttributeValueQueryEnabled] = useState<boolean>(false);
    const [attributeValueResponseData, setAttributeValueResponseData] = useState<AttributeValueType>(defaultSelectedAttributeValue);
    const [formAttributeValue, setFormAttributeValue] = useState<EditAttributeValueFormType>(editAttributeValueInitialStaticValues);

    useEffect((): void => {
        if(attributeValue) {
            setAttributeValueResponseData(attributeValue);
            setFormAttributeValue(attributeValue);
        } else {
            setAttributeValueQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const attributeValueResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["attributeValue"],
        queryFn: () => attributeValueRequest(id || ""),
        enabled: attributeValueQueryEnabled,
    });

    const updateAttributeValueResponse: UseMutationResult<AxiosResponse, AxiosError, EditAttributeValueRequestDataType, any> = useMutation({
        mutationFn: updateAttributeValueRequest,
        onError: (error: AxiosError): void => {
            setEditAttributeValueAlertData(errorAlert(error));

            log("Update attributeValue failure", updateAttributeValueResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditAttributeValueRequestDataType): void => {
            setEditAttributeValueAlertData({show: false});

            const toastMessage: string = `Valeur d'attribut ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.attributeValues.path}/${attributeValueResponseData.id}`);

            log("Update attributeValue successful", updateAttributeValueResponse);
        }
    });

    if(attributeValueResponse.isError) {
        attributeValueAlertData = errorAlert(attributeValueResponse.error);

        log("AttributeValue show failure", attributeValueResponse);
    }

    if(attributeValueQueryEnabled && attributeValueResponse.isSuccess && !attributeValueResponse.isFetching) {
        setAttributeValueResponseData(attributeValueResponse.data.data);
        setFormAttributeValue(attributeValueResponse.data.data);
        setAttributeValueQueryEnabled(false);

        log("AttributeValues list successful", attributeValueResponse);
    }

    const handleEditAttributeValue = (values: EditAttributeValueFormType): void => {
        const {name, value, description}: EditAttributeValueFormType = values;
        updateAttributeValueResponse.mutate({name, value, description, id: attributeValueResponseData.id});
    }

    const isEditAttributeValuePending: boolean = updateAttributeValueResponse.isPending;
    const isAttributeValuePending: boolean = attributeValueResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.attributeValues.path, label: "Valeurs d'attributs"}];
    if(attributeValueResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.attributeValues.path}/${attributeValueResponseData.id}`,
            label: `Détail valeur d'attribut ${attributeValueResponseData.name}`,
            state: attributeValueResponseData
        })
    }

    return {
        editAttributeValueAlertData,
        handleEditAttributeValue,
        attributeValueResponseData,
        isAttributeValuePending,
        attributeValueAlertData,
        formAttributeValue,
        pageHeaderItems,
        isEditAttributeValuePending
    };
};

export default useEditAttributeValueHook;