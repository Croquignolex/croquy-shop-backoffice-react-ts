import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {BrandType} from "../../../pages/brands/show/showBrandData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultBrandsResponseData: BrandsResponseDataType = {
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

export interface BrandsResponseDataType {
    content: Array<BrandType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyBrandRequestDataType {
    id: string,
}

export interface BrandsTableListHookType {
    brandsResponseData: BrandsResponseDataType,
    isBrandsPending: boolean,
    brandsAlertData: ErrorAlertType,
    fetchPaginatedBrands: (a: boolean) => void,
    fetchPaginatedNeedleBrands: (a: string) => void,
    selectedBrand: BrandType,
    showDeleteModal: (a: BrandType) => void,
    isDeleteModalOpen: boolean,
    deleteBrandAlertData: ErrorAlertType,
    isDeleteBrandPending: boolean,
    handleDeleteBrand: () => void,
    onDeleteModalClose: () => void,
}

export interface BrandsTableListHookProps {
    fetchBrands: boolean,
    brandsBaseUrl: string,
}

export const brandsRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};