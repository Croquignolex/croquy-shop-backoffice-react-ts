import {
    FiPieChart,
    FiShoppingCart,
    FiUsers,
    FiFlag,
    FiMap,
    FiPercent,
    FiTruck,
    FiAward,
    FiColumns,
    FiTag,
    FiTarget,
    FiSliders,
    FiGrid
} from "react-icons/fi";
import { lazy, LazyExoticComponent, ReactElement } from "react";
import { IconType } from "react-icons";

const dashboard: MainRouteType = {title: "Tableau de board", path: "/dashboard", icon: FiPieChart, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/dashboard/DashboardPage"))};

const shops: MainRouteType = {title: "Boutiques", path: "/shops", icon: FiShoppingCart, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/shops/ShopsPage"))};
const addShop: MainRouteType = {path: "/shops/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/shops/CreateShopPage"))};
const showShop: MainRouteType = {path: "/shops/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/shops/show/ShowShopPage"))};
const editShop: MainRouteType = {path: "/shops/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/shops/edit/EditShopPage"))};

const users: MainRouteType = {title: "Utilisateurs", path: "/users", icon: FiUsers, onSidebar: false, onHeader: false, component: lazy(() => import("../pages/users/UsersPage"))};
// const addUser: MainRouteType = {path: "/shops/create", onSidebar: false, onHeader: false, component: LazyShopsPage};
// const showUser: MainRouteType = {path: "/shops/:id", onSidebar: false, onHeader: false, component: LazyShopsPage};
// const editUser: MainRouteType = {path: "/shops/:id/edit", onSidebar: false, onHeader: false, component: LazyShopsPage};

const countries: MainRouteType = {title: "Pays", path: "/countries", icon: FiFlag, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/countries/CountriesPage"))};
const addCountry: MainRouteType = {path: "/countries/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/countries/CreateCountryPage"))};
const showCountry: MainRouteType = {path: "/countries/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/countries/show/ShowCountryPage"))};
const editCountry: MainRouteType = {path: "/countries/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/countries/edit/EditCountryPage"))};

const states: MainRouteType = {title: "Villes", path: "/states", icon: FiMap, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/states/StatesPage"))};
const addState: MainRouteType = {path: "/states/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/states/CreateStatePage"))};
const showState: MainRouteType = {path: "/states/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/states/show/ShowStatePage"))};
const editState: MainRouteType = {path: "/states/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/states/edit/EditStatePage"))};

const coupons: MainRouteType = {title: "Coupons", path: "/coupons", icon: FiPercent, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/coupons/CouponsPage"))};
const addCoupon: MainRouteType = {path: "/coupons/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/coupons/CreateCouponPage"))};
const showCoupon: MainRouteType = {path: "/coupons/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/coupons/show/ShowCouponPage"))};
const editCoupon: MainRouteType = {path: "/coupons/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/coupons/edit/EditCouponPage"))};

const vendors: MainRouteType = {title: "Fourniseurs", path: "/vendors", icon: FiTruck, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/vendors/VendorsPage"))};
const addVendor: MainRouteType = {path: "/vendors/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/vendors/CreateVendorPage"))};
const showVendor: MainRouteType = {path: "/vendors/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/vendors/show/ShowVendorPage"))};
const editVendor: MainRouteType = {path: "/vendors/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/vendors/edit/EditVendorPage"))};

const brands: MainRouteType = {title: "Marques", path: "/brands", icon: FiAward, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/brands/BrandsPage"))};
const addBrand: MainRouteType = {path: "/brands/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/brands/CreateBrandPage"))};
const showBrand: MainRouteType = {path: "/brands/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/brands/show/ShowBrandPage"))};
const editBrand: MainRouteType = {path: "/brands/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/brands/edit/EditBrandPage"))};

const groups: MainRouteType = {title: "Groupes", path: "/groups", icon: FiColumns, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/groups/GroupsPage"))};
const addGroup: MainRouteType = {path: "/groups/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/groups/CreateGroupPage"))};
const showGroup: MainRouteType = {path: "/groups/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/groups/show/ShowGroupPage"))};
const editGroup: MainRouteType = {path: "/groups/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/groups/edit/EditGroupPage"))};

const categories: MainRouteType = {title: "Categories", path: "/categories", icon: FiGrid, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/categories/CategoriesPage"))};
const addCategory: MainRouteType = {path: "/categories/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/CreateCategoryPage"))};
const showCategory: MainRouteType = {path: "/categories/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/show/ShowCategoryPage"))};
const editCategory: MainRouteType = {path: "/categories/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/edit/EditCategoryPage"))};

const attributes: MainRouteType = {title: "Attributs", path: "/attributes", icon: FiTag, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/attributes/AttributesPage"))};
const addAttribute: MainRouteType = {path: "/attributes/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/attributes/CreateAttributePage"))};
const showAttribute: MainRouteType = {path: "/attributes/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/attributes/show/ShowAttributePage"))};
const editAttribute: MainRouteType = {path: "/attributes/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/attributes/edit/EditAttributePage"))};

const attributeValue: MainRouteType = {title: "Valeurs d'Attribut", path: "/attribute-values", icon: FiSliders, onSidebar: true, onHeader: false, component: lazy(() => import("../pages/categories/CategoriesPage"))};
const addAttributeValue: MainRouteType = {path: "/attribute-values/create", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/CreateCategoryPage"))};
const showAttributeValue: MainRouteType = {path: "/attribute-values/:id", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/show/ShowCategoryPage"))};
const editAttributeValue: MainRouteType = {path: "/attribute-values/:id/edit", onSidebar: false, onHeader: false, component: lazy(() => import("../pages/categories/edit/EditCategoryPage"))};

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
    shops, addShop, showShop, editShop,
    brands, addBrand, showBrand, editBrand,
    groups, addGroup, showGroup, editGroup,
    categories, addCategory, showCategory, editCategory,
    attributes, addAttribute, showAttribute, editAttribute,
    attributeValue, addAttributeValue, showAttributeValue, editAttributeValue,
    vendors, addVendor, showVendor, editVendor,
    coupons, addCoupon, showCoupon, editCoupon,
    countries, addCountry, showCountry, editCountry,
    states, addState, showState, editState,
    users,
};
