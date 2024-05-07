import * as Yup from "yup";

import {ErrorAlertType} from "../../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../../constants/generalConstants";
import {joinBaseUrlWithParams, v1URL} from "../../../../helpers/apiRequestsHelpers";
import {countriesApiURI} from "../../../../constants/apiURIConstants";
import {postRequest} from "../../../../helpers/axiosHelpers";

export const createCountryStateInitialStaticValues: CreateCountryStateFormType = { name: "", description: "" };

export const createCountryStateSchema: Yup.ObjectSchema<CreateCountryStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateCountryStateFormType {
    name: string,
    description: string | null | undefined,
}

export interface CreateCountryStateRequestDataType extends CreateCountryStateFormType {
    countryId: string,
}

export interface CountryStateCreateFormHookeProps {
    countryId: string;
    handleFinish: () => void;
    handleAdd: () => void;
}

export interface CountryStateCreateFormHookType {
    createCountryStateAlertData: ErrorAlertType,
    isCreateCountryStatePending: boolean,
    sequence: number,
    handleCreateCountryState: (a: CreateCountryStateFormType) => void,
    handleCreateCountryStateAndContinue: (a: CreateCountryStateFormType) => void,
}

export const storeStateRequest = ({name, countryId, description}: CreateCountryStateRequestDataType): Promise<any> => {
    const url: string = v1URL(joinBaseUrlWithParams(countriesApiURI.addState, [{param: "id", value: countryId}]));

    return postRequest(url, {name, description});
};