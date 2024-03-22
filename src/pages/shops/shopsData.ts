import {SimpleUserType} from "../users/usersPageData";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";

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

export const defaultSelectedShop: ShopType = {
    id: "",
    name: "",
    slug: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    creator: null,
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

export interface ShopType {
    id: string;
    name: string;
    slug: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: SimpleUserType | null;
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
    closeModal: (e?: boolean) => void,
    setShopsQueryEnabled: any
}

export interface DeleteShopHookType {
    isDeleteShopPending: boolean,
    deleteShopAlertData: ErrorAlertType,
    handleDeleteShop: () => void
}

export interface DeleteShopHookProps {
    selectedShop: ShopType,
    closeModal: (a?: boolean) => void,
}