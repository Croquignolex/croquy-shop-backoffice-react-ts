import lodash from "lodash";
import dayjs from "dayjs";
import { AxiosError } from "axios";
import { CreateToastFnReturn } from "@chakra-ui/react";

import { AlertStatusEnumType, ErrorAlertType } from "./globalTypesHelper";

// Custom log
export const log = (message: string, data?: any): void => {
    // Only in local environment
    if (process.env.NODE_ENV !== "production") {
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

// Format date
export const stringDateFormat = (stringDate: string, withHour = false): string => {
    try {
        return (withHour)
            ? dayjs(stringDate).format("DD/MM/YYYY HH:mm")
            : dayjs(stringDate).format("DD/MM/YYYY");
    } catch (e) {
        log("String date format Exception", {e});
    }
    return "";
};

// Format long string to avoid trim
export const formatString = (text: string, maxCharacters: number): string => {
    try {
        if(text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + "...";
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
export const errorAlert = (error: AxiosError, customMessage: string = "Une erreur inatendu s'est produite. Merci de réessayer"): ErrorAlertType => {
    let message: string = customMessage;

    if(error.response?.status !== 400) {
        if(error) {
            if(error.code === "ERR_NETWORK") message = "Erreur réseau. Merci de contacter l'administrateur";
            else if(error.code === "ERR_BAD_RESPONSE") message = "Mauvaise reponse. Merci de contacter l'administrateur";
            else if(error.code === "ERR_BAD_REQUEST") message = "Mauvaise requête. Merci de contacter l'administrateur";
        }
    }

    return { show: true, status: AlertStatusEnumType.error, message };
}

// Get timezone name
export const timezoneName = (): string => {
    let tmSummer: Date = new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0));
    let so: number = -1 * tmSummer.getTimezoneOffset();
    let tmWinter: Date = new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0));
    let wo: number = -1 * tmWinter.getTimezoneOffset();

    if(-660 === so && -660 === wo) return "Pacific/Midway";
    if(-600 === so && -600 === wo) return "Pacific/Tahiti";
    if(-570 === so && -570 === wo) return "Pacific/Marquesas";
    if(-540 === so && -600 === wo) return "America/Adak";
    if(-540 === so && -540 === wo) return "Pacific/Gambier";
    if(-480 === so && -540 === wo) return "US/Alaska";
    if(-480 === so && -480 === wo) return "Pacific/Pitcairn";
    if(-420 === so && -480 === wo) return "US/Pacific";
    if(-420 === so && -420 === wo) return "US/Arizona";
    if(-360 === so && -420 === wo) return "US/Mountain";
    if(-360 === so && -360 === wo) return "America/Guatemala";
    if(-360 === so && -300 === wo) return "Pacific/Easter";
    if(-300 === so && -360 === wo) return "US/Central";
    if(-300 === so && -300 === wo) return "America/Bogota";
    if(-240 === so && -300 === wo) return "US/Eastern";
    if(-240 === so && -240 === wo) return "America/Caracas";
    if(-240 === so && -180 === wo) return "America/Santiago";
    if(-180 === so && -240 === wo) return "Canada/Atlantic";
    if(-180 === so && -180 === wo) return "America/Montevideo";
    if(-180 === so && -120 === wo) return "America/Sao_Paulo";
    if(-150 === so && -210 === wo) return "America/St_Johns";
    if(-120 === so && -180 === wo) return "America/Godthab";
    if(-120 === so && -120 === wo) return "America/Noronha";
    if(-60 === so && -60 === wo) return "Atlantic/Cape_Verde";
    if(0 === so && -60 === wo) return "Atlantic/Azores";
    if(0 === so && 0 === wo) return "Africa/Casablanca";
    if(60 === so && 0 === wo) return "Europe/London";
    if(60 === so && 60 === wo) return "Africa/Algiers";
    if(60 === so && 120 === wo) return "Africa/Windhoek";
    if(120 === so && 60 === wo) return "Europe/Amsterdam";
    if(120 === so && 120 === wo) return "Africa/Harare";
    if(180 === so && 120 === wo) return "Europe/Athens";
    if(180 === so && 180 === wo) return "Africa/Nairobi";
    if(240 === so && 180 === wo) return "Europe/Moscow";
    if(240 === so && 240 === wo) return "Asia/Dubai";
    if(270 === so && 210 === wo) return "Asia/Tehran";
    if(270 === so && 270 === wo) return "Asia/Kabul";
    if(300 === so && 240 === wo) return "Asia/Baku";
    if(300 === so && 300 === wo) return "Asia/Karachi";
    if(330 === so && 330 === wo) return "Asia/Calcutta";
    if(345 === so && 345 === wo) return "Asia/Katmandu";
    if(360 === so && 300 === wo) return "Asia/Yekaterinburg";
    if(360 === so && 360 === wo) return "Asia/Colombo";
    if(390 === so && 390 === wo) return "Asia/Rangoon";
    if(420 === so && 360 === wo) return "Asia/Almaty";
    if(420 === so && 420 === wo) return "Asia/Bangkok";
    if(480 === so && 420 === wo) return "Asia/Krasnoyarsk";
    if(480 === so && 480 === wo) return "Australia/Perth";
    if(540 === so && 480 === wo) return "Asia/Irkutsk";
    if(540 === so && 540 === wo) return "Asia/Tokyo";
    if(570 === so && 570 === wo) return "Australia/Darwin";
    if(570 === so && 630 === wo) return "Australia/Adelaide";
    if(600 === so && 540 === wo) return "Asia/Yakutsk";
    if(600 === so && 600 === wo) return "Australia/Brisbane";
    if(600 === so && 660 === wo) return "Australia/Sydney";
    if(630 === so && 660 === wo) return "Australia/Lord_Howe";
    if(660 === so && 600 === wo) return "Asia/Vladivostok";
    if(660 === so && 660 === wo) return "Pacific/Guadalcanal";
    if(690 === so && 690 === wo) return "Pacific/Norfolk";
    if(720 === so && 660 === wo) return "Asia/Magadan";
    if(720 === so && 720 === wo) return "Pacific/Fiji";
    if(720 === so && 780 === wo) return "Pacific/Auckland";
    if(765 === so && 825 === wo) return "Pacific/Chatham";
    if(780 === so && 780 === wo) return "Pacific/Enderbury";
    if(840 === so && 840 === wo) return "Pacific/Kiritimati";
    return "UTC";
};