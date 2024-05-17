import {IconType} from "react-icons";
import {UserType} from "../pages/users/usersPageData";
import {CountryType} from "../pages/countries/show/showCountryData";
import {StateType} from "../pages/states/show/showStateData";
import {ShopType} from "../pages/shops/show/showShopData";

export interface ErrorAlertType {
    show: boolean,
    status?: AlertStatusEnumType,
    message?: string
}

export enum AlertStatusEnumType {
    info = 'info',
    error = 'error',
    success = 'success',
    warning = 'warning',
}

export enum ImageSizeEnumType {
    row = 'row',
    small = 'small',
    large = 'small',
}

export interface ReducerActionType {
    type: string;
    payload: any;
}

export interface MenuItemType {
    path: string,
    icon?: IconType,
    title?: string,
}

export interface URLParamType {
    param: string;
    value: string;
}

export const defaultMedia: MediaType = {
    id: "",
    originalName: "",
    path: "",
    createdAt: "",
}

export interface MediaType {
    id: string;
    originalName?: string;
    size?: number;
    path: string;
    country?: CountryType;
    creator?: UserType;
    createdAt: string;
    base64?: string | null;
}

export interface AddressType {
    id: string;
    type: string;
    streetAddress: string;
    zipcode?: string;
    phoneNumberOne: string;
    phoneNumberTwo?: string;
    description?: string;
    shop?: ShopType;
    creator?: UserType;
    state?: StateType;
    createdAt: string;
}