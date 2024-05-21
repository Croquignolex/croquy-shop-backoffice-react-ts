import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {VendorType} from "../../../pages/vendors/show/showVendorData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultVendorsResponseData: VendorsResponseDataType = {
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

export interface VendorsResponseDataType {
    content: Array<VendorType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyVendorRequestDataType {
    id: string,
}

export interface VendorsTableListHookType {
    vendorsResponseData: VendorsResponseDataType,
    isVendorsPending: boolean,
    vendorsAlertData: ErrorAlertType,
    fetchPaginatedVendors: (a: boolean) => void,
    fetchPaginatedNeedleVendors: (a: string) => void,
    selectedVendor: VendorType,
    showDeleteModal: (a: VendorType) => void,
    isDeleteModalOpen: boolean,
    deleteVendorAlertData: ErrorAlertType,
    isDeleteVendorPending: boolean,
    handleDeleteVendor: () => void,
    onDeleteModalClose: () => void,
}

export interface VendorsTableListHookProps {
    fetchVendors: boolean,
    vendorsBaseUrl: string,
}

export const vendorsRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};