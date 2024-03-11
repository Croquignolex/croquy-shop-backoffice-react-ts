import { LazyExoticComponent, ReactElement } from "react";
import { IconType } from "react-icons";
import {AxiosError} from "axios";

export interface ErrorAlertType {
    show: boolean,
    status: AlertStatusEnumType,
    message: string
}

export enum AlertStatusEnumType {
    info = 'info',
    error = 'error',
    success = 'success',
    warning = 'warning',
}

export enum LogLevelEnumType {
    info = 'info',
    error = 'error',
    warning = 'warn',
}

export interface BreadcrumbItemsType {
    path: string,
    key: string,
    label: string,
}

export interface MenuItemType {
    path: string,
    name: string,
    key: string,
    icon: IconType,
    title: string,
    isActive: boolean,
}

export interface ReducerActionType {
    type: string;
    payload: any;
}

export interface ErrorRouteType {
    name: string,
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export interface AuthRoutType extends ErrorRouteType {}

export interface MainRouteType extends ErrorRouteType {
    icon: IconType,
    breadcrumb: [],
    onSidebar: boolean,
    onHeader: boolean,
}

export interface FormDisabledFieldProps {
    label?: string;
    name: string;
    noLabel?: boolean;
}

export interface FormFieldProps extends FormDisabledFieldProps {
    isInvalid: boolean;
    errorMessage?: string;
}

export interface FormSelectOptionType {
    label: string;
    key: string,
}

export interface SelectFormFieldProps extends FormFieldProps {
    values: FormSelectOptionType[];
}

export interface FormCustomDisabledPhoneFieldProps {
    label?: string;
    code: string,
    number: string,
    noLabel?: boolean;
}

export interface RequestResponseType {
    data?: any;
    error?: AxiosError | null;
    isError?: boolean;
    isIdle?: boolean;
    isPending?: boolean;
    isPaused?: boolean;
    isSuccess?: boolean;
    failureCount?: number;
    failureReason?: AxiosError | null;
    mutate?: any;
    mutateAsync?: any;
    reset?: any;
    status?: string;
    submittedAt?: number;
    variables?: any;
}