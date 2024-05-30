import {AddressType, ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {usersApiURI} from "../../../constants/apiURIConstants";
import {getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const defaultSelectedUser: UserType = {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    lastLoggedAt: "",
    birthdate: "",
    role: "",
    gender: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    defaultAddress: null,
    billingAddress: null,
    shippingAddress: null,
    avatar: null,
    creator: null,
}

export interface UserType {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
    lastLoggedAt: string;
    birthdate: string;
    role: string;
    gender: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    defaultAddress: AddressType | null;
    billingAddress: AddressType | null;
    shippingAddress: AddressType | null;
    avatar: MediaType | null;
    creator: UserType | null;
}

export interface ToggleUserRequestDataType {
    id: string,
}

export interface ShowUserHookType {
    userResponseData: UserType,
    isUserPending: boolean,
    userAlertData: ErrorAlertType,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleUserAlertData: ErrorAlertType,
    isToggleUserPending: boolean,
    handleToggleUser: () => void,
    onToggleModalClose: () => void,
}

export const userRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(usersApiURI.show, params);
    
    return getRequest(url);
};

export const toggleUser = ({id}: ToggleUserRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(usersApiURI.toggle, params);
    
    return patchRequest(url);
};