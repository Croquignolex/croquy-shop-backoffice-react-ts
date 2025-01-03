import {lazy, LazyExoticComponent, ReactElement} from "react";
import {
    IconFlag,
    IconMap,
    IconAd2,
    IconBadgeTm,
    IconTool,
    IconBuildingStore,
    IconAdjustments,
    IconBrandShopee,
    IconCategory,
    IconCards,
    IconTruck,
    IconTag,
    IconTagStarred,
    IconUsers,
    IconUsersGroup,
} from '@tabler/icons-react';
import {
    FiPercent,
    FiPieChart,
    FiUser,
    FiSettings,
    FiHelpCircle
} from "react-icons/fi";

const dashboard: MainRouteType = {title: "dashboard", path: "/dashboard", icon: FiPieChart, component: lazy(() => import("../pages/dashboard/DashboardPage"))};
const profile: MainRouteType = {title: "my_profile", path: "/profile", icon: FiUser, component: lazy(() => import("../pages/profile/ProfilePage"))};
const settings: MainRouteType = {title: "my_parameters", path: "/settings", icon: FiSettings, component: lazy(() => import("../pages/settings/SettingsPage"))};
const help: MainRouteType = {title: "help_center", path: "/help", icon: FiHelpCircle, component: lazy(() => import("../pages/help/HelpPage"))};

const shops: MainRouteType = {title: "shops", path: "/shops", icon: IconBuildingStore, component: lazy(() => import("../pages/shops/components/ShopsListPage"))};
const showShop: MainRouteType = {path: "/shops/:id", component: lazy(() => import("../pages/shops/show/ShowShopPage"))};

const users: MainRouteType = {title: "users", path: "/users", icon: IconUsers, component: lazy(() => import("../pages/users/components/UsersListPage"))};
const showUser: MainRouteType = {path: "/users/:id", component: lazy(() => import("../pages/users/show/ShowUserPage"))};

const countries: MainRouteType = {title: "countries", path: "/countries", icon: IconFlag, component: lazy(() => import("../pages/countries/components/CountriesListPage"))};
const showCountry: MainRouteType = {path: "/countries/:id", component: lazy(() => import("../pages/countries/show/ShowCountryPage"))};

const states: MainRouteType = {title: "states", path: "/states", icon: IconMap, component: lazy(() => import("../pages/states/components/StatesListPage"))};
const showState: MainRouteType = {path: "/states/:id", component: lazy(() => import("../pages/states/show/ShowStatePage"))};

const coupons: MainRouteType = {title: "coupons", path: "/coupons", icon: FiPercent, component: lazy(() => import("../pages/coupons/CouponsPage"))};
const addCoupon: MainRouteType = {path: "/coupons/create", component: lazy(() => import("../pages/coupons/CreateCouponPage"))};
const showCoupon: MainRouteType = {path: "/coupons/:id", component: lazy(() => import("../pages/coupons/show/ShowCouponPage"))};
const editCoupon: MainRouteType = {path: "/coupons/:id/edit", component: lazy(() => import("../pages/coupons/edit/EditCouponPage"))};

const vendors: MainRouteType = {title: "vendors", path: "/vendors", icon: IconTruck, component: lazy(() => import("../pages/vendors/components/VendorsListPage"))};
const showVendor: MainRouteType = {path: "/vendors/:id", component: lazy(() => import("../pages/vendors/show/ShowVendorPage"))};

const brands: MainRouteType = {title: "brands", path: "/brands", icon: IconBadgeTm, component: lazy(() => import("../pages/brands/components/BrandsListPage"))};
const showBrand: MainRouteType = {path: "/brands/:id", component: lazy(() => import("../pages/brands/show/ShowBrandPage"))};

const groups: MainRouteType = {title: "groups", path: "/groups", icon: IconCategory, component: lazy(() => import("../pages/groups/components/GroupsListPage"))};
const showGroup: MainRouteType = {path: "/groups/:id", component: lazy(() => import("../pages/groups/show/ShowGroupPage"))};

const categories: MainRouteType = {title: "categories", path: "/categories", icon: IconCards, component: lazy(() => import("../pages/categories/components/CategoriesListPage"))};
const showCategory: MainRouteType = {path: "/categories/:id", component: lazy(() => import("../pages/categories/show/ShowCategoryPage"))};

const attributes: MainRouteType = {title: "attributes", path: "/attributes", icon: IconTag, component: lazy(() => import("../pages/attributes/components/AttributesListPage"))};
const showAttribute: MainRouteType = {path: "/attributes/:id", component: lazy(() => import("../pages/attributes/show/ShowAttributePage"))};

const attributeValues: MainRouteType = {title: "attribute_values", path: "/attribute-values", icon: IconTagStarred, component: lazy(() => import("../pages/attributeValues/components/AttributeValuesListPage"))};
const showAttributeValue: MainRouteType = {path: "/attribute-values/:id", component: lazy(() => import("../pages/attributeValues/show/ShowAttributeValuePage"))};

export interface MainRouteType {
    icon?: any,
    title?: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const administrationSubMenu = {
    subMenuLabel: "administration",
    subMenuIcon: IconAdjustments,
    subMenuItems: [users, shops, vendors],
};

export const ecommerceSubMenu = {
    subMenuLabel: "ecommerce",
    subMenuIcon: IconBrandShopee,
    subMenuItems: [groups, categories, attributes, attributeValues],
};

export const settingsSubMenu = {
    subMenuLabel: "tools",
    subMenuIcon: IconTool,
    subMenuItems: [countries, states]
};

export const  marketingSubMenu = {
    subMenuLabel: "marketing",
    subMenuIcon: IconAd2,
    subMenuItems: [brands]
};

export const headerMenu = [
    dashboard,
    administrationSubMenu,
    ecommerceSubMenu,
    marketingSubMenu,
    settingsSubMenu,
];

export const sideMenu = [
    profile,
    settings,
    help
];

export const mainRoutes: any = {
    countries, showCountry,
    states, showState,
    brands, showBrand,
    shops, showShop,
    groups, showGroup,
    categories, showCategory,
    vendors, showVendor,
    attributes, showAttribute,
    attributeValues, showAttributeValue,

    dashboard,
    profile, settings, help,

    users, showUser,
    coupons, addCoupon, showCoupon, editCoupon,
};
