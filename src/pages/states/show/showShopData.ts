import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {ShopType} from "../../shops/show/showShopData";

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