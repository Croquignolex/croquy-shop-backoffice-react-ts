import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {AttributeValueType} from "../../../pages/attributeValues/show/showAttributeValueData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultAttributeValuesResponseData: AttributeValuesResponseDataType = {
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

export interface AttributeValuesResponseDataType {
    content: Array<AttributeValueType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyAttributeValueRequestDataType {
    id: string,
}

export interface AttributeValuesTableListHookType {
    attributeValuesResponseData: AttributeValuesResponseDataType,
    isAttributeValuesPending: boolean,
    attributeValuesAlertData: ErrorAlertType,
    fetchPaginatedAttributeValues: (a: boolean) => void,
    fetchPaginatedNeedleAttributeValues: (a: string) => void,
    selectedAttributeValue: AttributeValueType,
    showDeleteModal: (a: AttributeValueType) => void,
    isDeleteModalOpen: boolean,
    deleteAttributeValueAlertData: ErrorAlertType,
    isDeleteAttributeValuePending: boolean,
    handleDeleteAttributeValue: () => void,
    onDeleteModalClose: () => void,
}

export interface AttributeValuesTableListHookProps {
    fetchAttributeValues: boolean,
    attributeValuesBaseUrl: string,
}

export const attributeValuesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};