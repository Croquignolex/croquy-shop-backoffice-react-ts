import flattenDeep from "lodash/flattenDeep";
import { CreateToastFnReturn } from "@chakra-ui/react";

import { AlertStatusEnumType } from "../types/otherTypes";

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
    return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
};

// Toast alert
export const toastAlert = (toast: CreateToastFnReturn, title: string, status: AlertStatusEnumType = AlertStatusEnumType.success): void => {
    toast.closeAll();

    toast({title, status});
};