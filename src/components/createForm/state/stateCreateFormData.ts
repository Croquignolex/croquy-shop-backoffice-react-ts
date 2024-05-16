import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createStateInitialStaticValues: CreateStateFormType = { name: "", countryId: "", description: "" };

export const createStateSchema: Yup.ObjectSchema<CreateStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateStateFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

export interface CreateStateRequestDataType extends CreateStateFormType {}

export interface StateCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
}

export interface StateCreateFormHookType {
    createStateAlertData: ErrorAlertType,
    isCreateStatePending: boolean,
    sequence: number,
    handleCreateState: (a: CreateStateFormType) => void,
    handleCreateStateAndContinue: (a: CreateStateFormType) => void,
}

export const storeStateRequest = ({name, countryId, description}: CreateStateRequestDataType): Promise<any> => {
    const url: string = v1URL(statesApiURI.store);

    return postRequest(url, {name, countryId, description});
};