import {ErrorAlertType, URLParamType} from "../../helpers/globalTypesHelper";
import {shopsApiURI} from "../../constants/apiURIConstants";
import {getRequest} from "../../helpers/axiosHelpers";
import {v1URL} from "../../helpers/apiRequestsHelpers";
import {ShopType} from "./show/showShopData";

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

export interface ShopsHookType {
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

export const shopsRequest = (page: number, size: number, needle: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(shopsApiURI.index, [], queries);

    return getRequest(url);
};