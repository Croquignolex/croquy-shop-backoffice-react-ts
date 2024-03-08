import lodash from "lodash";
import { CreateToastFnReturn } from "@chakra-ui/react";

import { AlertStatusEnumType, ErrorAlertType, LogLevelEnumType } from "../types/otherTypes";
import { AxiosError } from "axios";

// Custom log
export const log = (message: string, data: any|null = null, level: LogLevelEnumType = LogLevelEnumType.info): void => {
    // Only in local environment
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[${new Date().toLocaleString()}] ${message}`)
        console[level](data)
    }
};

// Search a needle in a string
export const needleSearch = (set: any, needle: string): boolean => {
    if(set !== null && set !== '' && set !== undefined && set) {
        log("Needle found", {set, needle});

        return set.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    }

    log("Needle not found", {set, needle});
    return false;
};

// Format long string to avoid trim
export const formatString = (text: string, maxCharacters: number): string => {
    try {
        if(text.length > maxCharacters) {
            let formattedString: string = text.substring(0, maxCharacters) + '...';

            log("String formatted", {text, maxCharacters, formattedString});

            return formattedString;
        }
    } catch (e) {
        log("String format error", {text, maxCharacters, e});
    }
    return text;
};

// Flatten nested routes
export const generateFlattenRoutes = (routes: any[]): any[] => {
    if (!routes) return [];
    return lodash.flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
};

// Toast alert
export const toastAlert = (toast: CreateToastFnReturn, title: string, status: AlertStatusEnumType = AlertStatusEnumType.success): void => {
    toast.closeAll();

    log("Show toast alert", {toast, title, status});

    toast({title, status});
};

// Error alert
export const errorAlert = (error: AxiosError, customMessage: string): ErrorAlertType => {
    let message: string = customMessage;

    if(error.code === "ERR_NETWORK") message = "Merci de vérifier la connexion internet";

    log("Show error alert", {error, customMessage, message});

    return { show: true, status: AlertStatusEnumType.error, message };
}