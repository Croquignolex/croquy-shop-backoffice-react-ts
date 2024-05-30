import {ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {UserType} from "../../users/show/showUserData";

export const defaultSelectedGroup: GroupType = {
    id: "",
    name: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    logo: null,
    banner: null,
    creator: null,
}

export interface GroupType {
    id: string;
    name: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    logo: MediaType | null;
    banner: MediaType | null;
    creator: UserType | null;
}

export interface DestroyGroupRequestDataType {
    id: string,
}

export interface ToggleGroupRequestDataType {
    id: string,
}

export interface ShowGroupHookType {
    groupResponseData: GroupType,
    isGroupPending: boolean,
    groupAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteGroupAlertData: ErrorAlertType,
    isDeleteGroupPending: boolean,
    handleDeleteGroup: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleGroupAlertData: ErrorAlertType,
    isToggleGroupPending: boolean,
    handleToggleGroup: () => void,
    onToggleModalClose: () => void,
    handleTabsChange: (a: number) => void,
    handleLogoUpdate: (a: MediaType | null) => void,
    handleBannerUpdate: (a: MediaType | null) => void,
}

export const groupRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(groupsApiURI.show, params);
    
    return getRequest(url);
};

export const destroyGroup = ({id}: DestroyGroupRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(groupsApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleGroup = ({id}: ToggleGroupRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(groupsApiURI.toggle, params);
    
    return patchRequest(url);
};