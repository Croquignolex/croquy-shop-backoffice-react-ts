import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {UserType} from "../../users/show/showUserData";

export const defaultSelectedAttribute: AttributeType = {
    id: "",
    name: "",
    type: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    creator: null,
}

export interface AttributeType {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: UserType | null;
}

export interface DestroyAttributeRequestDataType {
    id: string,
}

export interface ToggleAttributeRequestDataType {
    id: string,
}

export interface ShowAttributeHookType {
    attributeResponseData: AttributeType,
    isAttributePending: boolean,
    attributeAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteAttributeAlertData: ErrorAlertType,
    isDeleteAttributePending: boolean,
    handleDeleteAttribute: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleAttributeAlertData: ErrorAlertType,
    isToggleAttributePending: boolean,
    handleToggleAttribute: () => void,
    onToggleModalClose: () => void,
}

export const attributeRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributesApiURI.show, params);
    
    return getRequest(url);
};

export const destroyAttribute = ({id}: DestroyAttributeRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributesApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleAttribute = ({id}: ToggleAttributeRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributesApiURI.toggle, params);
    
    return patchRequest(url);
};