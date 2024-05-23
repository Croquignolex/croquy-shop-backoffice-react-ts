import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CategoryType} from "../show/showCategoryData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editCategoryInitialStaticValues: EditCategoryFormType = {
    name: '',
    slug: '',
    groupId: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const editCategorySchema: Yup.ObjectSchema<EditCategoryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    groupId: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface EditCategoryFormType {
    name: string,
    slug: string,
    groupId: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface EditCategoryRequestDataType extends EditCategoryFormType {
    id: string,
}

export interface EditCategoryHookType {
    editCategoryAlertData: ErrorAlertType,
    isEditCategoryPending: boolean,
    isCategoryPending: boolean,
    categoryAlertData: ErrorAlertType,
    formCategory: EditCategoryFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    categoryResponseData: CategoryType,
    handleEditCategory: (a: EditCategoryFormType) => void,
}

export const updateCategoryRequest = (values: EditCategoryRequestDataType): Promise<any> => {
    const {name, slug, seoTitle, groupId, seoDescription, description, id}: EditCategoryRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(categoriesApiURI.update, params);

    return putRequest(url, {name, slug, groupId, seoTitle, seoDescription, description});
};