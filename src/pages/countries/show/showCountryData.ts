import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {UserType} from "../../users/usersPageData";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const defaultSelectedCountry: CountryType = {
    id: "",
    name: "",
    phoneCode: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    flag: null,
    creator: null,
}

export interface CountryType {
    id: string;
    name: string;
    phoneCode: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    flag: string | null;
    creator: UserType | null;
}

export interface DestroyCountryRequestDataType {
    id: string,
}

export interface ToggleCountryRequestDataType {
    id: string,
}

export interface ShowCountryHookType {
    countryResponseData: CountryType,
    isCountryPending: boolean,
    countryAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteCountryAlertData: ErrorAlertType,
    isDeleteCountryPending: boolean,
    handleDeleteCountry: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleCountryAlertData: ErrorAlertType,
    isToggleCountryPending: boolean,
    handleToggleCountry: () => void,
    onToggleModalClose: () => void,
    handleTabsChange: (a: number) => void,
}

export const countryRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.show, params);
    
    return getRequest(url);
};

export const destroyCountry = ({id}: DestroyCountryRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleCountry = ({id}: ToggleCountryRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.toggle, params);
    
    return patchRequest(url);
};