import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {ShopType} from "../../../pages/shops/show/showShopData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultShopsResponseData: ShopsResponseDataType = {
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

export interface ShopsResponseDataType {
    content: Array<ShopType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyShopRequestDataType {
    id: string,
}

export interface ShopsTableListHookType {
    shopsResponseData: ShopsResponseDataType,
    isShopsPending: boolean,
    shopsAlertData: ErrorAlertType,
    fetchPaginatedShops: (a: boolean) => void,
    fetchPaginatedNeedleShops: (a: string) => void,
    selectedShop: ShopType,
    showDeleteModal: (a: ShopType) => void,
    isDeleteModalOpen: boolean,
    deleteShopAlertData: ErrorAlertType,
    isDeleteShopPending: boolean,
    handleDeleteShop: () => void,
    onDeleteModalClose: () => void,
}

export interface ShopsTableListHookProps {
    fetchShops: boolean,
    shopsBaseUrl: string,
}

export const shopsRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};