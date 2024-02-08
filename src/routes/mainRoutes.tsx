import { MainRouteType } from "../types/otherTypes";
import { FiHome } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyHomePage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/HomePage'));

const home: MainRouteType = {
    name: 'home',
    title: 'Accueil',
    component: LazyHomePage,
    path: '/home',
    icon: FiHome,
    onSidebar: true,
    onHeader: false,
    breadcrumb: []
};

export const mainRoutes: any = {
    home
};
