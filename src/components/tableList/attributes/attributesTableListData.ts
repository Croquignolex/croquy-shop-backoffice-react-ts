import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {AttributeType} from "../../../pages/attributes/show/showAttributeData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultAttributesResponseData: AttributesResponseDataType = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true
}

export interface AttributesResponseDataType {
    content: Array<AttributeType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyAttributeRequestDataType {
    id: string,
}

export interface AttributesTableListHookType {
    attributesResponseData: AttributesResponseDataType,
    isAttributesPending: boolean,
    attributesAlertData: ErrorAlertType,
    fetchPaginatedAttributes: (a: boolean) => void,
    fetchPaginatedNeedleAttributes: (a: string) => void,
    selectedAttribute: AttributeType,
    showDeleteModal: (a: AttributeType) => void,
    isDeleteModalOpen: boolean,
    deleteAttributeAlertData: ErrorAlertType,
    isDeleteAttributePending: boolean,
    handleDeleteAttribute: () => void,
    onDeleteModalClose: () => void,
}

export interface AttributesTableListHookProps {
    fetchAttributes: boolean,
    attributesBaseUrl: string,
}

export const attributesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};