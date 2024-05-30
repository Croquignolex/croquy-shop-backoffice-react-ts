import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {UserType} from "../../users/show/showUserData";

export const defaultSelectedAttributeValue: AttributeValueType = {
    id: "",
    name: "",
    value: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    creator: null,
}

export interface AttributeValueType {
    id: string;
    name: string;
    value: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: UserType | null;
}

export interface DestroyAttributeValueRequestDataType {
    id: string,
}

export interface ToggleAttributeValueRequestDataType {
    id: string,
}

export interface ShowAttributeValueHookType {
    attributeValueResponseData: AttributeValueType,
    isAttributeValuePending: boolean,
    attributeValueAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteAttributeValueAlertData: ErrorAlertType,
    isDeleteAttributeValuePending: boolean,
    handleDeleteAttributeValue: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleAttributeValueAlertData: ErrorAlertType,
    isToggleAttributeValuePending: boolean,
    handleToggleAttributeValue: () => void,
    onToggleModalClose: () => void,
}

export const attributeValueRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributeValuesApiURI.show, params);
    
    return getRequest(url);
};

export const destroyAttributeValue = ({id}: DestroyAttributeValueRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributeValuesApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleAttributeValue = ({id}: ToggleAttributeValueRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(attributeValuesApiURI.toggle, params);
    
    return patchRequest(url);
};