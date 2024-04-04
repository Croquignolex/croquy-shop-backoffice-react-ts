import { FiHome, FiShoppingCart } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";

import { IconType } from "react-icons";

const LazyDashboardPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/dashboard/DashboardPage'));
const LazyUsersPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/users/UsersPage'));
const LazyShopsPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/shops/ShopsPage'));
const LazyAddShopPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/shops/add/AddShopPage'));
const LazyEditShopPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/shops/edit/EditShopPage'));
const LazyShowShopPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/shops/show/ShowShopPage'));
const LazyAddUserPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/users/UsersPage'));

const dashboard: MainRouteType = {
    title: "Tableau de board", component: LazyDashboardPage,
    path: '/dashboard', icon: FiHome, onSidebar: true, onHeader: false
};

const shops: MainRouteType = {
    title: 'Boutiques', component: LazyShopsPage, path: '/shops',
    icon: FiShoppingCart, onSidebar: true, onHeader: false,
};

const addShop: MainRouteType = {component: LazyAddShopPage, path: '/shops/create', onSidebar: false, onHeader: false};

const showShop: MainRouteType = {component: LazyShowShopPage, path: '/shops/:id', onSidebar: false, onHeader: false};

const editShop: MainRouteType = {component: LazyEditShopPage, path: '/shops/:id/edit', onSidebar: false, onHeader: false};

/*const users: MainRouteType = {
    name: 'users',
    title: 'Utilisateurs',
    component: LazyUsersPage,
    path: '/users',
    icon: FiUsers,
    onSidebar: true,
    onHeader: false,
    breadcrumb: []
};*/

/*const addUser: MainRouteType = {
    name: 'add-user',
    title: 'Nouvel utilisateur',
    component: LazyAddUserPage,
    path: '/users/create',
    icon: FiUsers,
    onSidebar: false,
    onHeader: false,
    breadcrumb: [{path: '/users', label: 'Utilisateurs'}]
};*/

export interface MainRouteType {
    icon?: IconType,
    onSidebar: boolean,
    onHeader: boolean,
    title?: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const mainRoutes: any = {
    dashboard, shops, addShop, showShop, editShop
};
