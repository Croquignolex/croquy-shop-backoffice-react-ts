import { MainRouteType } from "../types/otherTypes";
import { FiHome } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyDashboardPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/DashboardPage'));

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

export const mainRoutes: any = {
    dashboard
};
