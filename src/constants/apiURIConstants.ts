export const authApiURI = {
    login: '/login',
    register: '/account/register/email',
};

export const accountApiURI = {
    fetch: '/account/{accountId}',
    updateAddress: '/account/{accountId}/addaddress',
};

export const contactsApiURI = {
    fetch: '/account/{accountId}/transferrecipient',
    add: '/account/{accountId}/transferrecipient',
};

export const accountsApiURI = {
    fetch: '/account/{accountId}/transferpayer',
    add: '/account/{accountId}/transferpayer',
};

export const transfersApiURI = {
    fetch: '/account/{accountId}/transfers',
    addMtnToMtn: '/cmmtncmmtntransfer/{accountId}/account',
};
