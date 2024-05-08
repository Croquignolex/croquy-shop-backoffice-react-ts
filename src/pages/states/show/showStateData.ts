import {UserType} from "../../users/usersPageData";
import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {CountryType} from "../../countries/show/showCountryData";

export const defaultSelectedState: StateType = {
    id: "",
    name: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    country: null,
    creator: null,
}

export interface StateType {
    id: string;
    name: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    country: CountryType | null;
    creator: UserType | null;
}

export interface DestroyStateRequestDataType {
    id: string,
}

export interface ToggleStateRequestDataType {
    id: string,
}

export interface ShowStateHookType {
    stateResponseData: StateType,
    isStatePending: boolean,
    stateAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteStateAlertData: ErrorAlertType,
    isDeleteStatePending: boolean,
    handleDeleteState: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleStateAlertData: ErrorAlertType,
    isToggleStatePending: boolean,
    handleToggleState: () => void,
    onToggleModalClose: () => void,
}

export const stateRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.show, params);

    return getRequest(url);
};

export const destroyState = ({id}: DestroyStateRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.destroy, params);

    return deleteRequest(url);
};

export const toggleState = ({id}: ToggleStateRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(statesApiURI.toggle, params);

    return patchRequest(url);
};