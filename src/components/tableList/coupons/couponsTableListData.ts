import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {CouponType} from "../../../pages/coupons/show/showCouponData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultCouponsResponseData: CouponsResponseDataType = {
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

export interface CouponsResponseDataType {
    content: Array<CouponType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyCouponRequestDataType {
    id: string,
}

export interface CouponsTableListHookType {
    couponsResponseData: CouponsResponseDataType,
    isCouponsPending: boolean,
    couponsAlertData: ErrorAlertType,
    fetchPaginatedCoupons: (a: boolean) => void,
    fetchPaginatedNeedleCoupons: (a: string) => void,
    selectedCoupon: CouponType,
    showDeleteModal: (a: CouponType) => void,
    isDeleteModalOpen: boolean,
    deleteCouponAlertData: ErrorAlertType,
    isDeleteCouponPending: boolean,
    handleDeleteCoupon: () => void,
    onDeleteModalClose: () => void,
}

export interface CouponsTableListHookProps {
    fetchCoupons: boolean,
    couponsBaseUrl: string,
}

export const couponsRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};