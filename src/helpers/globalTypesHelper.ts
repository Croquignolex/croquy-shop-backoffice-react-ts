import {IconType} from "react-icons";

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

export interface ReducerActionType {
    type: string;
    payload: any;
}

export interface MenuItemType {
    path: string,
    name: string,
    key: string,
    icon: IconType,
    title: string,
    isActive: boolean,
}



