import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";

export const editCountrySchema: Yup.ObjectSchema<EditCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
    id: Yup.string().nullable(),
});

export interface EditCountryRequestDataType {
    id: string | null | undefined,
    name: string,
    phoneCode: string,
    description: string | null | undefined,
}

export interface EditCountryFormType extends EditCountryRequestDataType {}

export interface EditCountryHookType {
    editCountryAlertData: ErrorAlertType,
    isEditCountryPending: boolean,
    country: EditCountryFormType,
    handleEditCountry: (a: EditCountryFormType) => void,
}

export const updateCountryRequest = ({name, phoneCode, description, id}: EditCountryRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "id", value: id || ""}];
    const url: string = v1URL(shopsApiURI.update, queries);

    return putRequest(url, {name, phoneCode, description});
};