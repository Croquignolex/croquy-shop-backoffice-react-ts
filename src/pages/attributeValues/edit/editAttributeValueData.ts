import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {AttributeValueType} from "../show/showAttributeValueData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";

export const editAttributeValueInitialStaticValues: EditAttributeValueFormType = {name: '', value: '', description: ''};

export const editAttributeValueSchema: Yup.ObjectSchema<EditAttributeValueFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    value: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditAttributeValueFormType {
    name: string,
    value: string,
    description: string | null | undefined,
}

export interface EditAttributeValueRequestDataType extends EditAttributeValueFormType {
    id: string,
}

export interface EditAttributeValueHookType {
    editAttributeValueAlertData: ErrorAlertType,
    isEditAttributeValuePending: boolean,
    isAttributeValuePending: boolean,
    attributeValueAlertData: ErrorAlertType,
    formAttributeValue: EditAttributeValueFormType,
    pageHeaderItems: Array<any>,
    attributeValueResponseData: AttributeValueType,
    handleEditAttributeValue: (a: EditAttributeValueFormType) => void,
}

export const updateAttributeValueRequest = (values: EditAttributeValueRequestDataType): Promise<any> => {
    const {name, value, description, id}: EditAttributeValueRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributeValuesApiURI.update, params);

    return putRequest(url, {name, value, description});
};