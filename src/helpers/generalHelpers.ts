import lodash from "lodash";
import { CreateToastFnReturn } from "@chakra-ui/react";

import { AlertStatusEnumType, ErrorAlertType } from "./globalTypesHelper";
import { AxiosError } from "axios";

// Custom log
export const log = (message: string, data?: any): void => {
    // Only in local environment
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[${new Date().toLocaleString()}] ${message}`)
        console.info({data})
    }
};

// Search a needle in a string
export const needleSearch = (set: any, needle: string): boolean => {
    if(set !== null && set !== '' && set !== undefined && set) {
        return set.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    }

    return false;
};

// Format long string to avoid trim
export const formatString = (text: string, maxCharacters: number): string => {
    try {
        if(text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
    } catch (e) {
        log("String format Exception", {e});
    }
    return text;
};

// Flatten nested routes
export const generateFlattenRoutes = (routes: Array<any>): Array<any> => {
    if (!routes) return [];
    return lodash.flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
};

// Toast alert
export const toastAlert = (toast: CreateToastFnReturn, title: string, status: AlertStatusEnumType = AlertStatusEnumType.success): void => {
    toast.closeAll();

    toast({title, status});
};

// Error alert
export const errorAlert = (error?: AxiosError, customMessage: string = ""): ErrorAlertType => {
    let message: string = customMessage;

    if(error) {
        if(error.code === "ERR_NETWORK") message = "Problème de connexion avec le système. Merci de contacter l'administrateur";
        else if(error.code === "ERR_BAD_RESPONSE") message = "Problème interne du système. Merci de contacter l'administrateur";
    }

    return { show: true, status: AlertStatusEnumType.error, message };
}