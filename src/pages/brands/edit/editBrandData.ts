import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {BrandType} from "../show/showBrandData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";

export const editBrandInitialStaticValues: EditBrandFormType = {
    name: '',
    slug: '',
    website: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const editBrandSchema: Yup.ObjectSchema<EditBrandFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface EditBrandFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface EditBrandRequestDataType extends EditBrandFormType {
    id: string,
}

export interface EditBrandHookType {
    editBrandAlertData: ErrorAlertType,
    isEditBrandPending: boolean,
    isBrandPending: boolean,
    brandAlertData: ErrorAlertType,
    formBrand: EditBrandFormType,
    pageHeaderItems: Array<any>,
    brandResponseData: BrandType,
    handleEditBrand: (a: EditBrandFormType) => void,
}

export const updateBrandRequest = (values: EditBrandRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description, id}: EditBrandRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(brandsApiURI.update, params);

    return putRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};