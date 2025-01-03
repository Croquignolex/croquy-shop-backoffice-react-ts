import {FormikProps} from "formik";
import {IconType} from "react-icons";

import {CountryType} from "../pages/countries/show/showCountryData";
// import {StateType} from "../pages/states/show/showStateData";
import {ShopType} from "../pages/shops/show/showShopData";
import {UserType} from "../pages/users/show/showUserData";

// ######################################## ENUMS TYPES ######################################## //

export enum AlertStatusEnumType {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success",
    WARNING = "warning",
}

export enum AttributeTypeEnumType {
    TEXT = "TEXT",
    SELECT = "SELECT",
    COLOR = "COLOR",
}

export enum GenderTypeEnumType {
    MALE = "MALE",
    FEMALE = "FEMALE",
    UNKNOWN = "UNKNOWN",
}

export enum RoleTypeEnumType {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SELLER = "SELLER",
    CUSTOMER = "CUSTOMER",
}

export enum ImageSizeEnumType {
    ROW = "row",
    SMALL = "small",
    LARGE = "large",
}

export enum ShapeEnumType {
    SQUARE = "SQUARE",
    RECTANGLE = "RECTANGLE",
}

export enum SizeType {
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg",
    EXTRA_LARGE = "xl",
}

export enum FileType {
    PDF = "PDF",
    EXCEL = "Excel",
}

// ######################################## TYPES ######################################## //

export interface ErrorAlertType {
    show: boolean,
    status?: AlertStatusEnumType,
    message?: string
}

export interface MenuItemType {
    path: string,
    icon?: IconType,
    title?: string,
}

export interface URLParamType {
    param: string;
    value: any;
}

export interface PaginationType {
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DefaultFieldProps {
    label: string;
    name: string;
    isLoading?: boolean;
    formikProps: FormikProps<any>;
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
    // state?: StateType;
    state?: any;
    createdAt: string;
}