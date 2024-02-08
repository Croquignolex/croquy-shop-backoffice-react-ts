import {LazyExoticComponent, ReactElement} from "react";
import { IconType } from "react-icons";

export enum AlertStatusEnumType {
    info = 'info',
    error = 'error',
    success = 'success',
    warning = 'warning',
    loading = 'loading',
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