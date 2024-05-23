import * as Yup from "yup";

import {ErrorAlertType} from "../../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../../constants/generalConstants";
import {joinBaseUrlWithParams, v1URL} from "../../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../../constants/apiURIConstants";
import {postRequest} from "../../../../helpers/axiosHelpers";

export const createGroupCategoryInitialStaticValues: CreateGroupCategoryFormType = {
    name: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const createGroupCategorySchema: Yup.ObjectSchema<CreateGroupCategoryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CreateGroupCategoryFormType {
    name: string,
    slug: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface CreateGroupCategoryRequestDataType extends CreateGroupCategoryFormType {
    groupId: string,
}

export interface GroupCategoryCreateFormHookeProps {
    groupId: string;
    handleFinish: () => void;
    handleAdd: () => void;
}

export interface GroupCategoryCreateFormHookType {
    createGroupCategoryAlertData: ErrorAlertType,
    isCreateGroupCategoryPending: boolean,
    sequence: number,
    handleCreateGroupCategory: (a: CreateGroupCategoryFormType) => void,
    handleCreateGroupCategoryAndContinue: (a: CreateGroupCategoryFormType) => void,
}

export const storeCategoryRequest = (values: CreateGroupCategoryRequestDataType): Promise<any> => {
    const {name, seoTitle, seoDescription, slug, groupId, description}:CreateGroupCategoryRequestDataType = values;
    const url: string = v1URL(joinBaseUrlWithParams(groupsApiURI.categories, [{param: "id", value: groupId}]));

    return postRequest(url, {name, seoTitle, seoDescription, slug, description});
};