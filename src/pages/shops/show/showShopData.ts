import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {ShopType} from "../shopsData";

export interface ShowShopHookType {
    shopResponseData: ShopType,
    isShopsPending: boolean,
    shopAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteShopAlertData: ErrorAlertType,
    isDeleteShopPending: boolean,
    handleDeleteShop: () => void,
    onDeleteModalClose: () => void,
}