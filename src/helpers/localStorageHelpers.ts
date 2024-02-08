import { log } from "./generalHelpers";

export const getLocaleStorageItem = (key: string): any|null => {
    const data: any|null = localStorage.getItem(key);

    if (!data) {
        log("Read local storage error", {key, data});
        return data;
    }

    return JSON.parse(data);
};

export const setLocaleStorageItem = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocaleStorageItem = (key: string): void => {
    localStorage.removeItem(key);
};

export const removeAllLocaleStorageItems = (): void => {
    localStorage.clear();
};