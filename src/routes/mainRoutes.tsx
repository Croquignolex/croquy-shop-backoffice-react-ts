import {lazy, LazyExoticComponent, ReactElement} from "react";
import {IconType} from "react-icons";
import {
    FiShoppingCart,
    FiUsers,
    FiFlag,
    FiMap,
    FiPercent,
    FiTruck,
    FiAward,
    FiColumns,
    FiTag,
    FiSliders,
    FiGrid,
    FiPieChart,
    FiUser,
    FiSettings,
    FiHelpCircle
} from "react-icons/fi";

const dashboard: MainRouteType = {title: "dashboard", path: "/dashboard", icon: FiPieChart, component: lazy(() => import("../pages/dashboard/DashboardPage"))};
const profile: MainRouteType = {title: "my_profile", path: "/profile", icon: FiUser, component: lazy(() => import("../pages/dashboard/DashboardPage"))};
const settings: MainRouteType = {title: "my_parameters", path: "/settings", icon: FiSettings, component: lazy(() => import("../pages/dashboard/DashboardPage"))};
const help: MainRouteType = {title: "help_center", path: "/help", icon: FiHelpCircle, component: lazy(() => import("../pages/dashboard/DashboardPage"))};

const shops: MainRouteType = {title: "shops", path: "/shops", icon: FiShoppingCart, component: lazy(() => import("../pages/shops/ShopsPage"))};
const addShop: MainRouteType = {path: "/shops/create", component: lazy(() => import("../pages/shops/CreateShopPage"))};
const showShop: MainRouteType = {path: "/shops/:id", component: lazy(() => import("../pages/shops/show/ShowShopPage"))};
const editShop: MainRouteType = {path: "/shops/:id/edit", component: lazy(() => import("../pages/shops/edit/EditShopPage"))};

const users: MainRouteType = {title: "users", path: "/users", icon: FiUsers, component: lazy(() => import("../pages/users/UsersPage"))};
const addUser: MainRouteType = {path: "/users/create", component: lazy(() => import("../pages/users/CreateUserPage"))};
const showUser: MainRouteType = {path: "/users/:id", component: lazy(() => import("../pages/users/show/ShowUserPage"))};
const editUser: MainRouteType = {path: "/users/:id/edit", component: lazy(() => import("../pages/users/edit/EditUserPage"))};

const countries: MainRouteType = {title: "countries", path: "/countries", icon: FiFlag, component: lazy(() => import("../pages/countries/CountriesPage"))};
const addCountry: MainRouteType = {path: "/countries/create", component: lazy(() => import("../pages/countries/CreateCountryPage"))};
const showCountry: MainRouteType = {path: "/countries/:id", component: lazy(() => import("../pages/countries/show/ShowCountryPage"))};
const editCountry: MainRouteType = {path: "/countries/:id/edit", component: lazy(() => import("../pages/countries/edit/EditCountryPage"))};

const states: MainRouteType = {title: "states", path: "/states", icon: FiMap, component: lazy(() => import("../pages/states/StatesPage"))};
const addState: MainRouteType = {path: "/states/create", component: lazy(() => import("../pages/states/CreateStatePage"))};
const showState: MainRouteType = {path: "/states/:id", component: lazy(() => import("../pages/states/show/ShowStatePage"))};
const editState: MainRouteType = {path: "/states/:id/edit", component: lazy(() => import("../pages/states/edit/EditStatePage"))};

const coupons: MainRouteType = {title: "coupons", path: "/coupons", icon: FiPercent, component: lazy(() => import("../pages/coupons/CouponsPage"))};
const addCoupon: MainRouteType = {path: "/coupons/create", component: lazy(() => import("../pages/coupons/CreateCouponPage"))};
const showCoupon: MainRouteType = {path: "/coupons/:id", component: lazy(() => import("../pages/coupons/show/ShowCouponPage"))};
const editCoupon: MainRouteType = {path: "/coupons/:id/edit", component: lazy(() => import("../pages/coupons/edit/EditCouponPage"))};

