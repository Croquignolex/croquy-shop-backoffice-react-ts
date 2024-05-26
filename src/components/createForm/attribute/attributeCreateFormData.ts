import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createAttributeInitialStaticValues: CreateAttributeFormType = {name: '', description: '', type: ''};

export const createAttributeSchema: Yup.ObjectSchema<CreateAttributeFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    type: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateAttributeFormType {
    name: string,
    type: string,
    description: string | null | undefined,
}

export interface CreateAttributeRequestDataType extends CreateAttributeFormType {}

export interface AttributeCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface AttributeCreateFormHookType {
    createAttributeAlertData: ErrorAlertType,
    isCreateAttributePending: boolean,
    sequence: number,
    handleCreateAttribute: (a: CreateAttributeFormType) => void,
    handleCreateAttributeAndContinue: (a: CreateAttributeFormType) => void,
}

export const storeAttributeRequest = (values: CreateAttributeRequestDataType): Promise<any> => {
    const {name, type, description}: CreateAttributeRequestDataType = values;
    const url: string = v1URL(attributesApiURI.store);

    return postRequest(url, {name, type, description});
};