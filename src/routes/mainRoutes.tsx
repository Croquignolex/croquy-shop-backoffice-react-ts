import { FiHome, FiUsers, FiShoppingCart } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";

import { IconType } from "react-icons";
import { BreadcrumbItemsType } from "../components/menu/PageBreadcrumb";

const LazyDashboardPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/dashboard/DashboardPage'));
const LazyUsersPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/users/UsersPage'));
const LazyShopsPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/shops/ShopsPage'));
const LazyAddUserPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/users/UsersPage'));

const dashboard: MainRouteType = {
    name: 'dashboard',
    title: 'Tableau de board',
    component: LazyDashboardPage,
    path: '/dashboard',
    icon: FiHome,
    onSidebar: true,
    onHeader: false,
    breadcrumb: []
};

const shops: MainRouteType = {
    name: 'shops',
    title: 'Boutiques',
    component: LazyShopsPage,
    path: '/shops',
    icon: FiShoppingCart,
    onSidebar: true,
    onHeader: false,
    breadcrumb: []
};

const addShop: MainRouteType = {
    name: 'add-shop',
    title: 'Nouvelle boutique',
    component: LazyShopsPage,
    path: '/shops/create',
    icon: FiShoppingCart,
    onSidebar: false,
    onHeader: false,
    breadcrumb: [{path: '/shops', label: 'Boutiques'}]
};

const users: MainRouteType = {
    name: 'users',
    title: 'Utilisateurs',
    component: LazyUsersPage,
    path: '/users',
    icon: FiUsers,
    onSidebar: true,
    onHeader: false,
    breadcrumb: []
};

const addUser: MainRouteType = {
    name: 'add-user',
    title: 'Nouvel utilisateur',
    component: LazyAddUserPage,
    path: '/users/create',
    icon: FiUsers,
    onSidebar: false,
    onHeader: false,
    breadcrumb: [{path: '/users', label: 'Utilisateurs'}]
};

export interface MainRouteType {
    icon: IconType,
    breadcrumb: Array<BreadcrumbItemsType>,
    onSidebar: boolean,
    onHeader: boolean,
    name: string,
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const mainRoutes: any = {
    dashboard, shops, addShop, users, addUser
};
