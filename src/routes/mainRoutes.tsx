import { MainRouteType } from "../types/otherTypes";
import { FiHome, FiUsers } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyDashboardPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/DashboardPage'));
const LazyUsersPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/users/UsersPage'));

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

export const mainRoutes: any = {
    dashboard, users
};
