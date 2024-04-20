import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const addCountryInitialStaticValues: AddCountryFormType = { name: '', phoneCode: '', description: '' };

export const addCountrySchema: Yup.ObjectSchema<AddCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface AddCountryFormType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

export interface AddCountryRequestDataType extends AddCountryFormType {}

export interface AddCountryHookType {
    addCountryAlertData: ErrorAlertType,
    isAddCountryPending: boolean,
    sequence: number,
    handleAddCountry: (a: AddCountryFormType) => void,
    handleAddCountryAndContinue: (a: AddCountryFormType) => void,
}

export const storeCountryRequest = ({name, phoneCode, description}: AddCountryRequestDataType): Promise<any> => {
    const url: string = v1URL(countriesApiURI.store);

    return postRequest(url, {name, phoneCode, description});
};