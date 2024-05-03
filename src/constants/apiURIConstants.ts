export const authApiURI = {
    login: "/auth/login",
    refresh: "/auth/refresh",
};

export const selectListApiURI = { 
    countries: "/select/countries",
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
};

export const countriesApiURI = {
    index: "/countries",
    store: "/countries",
    show: "/countries/{id}",
    update: "/countries/{id}",
    destroy: "/countries/{id}",
    toggle: "/countries/{id}/toggle",
    addState: "/countries/{id}/states",
    flag: "/countries/{id}/flag", 
};

export const statesApiURI = {
    index: "/states",
    store: "/states",
    show: "/states/{id}",
    update: "/states/{id}",
    destroy: "/states/{id}",
    toggle: "/states/{id}/toggle",
};