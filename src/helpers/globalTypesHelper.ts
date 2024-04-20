import {IconType} from "react-icons";
import {UserType} from "../pages/users/usersPageData";
import {CountryType} from "../pages/countries/show/showCountryData";

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
    updatedAt: "",
}

export interface MediaType {
    id: string;
    originalName?: string;
    size?: number;
    path: string;
    country?: CountryType;
    creator?: UserType;
    updatedAt: string;
    base64?: string | null;
}