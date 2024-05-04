import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const addStateInitialStaticValues: AddStateFormType = { name: "", countryId: "", description: "" };

export const addStateSchema: Yup.ObjectSchema<AddStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AddStateFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

export interface AddStateRequestDataType extends AddStateFormType {}

export interface AddStateHookType {
    addStateAlertData: ErrorAlertType,
    isAddStatePending: boolean,
    sequence: number,
    handleAddState: (a: AddStateFormType) => void,
    handleAddStateAndContinue: (a: AddStateFormType) => void,
}

export const storeStateRequest = ({name, countryId, description}: AddStateRequestDataType): Promise<any> => {
    const url: string = v1URL(statesApiURI.store);

    return postRequest(url, {name, countryId, description});
};