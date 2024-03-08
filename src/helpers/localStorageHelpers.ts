import { log } from "./generalHelpers";

export const getLocaleStorageItem = (key: string): any|null => {
    const data: any|null = localStorage.getItem(key);

    log("Retrieve local storage data", {key, data});

    return JSON.parse(data);
};

export const setLocaleStorageItem = (key: string, data: any): void => {
    log("Save local storage data", {key, data});

    localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocaleStorageItem = (key: string): void => {
    log("Remove local storage data", {key});

    localStorage.removeItem(key);
};

export const removeAllLocaleStorageItems = (): void => {
    log("Remove all local storage data");

    localStorage.clear();
};