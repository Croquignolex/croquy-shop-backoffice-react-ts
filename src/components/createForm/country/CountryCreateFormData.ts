import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createCountryInitialStaticValues: CreateCountryFormType = { name: '', phoneCode: '', description: '' };

export const createCountrySchema: Yup.ObjectSchema<CreateCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CreateCountryFormType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

export interface CreateCountryRequestDataType extends CreateCountryFormType {}

export interface CountryCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
}

export interface CountryCreateFormHookType {
    createCountryAlertData: ErrorAlertType,
    isCreateCountryPending: boolean,
    sequence: number,
    handleCreateCountry: (a: CreateCountryFormType) => void,
    handleCreateCountryAndContinue: (a: CreateCountryFormType) => void,
}

export const storeCountryRequest = ({name, phoneCode, description}: CreateCountryRequestDataType): Promise<any> => {
    const url: string = v1URL(countriesApiURI.store);

    return postRequest(url, {name, phoneCode, description});
};