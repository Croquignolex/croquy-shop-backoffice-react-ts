import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const addCountryInitialStaticValues: AddCountryFormType = { name: '', phoneCode: '', description: '' };

export const addCountrySchema: Yup.ObjectSchema<AddCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AddCountryRequestDataType {
    name: string,
    phoneCode: string,
    description: string | null | undefined,
}

export interface AddCountryFormType extends AddCountryRequestDataType {}

export interface AddCountryHookType {
    addCountryAlertData: ErrorAlertType,
    isAddCountryPending: boolean,
    sequence: number,
    handleAddCountry: (a: AddCountryFormType) => void,
    handleAddCountryAndContinue: (a: AddCountryFormType) => void,
}

export const storeCountryRequest = ({name, phoneCode, description}: AddCountryRequestDataType): Promise<any> => {
    const url: string = v1URL(shopsApiURI.store);

    return postRequest(url, {name, phoneCode, description});
};