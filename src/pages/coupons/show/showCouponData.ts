import {ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {UserType} from "../../users/usersPageData";
import {couponsApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const defaultSelectedCoupon: CouponType = {
    id: "",
    code: "",
    discount: 0,
    totalUse: 0,
    totalUsage: 0,
    promotionStartedAt: "",
    promotionEndedAt: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    creator: null,
}

export interface CouponType {
    id: string;
    code: string;
    discount: number;
    totalUse: number;
    totalUsage: number;
    promotionStartedAt: string;
    promotionEndedAt: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: UserType | null;
}

export interface DestroyCouponRequestDataType {
    id: string,
}

export interface ToggleCouponRequestDataType {
    id: string,
}

export interface ShowCouponHookType {
    couponResponseData: CouponType,
    isCouponPending: boolean,
    couponAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteCouponAlertData: ErrorAlertType,
    isDeleteCouponPending: boolean,
    handleDeleteCoupon: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleCouponAlertData: ErrorAlertType,
    isToggleCouponPending: boolean,
    handleToggleCoupon: () => void,
    onToggleModalClose: () => void,
    handleTabsChange: (a: number) => void,
    handleFlagUpdate: (a: MediaType | null) => void,
}

export const couponRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(couponsApiURI.show, params);
    
    return getRequest(url);
};

export const destroyCoupon = ({id}: DestroyCouponRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(couponsApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleCoupon = ({id}: ToggleCouponRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(couponsApiURI.toggle, params);
    
    return patchRequest(url);
};