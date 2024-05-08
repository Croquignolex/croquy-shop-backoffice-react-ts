import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {StateType} from "../show/showStateData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editStateSchema: Yup.ObjectSchema<EditStateFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    countryId: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditStateFormType {
    name: string,
    countryId: string,
    description: string | null | undefined,
}

export interface EditStateRequestDataType extends EditStateFormType {
    id: string,
}

export interface EditStateHookType {
    editStateAlertData: ErrorAlertType,
    isEditStatePending: boolean,
    isStatePending: boolean,
    stateAlertData: ErrorAlertType,
    formState: EditStateFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    stateResponseData: StateType,
    handleEditState: (a: EditStateFormType) => void,
}

export const updateStateRequest = ({name, countryId, description, id}: EditStateRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.update, params);

    return putRequest(url, {name, countryId, description});
};