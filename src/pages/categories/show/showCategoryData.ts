import {ErrorAlertType, MediaType, URLParamType} from "../../../helpers/globalTypesHelper";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {deleteRequest, getRequest, patchRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {GroupType} from "../../groups/show/showGroupData";
import {UserType} from "../../users/show/showUserData";

export const defaultSelectedCategory: CategoryType = {
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
    group: null,
    creator: null,
}

export interface CategoryType {
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
    group: GroupType | null;
    creator: UserType | null;
}

export interface DestroyCategoryRequestDataType {
    id: string,
}

export interface ToggleCategoryRequestDataType {
    id: string,
}

export interface ShowCategoryHookType {
    categoryResponseData: CategoryType,
    isCategoryPending: boolean,
    categoryAlertData: ErrorAlertType,
    showDeleteModal: () => void,
    isDeleteModalOpen: boolean,
    deleteCategoryAlertData: ErrorAlertType,
    isDeleteCategoryPending: boolean,
    handleDeleteCategory: () => void,
    onDeleteModalClose: () => void,
    showToggleModal: () => void,
    isToggleModalOpen: boolean,
    toggleCategoryAlertData: ErrorAlertType,
    isToggleCategoryPending: boolean,
    handleToggleCategory: () => void,
    onToggleModalClose: () => void,
    handleLogoUpdate: (a: MediaType | null) => void,
    handleBannerUpdate: (a: MediaType | null) => void,
}

export const categoryRequest = (id: string): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(categoriesApiURI.show, params);
    
    return getRequest(url);
};

export const destroyCategory = ({id}: DestroyCategoryRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(categoriesApiURI.destroy, params);
    
    return deleteRequest(url);
};

export const toggleCategory = ({id}: ToggleCategoryRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(categoriesApiURI.toggle, params);
    
    return patchRequest(url);
};