export const authApiURI = {
    login: "/auth/login",
    refresh: "/auth/refresh",
};

export const selectListApiURI = { 
    countries: "/select/countries",
    states: "/select/states",
};

export const usersApiURI = {
    list: "/users",
};

export const shopsApiURI = {
    index: "/shops",
    store: "/shops",
    show: "/shops/{id}",
    update: "/shops/{id}",
    destroy: "/shops/{id}",
    toggle: "/shops/{id}/toggle",
    address: "/shops/{id}/address",
};

export const countriesApiURI = {
    index: "/countries",
    store: "/countries",
    show: "/countries/{id}",
    update: "/countries/{id}",
    destroy: "/countries/{id}",
    toggle: "/countries/{id}/toggle",
    states: "/countries/{id}/states",
    flag: "/countries/{id}/flag", 
};

export const couponsApiURI = {
    index: "/coupons",
    store: "/coupons",
    show: "/coupons/{id}",
    update: "/coupons/{id}",
    destroy: "/coupons/{id}",
    toggle: "/coupons/{id}/toggle",
};

export const statesApiURI = {
    index: "/states",
    store: "/states",
    show: "/states/{id}",
    update: "/states/{id}",
    destroy: "/states/{id}",
    toggle: "/states/{id}/toggle",
};

export const vendorsApiURI = {
    index: "/vendors",
    store: "/vendors",
    show: "/vendors/{id}",
    update: "/vendors/{id}",
    destroy: "/vendors/{id}",
    toggle: "/vendors/{id}/toggle",
    address: "/vendors/{id}/address",
    logo: "/vendors/{id}/logo",
};

export const brandsApiURI = {
    index: "/brands",
    store: "/brands",
    show: "/brands/{id}",
    update: "/brands/{id}",
    destroy: "/brands/{id}",
    toggle: "/brands/{id}/toggle",
    logo: "/brands/{id}/logo",
};

export const groupsApiURI = {
    index: "/groups",
    store: "/groups",
    show: "/groups/{id}",
    update: "/groups/{id}",
    destroy: "/groups/{id}",
    toggle: "/groups/{id}/toggle",
    logo: "/groups/{id}/logo",
    banner: "/groups/{id}/banner",
};