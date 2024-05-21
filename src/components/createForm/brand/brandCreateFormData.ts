import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createBrandInitialStaticValues: CreateBrandFormType = {
    name: '',
    slug: '',
    website: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const createBrandSchema: Yup.ObjectSchema<CreateBrandFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    website: Yup.string().nullable(),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CreateBrandFormType {
    name: string,
    slug: string,
    website: string | null | undefined,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface CreateBrandRequestDataType extends CreateBrandFormType {}

export interface BrandCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface BrandCreateFormHookType {
    createBrandAlertData: ErrorAlertType,
    isCreateBrandPending: boolean,
    sequence: number,
    handleCreateBrand: (a: CreateBrandFormType) => void,
    handleCreateBrandAndContinue: (a: CreateBrandFormType) => void,
}

export const storeBrandRequest = (values: CreateBrandRequestDataType): Promise<any> => {
    const {name, slug, website, seoTitle, seoDescription, description}: CreateBrandRequestDataType = values;
    const url: string = v1URL(brandsApiURI.store);

    return postRequest(url, {name, slug, website, seoTitle, seoDescription, description});
};