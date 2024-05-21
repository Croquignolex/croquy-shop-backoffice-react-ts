import {AddressType, ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {UserType} from "../../users/usersPageData";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const defaultSelectedVendor: VendorType = {
    id: "",
    name: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    address: null,
    logo: null,
    creator: null,
}

export interface VendorType {
    id: string;
    name: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    address: AddressType | null;
    logo: MediaType | null;
    creator: UserType | null;
}

export interface DestroyVendorRequestDataType {
    id: string,
}

export interface ToggleVendorRequestDataType {
    id: string,
}

export interface ShowVendorHookType {
    vendorResponseData: VendorType,
    isVendorPending: boolean,
    vendorAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteVendorAlertData: ErrorAlertType,
    isDeleteVendorPending: boolean,
    handleDeleteVendor: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleVendorAlertData: ErrorAlertType,
    isToggleVendorPending: boolean,
    handleToggleVendor: () => void,
    onToggleModalClose: () => void,
    handleAddressUpdate: (a: AddressType | null) => void,
    handleLogoUpdate: (a: MediaType | null) => void,
}

export const vendorRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(vendorsApiURI.show, params);
    
    return getRequest(url);
};

export const destroyVendor = ({id}: DestroyVendorRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(vendorsApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleVendor = ({id}: ToggleVendorRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(vendorsApiURI.toggle, params);
    
    return patchRequest(url);
};