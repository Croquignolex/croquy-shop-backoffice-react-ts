import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {CategoryType} from "../../../pages/categories/show/showCategoryData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultCategoriesResponseData: CategoriesResponseDataType = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true
}

export interface CategoriesResponseDataType {
    content: Array<CategoryType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyCategoryRequestDataType {
    id: string,
}

export interface CategoriesTableListHookType {
    categoriesResponseData: CategoriesResponseDataType,
    isCategoriesPending: boolean,
    categoriesAlertData: ErrorAlertType,
    fetchPaginatedCategories: (a: boolean) => void,
    fetchPaginatedNeedleCategories: (a: string) => void,
    selectedCategory: CategoryType,
    showDeleteModal: (a: CategoryType) => void,
    isDeleteModalOpen: boolean,
    deleteCategoryAlertData: ErrorAlertType,
    isDeleteCategoryPending: boolean,
    handleDeleteCategory: () => void,
    onDeleteModalClose: () => void,
}

export interface CategoriesTableListHookProps {
    fetchCategories: boolean,
    categoriesBaseUrl: string,
}

export const categoriesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};