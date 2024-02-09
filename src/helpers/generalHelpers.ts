import lodash from "lodash";
import { CreateToastFnReturn } from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../types/otherTypes";
import {AxiosError} from "axios";

// Custom log
export const log = (message: string, data: any|null = null, highPriority: boolean = false): void => {
    // Only in local environment
    if (process.env.NODE_ENV !== 'production' || highPriority) {
        console.log(Array(60).fill('#').join(''));
        console.log(`Message: ${message}`);
        console.log(`Date: ${new Date()}`);
        data && console.log({data});
        console.log(Array(60).fill('#').join(''));
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
        log("Format string function error", {text, maxCharacters, exception: e});
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

    toast({title, status});
};

// Error alert
export const errorAlert = (error: AxiosError, customMessages: any[] = []): ErrorAlertType => {
    let message: string = "";

    switch (error.code) {
        case "ERR_NETWORK":
            const customMessage: any = lodash.find(customMessages, "ERR_NETWORK");
            message = customMessage ? customMessage["ERR_NETWORK"] : "Merci de vérifier la connexion internet";
            break;
    }

    return { show: true, status: AlertStatusEnumType.error, message };
}