const vendors: MainRouteType = {title: "vendors", path: "/vendors", icon: FiTruck, component: lazy(() => import("../pages/vendors/VendorsPage"))};
const addVendor: MainRouteType = {path: "/vendors/create", component: lazy(() => import("../pages/vendors/CreateVendorPage"))};
const showVendor: MainRouteType = {path: "/vendors/:id", component: lazy(() => import("../pages/vendors/show/ShowVendorPage"))};
const editVendor: MainRouteType = {path: "/vendors/:id/edit", component: lazy(() => import("../pages/vendors/edit/EditVendorPage"))};

const brands: MainRouteType = {title: "brands", path: "/brands", icon: FiAward, component: lazy(() => import("../pages/brands/BrandsPage"))};
const addBrand: MainRouteType = {path: "/brands/create", component: lazy(() => import("../pages/brands/CreateBrandPage"))};
const showBrand: MainRouteType = {path: "/brands/:id", component: lazy(() => import("../pages/brands/show/ShowBrandPage"))};
const editBrand: MainRouteType = {path: "/brands/:id/edit", component: lazy(() => import("../pages/brands/edit/EditBrandPage"))};

const groups: MainRouteType = {title: "groups", path: "/groups", icon: FiColumns, component: lazy(() => import("../pages/groups/GroupsPage"))};
const addGroup: MainRouteType = {path: "/groups/create", component: lazy(() => import("../pages/groups/CreateGroupPage"))};
const showGroup: MainRouteType = {path: "/groups/:id", component: lazy(() => import("../pages/groups/show/ShowGroupPage"))};
const editGroup: MainRouteType = {path: "/groups/:id/edit", component: lazy(() => import("../pages/groups/edit/EditGroupPage"))};

const categories: MainRouteType = {title: "categories", path: "/categories", icon: FiGrid, component: lazy(() => import("../pages/categories/CategoriesPage"))};
const addCategory: MainRouteType = {path: "/categories/create", component: lazy(() => import("../pages/categories/CreateCategoryPage"))};
const showCategory: MainRouteType = {path: "/categories/:id", component: lazy(() => import("../pages/categories/show/ShowCategoryPage"))};
const editCategory: MainRouteType = {path: "/categories/:id/edit", component: lazy(() => import("../pages/categories/edit/EditCategoryPage"))};

const attributes: MainRouteType = {title: "attributes", path: "/attributes", icon: FiTag, component: lazy(() => import("../pages/attributes/AttributesPage"))};
const addAttribute: MainRouteType = {path: "/attributes/create", component: lazy(() => import("../pages/attributes/CreateAttributePage"))};
const showAttribute: MainRouteType = {path: "/attributes/:id", component: lazy(() => import("../pages/attributes/show/ShowAttributePage"))};
const editAttribute: MainRouteType = {path: "/attributes/:id/edit", component: lazy(() => import("../pages/attributes/edit/EditAttributePage"))};

const attributeValues: MainRouteType = {title: "attribute_values", path: "/attribute-values", icon: FiSliders, component: lazy(() => import("../pages/attributeValues/AttributeValuesPage"))};
const addAttributeValue: MainRouteType = {path: "/attribute-values/create", component: lazy(() => import("../pages/attributeValues/CreateAttributeValuePage"))};
const showAttributeValue: MainRouteType = {path: "/attribute-values/:id", component: lazy(() => import("../pages/attributeValues/show/ShowAttributeValuePage"))};
const editAttributeValue: MainRouteType = {path: "/attribute-values/:id/edit", component: lazy(() => import("../pages/attributeValues/edit/EditAttributeValuePage"))};

export interface MainRouteType {
    icon?: IconType,
    title?: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const headerMenu = [
    dashboard,
    // {subMenuLabel: "administration", subMenuItems: [users, shops]},
    // {subMenuLabel: "settings", subMenuItems: [countries, states]},
];

export const sideMenu = [
    profile,
    settings,
    help
];

export const mainRoutes: any = {
    dashboard,
    profile, settings, help,
    users, addUser, showUser, editUser,
    shops, addShop, showShop, editShop,
    brands, addBrand, showBrand, editBrand,
    groups, addGroup, showGroup, editGroup,
    categories, addCategory, showCategory, editCategory,
    attributes, addAttribute, showAttribute, editAttribute,
    attributeValues, addAttributeValue, showAttributeValue, editAttributeValue,
    vendors, addVendor, showVendor, editVendor,
    coupons, addCoupon, showCoupon, editCoupon,
    countries, addCountry, showCountry, editCountry,
    states, addState, showState, editState,
};
