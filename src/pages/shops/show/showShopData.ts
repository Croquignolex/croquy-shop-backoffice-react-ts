import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {UserType} from "../../users/usersPageData";

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

export interface ShopType {
    id: string;
    name: string;
    slug: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: UserType | null;
}

export interface DestroyShopRequestDataType {
    id: string,
}

export interface ToggleShopRequestDataType {
    id: string,
}

export interface ShowShopHookType {
    shopResponseData: ShopType,
    isShopPending: boolean,
    shopAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteShopAlertData: ErrorAlertType,
    isDeleteShopPending: boolean,
    handleDeleteShop: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleShopAlertData: ErrorAlertType,
    isToggleShopPending: boolean,
    handleToggleShop: () => void,
    onToggleModalClose: () => void,
}

export const shopRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(shopsApiURI.show, params);

    return getRequest(url);
};

export const destroyShop = ({id}: DestroyShopRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(shopsApiURI.destroy, params);

    return deleteRequest(url);
};

export const toggleShop = ({id}: ToggleShopRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(shopsApiURI.toggle, params);

    return patchRequest(url);
};