import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createAttributeValueInitialStaticValues: CreateAttributeValueFormType = {name: '', value: '', description: ''};

export const createAttributeValueSchema: Yup.ObjectSchema<CreateAttributeValueFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    value: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateAttributeValueFormType {
    name: string,
    value: string,
    description: string | null | undefined,
}

export interface CreateAttributeValueRequestDataType extends CreateAttributeValueFormType {}

export interface AttributeValueCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface AttributeValueCreateFormHookType {
    createAttributeValueAlertData: ErrorAlertType,
    isCreateAttributeValuePending: boolean,
    sequence: number,
    handleCreateAttributeValue: (a: CreateAttributeValueFormType) => void,
    handleCreateAttributeValueAndContinue: (a: CreateAttributeValueFormType) => void,
}

export const storeAttributeValueRequest = (values: CreateAttributeValueRequestDataType): Promise<any> => {
    const {name, value, description}: CreateAttributeValueRequestDataType = values;
    const url: string = v1URL(attributeValuesApiURI.store);

    return postRequest(url, {name, value, description});
};