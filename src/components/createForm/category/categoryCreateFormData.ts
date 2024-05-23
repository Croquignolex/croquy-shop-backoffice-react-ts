import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createCategoryInitialStaticValues: CreateCategoryFormType = {
    name: '',
    slug: '',
    groupId: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const createCategorySchema: Yup.ObjectSchema<CreateCategoryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    groupId: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CreateCategoryFormType {
    name: string,
    slug: string,
    groupId: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface CreateCategoryRequestDataType extends CreateCategoryFormType {}

export interface CategoryCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface CategoryCreateFormHookType {
    createCategoryAlertData: ErrorAlertType,
    isCreateCategoryPending: boolean,
    sequence: number,
    handleCreateCategory: (a: CreateCategoryFormType) => void,
    handleCreateCategoryAndContinue: (a: CreateCategoryFormType) => void,
}

export const storeCategoryRequest = (values: CreateCategoryRequestDataType): Promise<any> => {
    const {name, slug, groupId, seoTitle, seoDescription, description}: CreateCategoryRequestDataType = values;
    const url: string = v1URL(categoriesApiURI.store);

    return postRequest(url, {name, slug, groupId, seoTitle, seoDescription, description});
};