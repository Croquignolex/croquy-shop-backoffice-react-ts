import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createGroupInitialStaticValues: CreateGroupFormType = {
    name: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const createGroupSchema: Yup.ObjectSchema<CreateGroupFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CreateGroupFormType {
    name: string,
    slug: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface CreateGroupRequestDataType extends CreateGroupFormType {}

export interface GroupCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface GroupCreateFormHookType {
    createGroupAlertData: ErrorAlertType,
    isCreateGroupPending: boolean,
    sequence: number,
    handleCreateGroup: (a: CreateGroupFormType) => void,
    handleCreateGroupAndContinue: (a: CreateGroupFormType) => void,
}

export const storeGroupRequest = (values: CreateGroupRequestDataType): Promise<any> => {
    const {name, slug, seoTitle, seoDescription, description}: CreateGroupRequestDataType = values;
    const url: string = v1URL(groupsApiURI.store);

    return postRequest(url, {name, slug, seoTitle, seoDescription, description});
};