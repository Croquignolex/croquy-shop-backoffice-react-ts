import {ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {UserType} from "../../users/show/showUserData";

export const defaultSelectedBrand: BrandType = {
    id: "",
    name: "",
    slug: "",
    website: "",
    seoTitle: "",
    seoDescription: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    logo: null,
    creator: null,
}

export interface BrandType {
    id: string;
    name: string;
    slug: string;
    website: string;
    seoTitle: string;
    seoDescription: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    logo: MediaType | null;
    creator: UserType | null;
}

export interface DestroyBrandRequestDataType {
    id: string,
}

export interface ToggleBrandRequestDataType {
    id: string,
}

export interface ShowBrandHookType {
    brandResponseData: BrandType,
    isBrandPending: boolean,
    brandAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteBrandAlertData: ErrorAlertType,
    isDeleteBrandPending: boolean,
    handleDeleteBrand: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleBrandAlertData: ErrorAlertType,
    isToggleBrandPending: boolean,
    handleToggleBrand: () => void,
    onToggleModalClose: () => void,
    handleLogoUpdate: (a: MediaType | null) => void,
}

export const brandRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(brandsApiURI.show, params);
    
    return getRequest(url);
};

export const destroyBrand = ({id}: DestroyBrandRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(brandsApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleBrand = ({id}: ToggleBrandRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(brandsApiURI.toggle, params);
    
    return patchRequest(url);
};