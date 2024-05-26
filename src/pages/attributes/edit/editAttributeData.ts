import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {AttributeType} from "../show/showAttributeData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editAttributeInitialStaticValues: EditAttributeFormType = {name: '', description: ''};

export const editAttributeSchema: Yup.ObjectSchema<EditAttributeFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditAttributeFormType {
    name: string,
    description: string | null | undefined,
}

export interface EditAttributeRequestDataType extends EditAttributeFormType {
    id: string,
}

export interface EditAttributeHookType {
    editAttributeAlertData: ErrorAlertType,
    isEditAttributePending: boolean,
    isAttributePending: boolean,
    attributeAlertData: ErrorAlertType,
    formAttribute: EditAttributeFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    attributeResponseData: AttributeType,
    handleEditAttribute: (a: EditAttributeFormType) => void,
}

export const updateAttributeRequest = (values: EditAttributeRequestDataType): Promise<any> => {
    const {name, description, id}: EditAttributeRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributesApiURI.update, params);

    return putRequest(url, {name, description});
};