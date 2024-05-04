import { FiPieChart, FiShoppingCart, FiUsers, FiFlag, FiMap } from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";
import { IconType } from "react-icons";

const dashboard: MainRouteType = {title: "Tableau de board", path: '/dashboard', icon: FiPieChart, onSidebar: true, onHeader: false, component: lazy(() => import('../pages/dashboard/DashboardPage'))};

// const shops: MainRouteType = {title: 'Boutiques', path: '/shops', icon: FiShoppingCart, onSidebar: false, onHeader: false, component: lazy(() => import('../pages/shops/ShopsPage'))};
// const addShop: MainRouteType = {path: '/shops/create', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/shops/add/AddShopPage'))};
// const showShop: MainRouteType = {path: '/shops/:id', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/shops/show/ShowShopPage'))};
// const editShop: MainRouteType = {path: '/shops/:id/edit', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/shops/edit/EditShopPage'))};

const users: MainRouteType = {title: 'Utilisateurs', path: '/users', icon: FiUsers, onSidebar: false, onHeader: false, component: lazy(() => import('../pages/users/UsersPage'))};
// const addUser: MainRouteType = {path: '/shops/create', onSidebar: false, onHeader: false, component: LazyShopsPage};
// const showUser: MainRouteType = {path: '/shops/:id', onSidebar: false, onHeader: false, component: LazyShopsPage};
// const editUser: MainRouteType = {path: '/shops/:id/edit', onSidebar: false, onHeader: false, component: LazyShopsPage};

const countries: MainRouteType = {title: 'Pays', path: '/countries', icon: FiFlag, onSidebar: true, onHeader: false, component: lazy(() => import('../pages/countries/CountriesPage'))};
const addCountry: MainRouteType = {path: '/countries/create', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/CreateCountryPage'))};
const showCountry: MainRouteType = {path: '/countries/:id', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/show/ShowCountryPage'))};
const editCountry: MainRouteType = {path: '/countries/:id/edit', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/edit/EditCountryPage'))};

const states: MainRouteType = {title: 'Villes', path: '/states', icon: FiMap, onSidebar: false, onHeader: false, component: lazy(() => import('../pages/states/StatesPage'))};
const addState: MainRouteType = {path: '/states/create', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/CreateCountryPage'))};
const showState: MainRouteType = {path: '/states/:id', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/show/ShowCountryPage'))};
const editState: MainRouteType = {path: '/states/:id/edit', onSidebar: false, onHeader: false, component: lazy(() => import('../pages/countries/edit/EditCountryPage'))};

export interface MainRouteType {
    icon?: IconType,
    onSidebar: boolean,
    onHeader: boolean,
    title?: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const mainRoutes: any = {
    dashboard,
    countries, addCountry, showCountry, editCountry,
    states, addState, showState, editState,
    users,
};
